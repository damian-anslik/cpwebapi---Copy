<script>
import BaseLayout from '@/layouts/BaseLayout.vue';
import ExpandableCard from '@/components/ExpandableCard.vue'
import LatestUpdatesList from '@/components/home/LatestUpdatesList.vue'
import ChatbotPlayground from '@/components/chatbot/ChatbotPlayground.vue'
import { frequentlyAskedQuestions } from '@/docs/faqs';
import { home } from '@/docs/home';

export default {
  components: {
    BaseLayout,
    ExpandableCard,
    LatestUpdatesList,
    ChatbotPlayground
  },
  data() {
    return {
      frequentlyAskedQuestions,
      content: marked.parse(home)
    }
  }
}
</script>

<template>
  <base-layout>
    <template #content>
      <span v-html="content"></span>
      <chatbot-playground />
      <section class="frequently-asked-questions">
        <h2>Frequently Asked Questions</h2>
        <expandable-card v-for="question in frequentlyAskedQuestions" v-bind="question" />
      </section>
    </template>
    <template #aside>
      <section class="latest-updates-container">
        <div class="latest-updates-header">
          <h2>Latest Updates</h2>
          <router-link to="/changelog">Changelog</router-link>
        </div>
        <latest-updates-list />
      </section>
    </template>
  </base-layout>
</template>

<style scoped>
.latest-updates-container {
  margin-inline: 1.5rem;
}

.latest-updates-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}

.latest-updates-header a {
  text-decoration: underline;
  color: var(--primary);
  font-size: medium;
  font-weight: bold;
}

@media only screen and (min-width: 1200px) {
  .latest-updates-container {
    margin-top: 3rem;
    margin-inline: 0;
    margin-right: 1.5rem;
  }
}
</style>