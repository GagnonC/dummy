package api

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"synq/app/pkg/util/tracer"
	"syscall"
	"time"
)

func StartHttpServerWithGracefulShutdown(ctx tracer.Context, name string, address string, handler http.Handler) error {
	abort := make(chan bool)
	done := make(chan bool)
	go waitForInterrupt(ctx, abort)

	srv := &http.Server{
		Addr:    address,
		Handler: handler,
	}

	go func() {
		<-abort
		defer func() {
			close(abort)
			close(done)
		}()

		abortCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		ctx.InfoF("Shutting down %s http server", name)

		srv.SetKeepAlivesEnabled(false)
		if err := srv.Shutdown(abortCtx); err != nil {
			ctx.ErrorF("Could not gracefully shutdown the server after 30 seconds: %v; Forcefully shutting down server", err)
			return
		}
	}()

	ctx.DebugF("Start %s Listening on %v", name, address)

	if err := srv.ListenAndServe(); err != nil && !errors.Is(http.ErrServerClosed, err) {
		ctx.ErrorF("Could not listen on %s: %v", address, err)
		return err
	}

	<-done

	ctx.InfoF("%s%s http server shut down.", name, address)

	return nil
}

func waitForInterrupt(rtx tracer.Context, notifier chan<- bool) {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, syscall.SIGTERM, syscall.SIGINT)

	s := <-sigs
	rtx.InfoF("Detected signal %v", s)
	notifier <- true

}
