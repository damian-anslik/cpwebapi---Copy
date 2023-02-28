<script>
import { useChangelogStore } from '@/stores/changelogStore';
import BaseLayout from '@/layouts/BaseLayout.vue';
import ChangelogSection from '@/components/changelog/ChangelogSection.vue';
import ChangelogFiltersList from '@/components/changelog/ChangelogFiltersList.vue';
import Warning from '@/components/Warning.vue';
export default {
  setup: () => ({ store: useChangelogStore() }),
  components:
  {
    BaseLayout,
    ChangelogSection,
    ChangelogFiltersList,
    Warning
  }
}
</script>

<template>
  <base-layout :reverseWrap="true">
    <template #content>
      <h2>Changelog</h2>
      <p>
        This page showcases updates for both Client Portal API and it's Documentation page.
      </p>
      <warning v-if="store.filteredChangelog.length == 0">
        <p>There are no changes available that meet the selected criteria. Remove some filters to see results.</p>
      </warning>
      <changelog-section v-for="(change, index) in store.filteredChangelog" v-bind="change" :key="index" />
    </template>
    <template #aside>
      <div class="filters">
        <changelog-filters-list />
      </div>
    </template>
  </base-layout>
</template>

<style scoped>
.filters {
  margin-inline: 1.5rem;
}

@media only screen and (min-width: 700px) {
  .filters {
    padding-top: 3rem;
  }
}

@media only screen and (min-width: 1200px) {
  .filters {
    padding-top: 3rem;
  }
}
</style>