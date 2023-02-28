<template>
    <div class="warning-container">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <slot></slot>
    </div>
</template>

<style scoped>
.warning-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    text-align: left;
    background-color: #FFC107;
    padding: 0.5rem 1.5rem;
    margin-block: 0.5rem;
}
.warning-container i {
    font-size: large;
}
</style>