<script>
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css'
export default {
    props: {
        accountType: {type: String, required: true}
    },
    methods: {
        renderSwagger() {
            SwaggerUI({
                spec: require(`@/docs/endpoints/swagger-${this.accountType}.json`),
                dom_id: '#swagger'
            });
        }
    },
    mounted() {
        this.renderSwagger();
    },
    updated() {
        this.renderSwagger();
    }
}
</script>

<template>
    <div id="swagger"></div>
</template>

<style>
/* Override the default swagger wrapper to fill entire screen */
.swagger-ui .wrapper {
    margin: 0;
    width: 100%;
    max-width: none;
    padding: 0;
}
/* Comment these out if you need to show the information */
.swagger-ui .info hgroup.main {
    display: none;
}
.swagger-ui .scheme-container {
    display: none;
}
.swagger-ui .info {
    display: none;
}
.swagger-ui .opblock-tag {
    padding: 0.5rem 0rem;
    padding-right: 1px;
    font-size: large;
    border-bottom: 0;
}

</style>