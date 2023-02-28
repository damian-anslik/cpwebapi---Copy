<script>
export default {
    props: {
        title: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String, required: true }
    }
}
</script>

<template>
    <div class="link-container">
        <a :href="this.url" target="_blank">
            <span>{{ this.title }}</span>
        </a>
        <i class="fa-solid fa-circle-question" :title="this.description"></i>
    </div>
</template>

<style>
.link-container {
    display: flex;
    flex-direction: row;
    font-size: small;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.link-container a {
    color: black;
    font-weight: normal;
}

.link-container i {
    color: #344D78;
}
</style>