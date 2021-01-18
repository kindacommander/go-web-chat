package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/kindacommander/go-web-chat/pkg/websocket"
)

// WS endpoint
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	username, ok := r.URL.Query()["username"]
	if !ok || len(username[0]) < 1 {
		log.Println("Url Param 'username is missing")
		return
	}

	fmt.Println("Websocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Username: strings.Join(username, ""),
		Conn:     conn,
		Pool:     pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App v1.0.0")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
