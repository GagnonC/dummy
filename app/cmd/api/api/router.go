package api

import (
	"context"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"net/http"
	"os"
	"synq/app/pkg/util/tracer"
)

func NewRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	ctxProvider := tracer.DefaultContextProvider("api", os.Stdout)
	ctx := ctxProvider("api", "api", "api", " api root call")
	rInit := &iroute{
		ctx: ctx,
	}

	router.Use(traceMiddleware(ctxProvider, rInit))

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

func traceMiddleware(rtx tracer.ContextProvider, rt *iroute) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			unqID := uuid.New().String()
			ctx := rtx("api", "", "", unqID)
			r = r.WithContext(context.WithValue(r.Context(), "trace", unqID))
			rt.ctx = ctx
			next.ServeHTTP(w, r)
		})
	}
}
