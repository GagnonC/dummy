package startup

import (
	"flag"
	"os"
	"synq/app/pkg/util/tracer"
)

var (
	serviceName *string
	isLocal     = flag.Bool("isLocal", false, "Set to true in dev (local) environment")
)

func StartupEndPoint(appName, service string, port int, unq func(tracer.Context)) {
	setServiceName(service)

	ctxProvider := tracer.DefaultContextProvider(appName, os.Stdout)
	startupCtx := ctxProvider("none", "none", appName, "startup")
	shutdownCtx := ctxProvider("none", "none", appName, "shutdown")

	logStartupVersion(startupCtx, appName, service)

	// Handle panics by logging to context
	defer func() {
		if err := recover(); err != nil {
			startupCtx.ErrorF("PANIC:  %v\n\nShutting down %v-%v", err, serviceName, service)
		}
	}()

	ParseFlags(startupCtx)
	startupCtx.InfoF("Checking Flags for - %v-%v:\n\tisLocal = %v\n", appName, service, *isLocal)
	defer func() { shutdownCtx.InfoF("Shutting down %v-%v", appName, service) }()
	unq(startupCtx)
}
