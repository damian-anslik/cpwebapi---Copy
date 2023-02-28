<script>
import { useChangelogStore } from '@/stores/changelogStore'
import LatestUpdateCard from '@/components/home/LatestUpdateCard.vue'
export default {
    components: {
        LatestUpdateCard
    },
    setup() {
        const store = useChangelogStore();
        return {
            store,
            numUpdates: 3
        }
    },
}
</script>

<template>
    <div class="latest-updates-list">
        <latest-update-card v-for="update in store.recentChanges(numUpdates)" v-bind="update" />
    </div>
</template>

<style scoped>
.latest-updates-list {
    margin-inline: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
}
</style>