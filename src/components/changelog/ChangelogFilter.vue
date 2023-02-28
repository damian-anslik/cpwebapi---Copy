<script>
export default {
    props: {
        tag: { type: String, required: true },
        isActive: { type: Boolean, required: false, default: false },
    }
}
</script>

<template>
    <div class="filter-container" :id="(isActive) ? 'active' : null">
        <span>{{ tag }}</span>
    </div>
</template>

<style scoped>
.filter-container {
    background-color: #344D78;
    color: white;
    font-size: small;
    width: fit-content;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    user-select: none;
}

#active {
    background-color: #5E7D99;
}

@media only screen and (max-width: 700px) {
    #active {
        display: unset;
    }    
}
</style>
