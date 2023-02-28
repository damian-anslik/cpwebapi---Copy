<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
import { quickstartIndividual, quickstartInstitutional } from "@/docs/quickstart";
import BaseLayout from '@/layouts/BaseLayout.vue';
import DownloadCard from '@/components/DownloadCard.vue'
import AccountToggle from '@/components/AccountToggle.vue'
import Warning from '@/components/Warning.vue';

export default {
  components: {
    BaseLayout,
    DownloadCard,
    AccountToggle,
    Warning
  },
  data() {
    return {
      content: null,
      store: useAccountTypeStore(),
      downloads: [
        {
          title: 'API Gateway',
          content: 'Download the latest version of the Client Portal API Gateway',
          url: 'https://download2.interactivebrokers.com/portal/clientportal.gw.zip'
        },
        {
          title: 'Java',
          content: 'Download the latest version of the Java Runtime Environment',
          url: 'https://www.java.com/en/download/'
        }
      ]
    }
  },
  watch: {
    content() {
      hljs.highlightAll();
    }
  },
  computed: {
    activeTab() {
      let content = (this.store.accountType == 'individual') ? quickstartIndividual : quickstartInstitutional;
      let parsedContent = marked.parse(content);
      this.content = parsedContent;
      return parsedContent;
    }
  }
}
</script>

<template>
  <base-layout>
    <template #content>
      <div class="content-header">
        <h2>Quickstart Guide</h2>
        <account-toggle id="active"/>
      </div>
      <span v-if="activeTab.length!=0" v-html="activeTab"></span>
      <warning v-else>
        <p>This page is under construction. Please check back later.</p>
      </warning>
    </template>
    <template #aside>
      <div class="downloads">
        <h2>Downloads</h2>
        <download-card v-for="download in downloads" v-bind="download" />
      </div>
    </template>
  </base-layout>
</template>

<style scoped>
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.content-header:last-child {
  display: none;
}

.downloads {
  display: flex;
  flex-direction: column;
  margin-inline: 1.5rem;
}

#active {
  display: none;
}

@media only screen and (min-width: 700px) {
  #active {
    display: block;
  }

  .downloads {
    margin-bottom: 3rem;
  }
}

@media only screen and (min-width: 1200px) {
  .downloads {
    margin-inline: 0;
    margin-right: 1.5rem;
    margin-block: 3rem;
  }
}
</style>