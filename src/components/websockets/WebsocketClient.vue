<script>
import WebsocketMessage from './WebsocketMessage.vue';
export default {
    components: {
        WebsocketMessage,
    },
    data() {
        return {
            connected: false,
            url: 'wss://localhost:5000/v1/api/ws',
            socket: null,
            currentMessage: '',
            messages: []
        }
    },
    methods: {
        connect(websocketURL) {
            if (this.connected) {
                return;
            }
            this.socket = new WebSocket(websocketURL);
            this.socket.timeout = 10000;
            this.socket.binaryType = 'blob';
            this.messages.push({
                type: 'outbound',
                message: `Attempting to open a websocket connection to: ${websocketURL}`
            });
            this.socket.onopen = () => {
                this.connected = true;
                this.socket.addEventListener('message', event => {
                    this.onMessageReceived(event);
                });
                this.messages.push({
                    type: 'inbound',
                    message: 'Connection with server established succesfully'
                });
            };
        },
        disconnect() {
            if (!this.connected) {
                return;
            }
            this.socket.close();
            this.connected = false;
            this.messages.push({
                type: 'inbound',
                message: `Closed websocket connection to: ${this.url}`
            });
        },
        sendMessage() {
            if (!this.connected) {
                return;
            }
            if (!this.currentMessage) {
                return;
            }
            this.socket.send(this.currentMessage);
            this.messages.push({
                type: 'outbound',
                message: this.currentMessage
            });
        },
        onMessageReceived(event) {
            event.data.text().then(message => {this.messages.push({
                type: 'inbound',
                message: message
            })})
        }
    }
}
</script>

<template>
    <div class="playground-container">
        <div class="playground-row">
            <span>URL:</span>
            <input type="url" v-model="this.url" />
            <div class="buttons">
                <button id="connect" v-if="!this.connected" @click="connect(this.url)">Connect</button>
                <button id="disconnect" v-if="this.connected" @click="disconnect">Disconnect</button>
            </div>
        </div>
        <div class="playground-row">
            <span>Message:</span>
            <input type="text" v-model="this.currentMessage" />
            <div class="buttons">
                <button id="send" @click="sendMessage">Send</button>
            </div>
        </div>
        <span>Output:</span>
        <div class="playground-output-container">
            <websocket-message v-for="(message, index) in messages" v-bind="message" :key="index" />
        </div>
    </div>
</template>

<style scoped>
.playground-container {
    margin-block: 1rem;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    overflow-x: auto;
}

.playground-row {
    display: flex;
    flex: 1;
    flex-direction: row;
    padding-block: 0.5rem ;
    gap: 1rem;
}

.playground-row span {
    flex: 1;
}

.playground-row input {
    flex: 8;
    padding-inline: 1rem;
    border: 1px solid #e0e0e0;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
    flex: 1;
}

.buttons button {
    width: 100%;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
}

button#connect {
    background-color: green;
}

button#disconnect {
    background-color: #db1222;
}

button#send {
    background-color: #344D78;
}

.playground-output-container {
    margin-top: 1rem;
    height: 600px;
    background-color: #f5f5f5;
    overflow: auto;
    overflow-y: scroll;
}
</style>