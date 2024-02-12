package web

import (
	"net/http"
)

type route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type routes []route

func getRoutes() routes {
	return routes{
		route{"index", "", "/", staticHandler()},
		route{"static resources (dev only)", "", "/{_:(?:.*)}", staticHandler()},
	}
}
