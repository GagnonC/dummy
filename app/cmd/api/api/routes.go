package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	utilContext "synq/app/pkg/util/context"
	"time"
)

type iroute struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
	ctx         utilContext.Context
	hitCount    int
	mu          sync.Mutex
}

type routes []*iroute

func (rt *iroute) getRoutes() routes {
	return routes{
		&iroute{Name: "PING", Method: "GET", Pattern: "/pinging", HandlerFunc: rt.ping},
		&iroute{Name: "HIT", Method: "GET", Pattern: "/hitCount", HandlerFunc: rt.getHitCountHandler},
	}
}

func (rt *iroute) ping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	rt.pingLog(r)

	_, err := fmt.Fprint(w, "OK")
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
	}
}

func (rt *iroute) pingLog(r *http.Request) {
	rt.ctx.DebugF("Request from IP: %s, Endpoint: %s", r.RemoteAddr, r.URL.Path)
}

func (rt *iroute) getHitCount() int {
	rt.mu.Lock()
	defer rt.mu.Unlock()
	rt.hitCount++
	return rt.hitCount
}

func (rt *iroute) resetHitCount() {
	rt.mu.Lock()
	defer rt.mu.Unlock()

	rt.hitCount = 0
}

func (rt *iroute) startHitCountResetTimer() {
	go func() {
		for {
			// Reset the hit count every 24 hours
			time.Sleep(24 * time.Hour)
			rt.resetHitCount()
		}
	}()
}

func (rt *iroute) getHitCountHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	hitCount := rt.getHitCount()
	rt.startHitCountResetTimer()

	response := struct {
		HitCount int `json:"hitCount"`
	}{HitCount: hitCount}

	json.NewEncoder(w).Encode(response)
}
