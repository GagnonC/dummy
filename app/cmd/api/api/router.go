package api

import (
	"github.com/gorilla/mux"
	"net/http"
	"os"
	utilContext "synq/app/pkg/util/context"
)

func NewRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	ctxProvider := utilContext.DefaultContextProvider("api", os.Stdout)
	ctx := ctxProvider("api", "synq", "api", " api root call")
	rInit := &iroute{
		ctx: ctx,
	}

	for _, route := range rInit.getRoutes() {
		if route.Method != "" {
			router.
				Methods(route.Method).
				Path(route.Pattern).
				Name(route.Name).
				Handler(route.HandlerFunc)
		} else {
			router.
				Path(route.Pattern).
				Name(route.Name).
				Handler(route.HandlerFunc)
		}
	}
	corsRouter := enableCors(router)
	return corsRouter
}

func enableCors(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		handler.ServeHTTP(w, r)
	})
}
