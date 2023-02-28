<script>
import { useAccountTypeStore } from '@/stores/accountTypeStore.js';
import { websocketsIndividual, websocketsInstitutional } from "@/docs/websockets";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ScrollableSidenav from "@/components/ScrollableSidenav.vue";
import AccountToggle from '@/components/AccountToggle.vue'
import ArticleList from '../components/ArticleList.vue';
import WebsocketPlayground from '../components/websockets/WebsocketPlayground.vue';
import Warning from '../components/Warning.vue';

export default {
  components: {
    BaseLayout,
    ScrollableSidenav,
    AccountToggle,
    ArticleList,
    WebsocketPlayground,
    Warning,
  },
  data() {
    let store = useAccountTypeStore();
    return {
      store: store,
      content: null,
      activeSectionID: null
    }
  },
  methods: {
    onScroll() {
      let elements = Array.prototype.slice.call(document.getElementsByTagName('h4'));
      let elementToIdMap = elements.reduce((result, ele) => {
        // Get the offset of the header relative to the top of the document
        let offset = ele.offsetTop;
        result[offset] = ele.id;
        return result
      }, {})
      let currentScrollPosition = window.scrollY;
      let scrollPositionOffset = 25;
      for (let eleOffset in elementToIdMap) {
        if (parseFloat(eleOffset) >= currentScrollPosition - scrollPositionOffset) {
          this.activeSectionID = elementToIdMap[eleOffset];
          return
        }
      }
    }
  },
  watch: {
    content() {
      hljs.highlightAll();
    }
  },
  created() {
    document.addEventListener('scroll', this.onScroll)
  },
  computed: {
    activeTab() {
      let activeTab = (this.store.accountType == 'individual') ? websocketsIndividual : websocketsInstitutional;
      let parsedContent = marked.parse(activeTab);
      this.content = parsedContent;
      return parsedContent;
    },
    getSectionsList() {
      let dummy = document.createElement('div');
      dummy.innerHTML = this.content;
      let sections = [];
      for (let i = 0; i < dummy.children.length; i++) {
        let child = dummy.children[i];
        if (child.tagName == 'H3') {
          sections.push({
            category: child.innerText,
            titles: []
          });
        }
        if (child.tagName == 'H4') {
          sections[sections.length - 1].titles.push({
            id: child.id,
            title: child.innerText
          });
        }
      }
      // Add the playground to the end of the list, if list is not empty
      if (sections.length > 0) {
        sections.push({
          category: 'Websocket Playground',
          titles: [
            {
              id: 'websocket-playground',
              title: 'Websocket Playground'
            }
          ]
        });
      }
      return sections;
    },
    getActiveSectionId() {
      if(this.getSectionsList.length==0) {
        return null;
      }
      return this.activeSectionID || this.getSectionsList[0].titles[0].id; 
    }
  }
}
</script>

<template>
  <base-layout>
    <template #content>
      <div class="content-header">
        <h2>Websockets</h2>
        <account-toggle id="active" />
      </div>
      <warning v-if="activeTab.length == 0">
        <p>
          This page is under construction. Please check back later.
        </p>
      </warning>
      <warning v-else>
        <p>
          In order to use websocket endpoints, make sure you have authenticated your brokerage session first.
          For information on getting started with Client Portal API, please refer to the <a href="./quickstart">Quickstart</a> page.
        </p>
      </warning>
      <component v-html="activeTab" id="parsedContent"></component>
      <div v-if="activeTab.length != 0" class="playground-container">
        <websocket-playground id="websocket-playground" />
      </div>
    </template>
    <template #aside>
      <scrollable-sidenav :sections="getSectionsList" :activeSection="getActiveSectionId" />
    </template>
  </base-layout>
</template>


<style scoped>
.content-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#active {
  display: block;
}

@media (max-width: 700px) {
  #active {
    display: none;
  }

  .playground-container {
    display: none;
  }
}
</style>