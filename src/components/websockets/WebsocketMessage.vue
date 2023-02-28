<script>
export default {
    props: {
        message: {type: String, required: true},
        type: {type: String, required: true}
    },
    computed: {
        messageIcon () {
            const OUTBOUND_MESSAGE_ICON = 'fa-solid fa-arrow-right';
            const INBOUND_MESSAGE_ICON = 'fa-solid fa-arrow-left';
            return (this.type == 'outbound') ? OUTBOUND_MESSAGE_ICON : INBOUND_MESSAGE_ICON;
        }
    }
}
</script>

<template>
    <div class="message">
        <i :class="this.messageIcon"></i>
        <span>{{ this.message }}</span>
    </div>
</template>

<style>
.message {
    width: 100%;
    padding: 0.5rem 1rem;
    gap: 1rem;
    word-break: break-all;
}
.message i {
    padding-right: 1rem;
}
</style>