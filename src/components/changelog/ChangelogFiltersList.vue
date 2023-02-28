<script>
import { useChangelogStore } from '@/stores/changelogStore';
import ChangelogFilter from '@/components/changelog/ChangelogFilter.vue';
export default {
    setup() {
        const store = useChangelogStore();
        return {
            store,
        };
    },
    components: {
        ChangelogFilter
    }
}
</script>

<template>
    <div class="changelog-filters-list">
        <div class="header">
            <h2>Filter changes</h2>
            <a v-if="store.activeFilters.length != 0" @click="store.clearFilters">Clear all</a>
        </div>
        <div class="changelog-filters">
            <changelog-filter v-for="(filter, index) in store.changelogTags" :tag="filter"
                :isActive="store.activeFilters.includes(filter)" :key="index" @click="store.toggleFilter(filter)" />
        </div>
    </div>
</template>

<style scoped>
.changelog-filters-list {
    display: flex;
    flex-direction: column;
}

.changelog-filters-list .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
}

.changelog-filters-list .header a {
    text-decoration: underline;
    color: #db1222;
    font-size: small;
    font-weight: bold;
    cursor: pointer;
}

.changelog-filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.changelog-filters > * {
    cursor: pointer;
}
</style>