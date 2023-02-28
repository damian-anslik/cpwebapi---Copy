<script>
export default {
    props: {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    data() {
        return {
            isHidden: true
        }
    },
    methods: {
        toggleContent() {
            this.isHidden = !this.isHidden;
            this.toggleDropdownStatusIcon();
        },
        toggleDropdownStatusIcon() {
            let icon = this.$el.querySelector('i');
            if (this.isHidden) {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        }
    }
}
</script>

<template>
    <div class="expandable-card">
        <div class="header" @click="toggleContent">
            <h4>{{ title }}</h4>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="content" :hidden="this.isHidden">
            <span v-html="content"></span>
        </div>
    </div>
</template>

<style scoped>
.expandable-card {
    margin-bottom: 1.25rem;
    background-color: var(--bg-secondary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: var(--secondary);
    padding: 1rem 0.75rem;
    gap: 1rem;
    user-select: none;
}

.expandable-card .header > * {
    color: white;
    margin: 0;
}

.expandable-card .header h4 {
    color: white;
    font-weight: normal;
}

.expandable-card .content {
    color: black;
    margin-block: 0.5rem;
    padding: 0.75rem 0.75rem;
}
</style>