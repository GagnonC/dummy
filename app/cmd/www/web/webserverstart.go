package web

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	utilContext "synq/app/pkg/util/context"
)

func StartHttpServerWithGracefulShutdown(ctx utilContext.Context, name string, address string, handler http.Handler) error {
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

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		ctx.ErrorF("Could not listen on %s: %v", address, err)
		return err
	}

	<-done

	ctx.InfoF("%s%s http server shut down.", name, address)

	return nil
}

func waitForInterrupt(ctx utilContext.Context, notifier chan<- bool) {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, syscall.SIGTERM, syscall.SIGINT)

	s := <-sigs
	ctx.InfoF("Detected signal %v", s)
	notifier <- true

}
