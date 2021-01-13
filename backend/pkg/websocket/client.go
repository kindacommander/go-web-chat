package websocket

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID       string
	UserName string
	Conn     *websocket.Conn
	Pool     *Pool
}
type IncomingMessage struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

type OutcomingMessage struct {
	Sender string `json:"sender"`
	Body   string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var message OutcomingMessage
		json.Unmarshal([]byte(p), &message)

		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", string(p))
		fmt.Printf("Message Provided: %+v\n", message)
		fmt.Printf("Message type: %v\n", messageType)
	}
}
