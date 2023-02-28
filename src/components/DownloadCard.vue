<script>
export default {
    props: {
        title: { type: String, required: true },
        url: { type: String, required: true },
        content: { type: String, required: true }
    },
}
</script>

<template>
    <div class="download-card">
        <a :href="url" target="_blank">
            <div class="header">
                <span>{{ title }}</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
        </a>
        <div class="content">
            <p>{{ content }}</p>
        </div>
    </div>
</template>

<style scoped>
.download-card {
    background-color: #f5f5f5;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 1.5rem;
}

.download-card .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #344D78;
    color: white;
    padding: 1rem 0.75rem;
}

.download-card .header span {
    font-weight: normal;
}

.download-card a {
    color: white;
    text-decoration: none;
    font-size: medium;
}

.download-card .content p {
    margin: 0;
    padding: 1rem 0.75rem;
}

</style>