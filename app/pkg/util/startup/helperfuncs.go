package startup

import (
	"flag"
	"fmt"
	"synq/app/pkg/util/tracer"
)

func setServiceName(name string) {
	serviceName = &name
}

func getServiceName() string {
	if serviceName != nil && *serviceName != "" {
		return *serviceName
	}
	//returning a default so if serviceName isn't specified, it does not fail spectacularly
	return "default"
}

func logStartupVersion(ctx tracer.Context, serviceName, service string) {
	line := fmt.Sprintf("Starting up %s", serviceName)
	if service != "" {
		line += fmt.Sprintf(" - %s", service)
	}

	//TODO
	/*
		once in git snag and print out the hash
	*/

	ctx.InfoF(line)
}

func ParseFlags(startupCtx tracer.Context) {
	flag.Parse()

	if *isLocal {
		//TODO
		/*
			build out to do local vs cloud startup
		*/
	}
	return
}
