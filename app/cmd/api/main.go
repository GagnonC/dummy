package main

import (
	"flag"
	"fmt"
	api "synq/app/cmd/api/api"
	utilContext "synq/app/pkg/util/context"
	startup "synq/app/pkg/util/startup"
)

const (
	appname = "api"
)

var (
	port = flag.Int("port", 3030, "Spec which port to proc on")
)

func main() {
	flag.Parse()
	startup.StartupEndPoint(appname, "backEnd", *port, apiInit)
}

func apiInit(startupCtx utilContext.Context) {
	startupCtx.InfoF("Starting up harness on Port %v\n", *port)

	router := api.NewRouter()

	err := api.StartHttpServerWithGracefulShutdown(startupCtx, appname, fmt.Sprintf(":%d", *port), router)
	if err != nil {
		startupCtx.ErrorF("Error with Http Server: %d", err)
	}
}
