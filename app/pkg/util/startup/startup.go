package startup

import (
	"flag"
	"os"
	utilContext "synq/app/pkg/util/context"
)

var (
	serviceName    *string
	nonAwsInstance = flag.Bool("nonAwsInstance", false, "Set to true in dev (local) environment")
)

func StartupEndPoint(appName, service string, port int, unq func(utilContext.Context)) {
	setServiceName(service)

	ctxProvider := utilContext.DefaultContextProvider(appName, os.Stdout)
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
	startupCtx.InfoF("Checking Flags for - %v-%v:\n\tnonAwsInstance = %v\n", appName, service, *nonAwsInstance)
	defer func() { shutdownCtx.InfoF("Shutting down %v-%v", appName, service) }()
	unq(startupCtx)
}
