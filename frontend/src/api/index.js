var socket = new WebSocket("ws://192.168.31.103:8080/ws")

let connect = cb => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };

    socket.onmessage = msg => {
        console.log(msg);
        cb(msg);
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
};

let sendMsg = (sender, msg) => {
    console.log("sending msg: ", msg)
    socket.send(JSON.stringify({
        sender: sender,
        body: msg
    }));
};

export { connect, sendMsg };