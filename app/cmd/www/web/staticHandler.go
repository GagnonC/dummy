package web

import (
	"log"
	"net/http"
)

var StaticConfig struct {
	ResourceDir string
}

func staticHandler() http.HandlerFunc {
	if StaticConfig.ResourceDir == "" {
		log.Printf("Static content serving disabled...you should provide either the --local argument or the --staticDir argument")

		return func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Serving static resources is disabled."))
		}
	}

	staticResourceDir := http.Dir(StaticConfig.ResourceDir)
	staticResourceHandler := http.FileServer(staticResourceDir)

	return func(w http.ResponseWriter, r *http.Request) {
		staticResourceHandler.ServeHTTP(w, r)
	}
}
