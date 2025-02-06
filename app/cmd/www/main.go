package main

import (
	"flag"
	"fmt"
	"synq/app/pkg/util/tracer"

	web "synq/app/cmd/www/web"
	startup "synq/app/pkg/util/startup"
)

const (
	appname = "www"
)

var (
	port        = flag.Int("port", 3000, "Spec which port to proc on")
	staticIndex = flag.String("staticIndex", "../../../www/out", "Fully qualified path to static resources.")
)

func main() {
	flag.Parse()
	startup.StartupEndPoint(appname, "backEnd", *port, harnessInit)
}

func harnessInit(startupCtx tracer.Context) {
	startupCtx.InfoF("Starting up harness on Port %v\n", *port)
	web.StaticConfig.ResourceDir = *staticIndex

	router := web.NewRouter()

	err := web.StartHttpServerWithGracefulShutdown(startupCtx, appname, fmt.Sprintf(":%d", *port), router)
	if err != nil {
		startupCtx.ErrorF("Error with Http Server: %d", err)
	}
}
