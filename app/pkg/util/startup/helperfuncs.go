package startup

import (
	"flag"
	"fmt"
	utilContext "synq/app/pkg/util/context"
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

func logStartupVersion(ctx utilContext.Context, serviceName, service string) {
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

func ParseFlags(startupCtx utilContext.Context) {
	flag.Parse()

	if *nonAwsInstance {
		//TODO
		/*
			build out to do local vs cloud startup
		*/
	}
	return
}
