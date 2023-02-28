<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
import { authenticationIndividual, authenticationInstitutional } from "@/docs/authentication";
import BaseLayout from '@/layouts/BaseLayout.vue'
import DownloadCard from '@/components/DownloadCard.vue'
import AccountToggle from '@/components/AccountToggle.vue'
import ResourceLink from '@/components/support/ResourceLink.vue';
import Warning from '@/components/Warning.vue';
export default {
  components: {
    BaseLayout,
    DownloadCard,
    AccountToggle,
    ResourceLink,
    Warning
  },
  data() {
    return {
      store: useAccountTypeStore(),
      content: null,
      downloads: [
        {
          title: 'Gateway',
          content: 'Download a latest version of the Client Portal API gateway.',
          url: 'https://download2.interactivebrokers.com/portal/clientportal.gw.zip'
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
      let activeTab = (this.store.accountType == 'individual') ? authenticationIndividual : authenticationInstitutional;
      let parsedContent = marked.parse(activeTab);
      this.content = parsedContent;
      return parsedContent;
    },
  },
}
</script>

<template>
  <base-layout>
    <template #content>
      <div class="content-header">
        <h2>Authentication</h2>
        <account-toggle id="active" />
      </div>
      <warning v-if="this.store.accountType == 'individual'">
        <p>
          When navigating to the Client Portal API Gateway login page, you may see a warning from your browser regarding
          a missing valid SSL certificate.
          This is expected. The API gateway does not come bundled with a valid certificate and it is up to the user to
          install one signed by themselves.
          For information on how to generate and install a valid gateway certificate, please see the following <a
            href="./use-cases#invalid-ssl-certificate">article</a> in the use cases page.
        </p>
      </warning>
      <component v-html="activeTab"></component>
    </template>
    <template #aside>
      <div class="downloads">
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
}

@media only screen and (min-width: 1200px) {
  .downloads {
    margin-inline: 0;
    margin-right: 1.5rem;
    margin-top: 3rem;
  }
}
</style>