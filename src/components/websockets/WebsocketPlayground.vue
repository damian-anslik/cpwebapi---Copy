<script>
import WebsocketClient from './WebsocketClient.vue';
import Warning from '../Warning.vue';

export default {
    components: {
        WebsocketClient,
        Warning
    },
}
</script>

<template>
    <h3>Websockets Playground</h3>
    <warning>
        <p>
            In order to use the playground, you need to authenticate your session. See the
            <router-link to='/authentication'>Authentication</router-link> page for
            getting started instructions.
        </p>
    </warning>
    <p>
        The following playground can be used to test the websockets functionality before implementing it in your
        application.
    </p>
    <websocket-client id="websocket-playground" />
</template>