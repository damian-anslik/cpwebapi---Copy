<script>
import ChatbotMessage from './ChatbotMessage.vue';
export default {
    components: {
        ChatbotMessage,
    },
    data() {
        return {
            url: 'http://127.0.0.1:8000',
            currentPrompt: '',
            chatHistory: []
        }
    },
    methods: {
        sendMessage() {
            if (!this.currentPrompt) {
                return;
            }
            this.chatHistory.push({
                type: 'outbound',
                message: this.currentPrompt
            });
            fetch(`${this.url}/completion?prompt=${this.currentPrompt}`)
                .then(response => response.json())
                .then(data => {
                    this.chatHistory.push({
                        type: 'inbound',
                        // Clean up the response
                        message: data.text.replace(/(\r\n|\n|\r)/gm, '')
                    });
                    this.currentPrompt = '';
                });
        }
    }
}
</script>

<template>
    <div class="playground-container">
        <div class="playground-output-container">
            <chatbot-message v-for="(message, index) in chatHistory" v-bind="message" :key="index" />
        </div>
        <br />
        <div class="playground-row">
            <input type="text" v-model="this.currentPrompt" />
            <div class="buttons">
                <button id="send" @click="sendMessage">Send</button>
            </div>
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