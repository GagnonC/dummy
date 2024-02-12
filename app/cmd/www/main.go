package main

import (
	"flag"
	"fmt"

	web "synq/app/cmd/www/web"
	utilContext "synq/app/pkg/util/context"
	startup "synq/app/pkg/util/startup"
)

const (
	appname = "www"
)

var (
	port        = flag.Int("port", 3000, "Spec which port to proc on")
	staticIndex = flag.String("staticIndex", "../../../www/build", "Fully qualified path to static resources.")
)

func main() {
	flag.Parse()
	startup.StartupEndPoint(appname, "backEnd", *port, harnessInit)
}

func harnessInit(startupCtx utilContext.Context) {
	startupCtx.InfoF("Starting up harness on Port %v\n", *port)
	web.StaticConfig.ResourceDir = *staticIndex

	router := web.NewRouter()

	err := web.StartHttpServerWithGracefulShutdown(startupCtx, appname, fmt.Sprintf(":%d", *port), router)
	if err != nil {
		startupCtx.ErrorF("Error with Http Server: %d", err)
	}
}
