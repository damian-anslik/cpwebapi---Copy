<script>
import BaseLayout from '@/layouts/BaseLayout.vue';
import ExpandableCard from '@/components/ExpandableCard.vue'
import ResourceLink from '@/components/support/ResourceLink.vue'
import Warning from '@/components/Warning.vue'
export default {
  components: {
    BaseLayout,
    ExpandableCard,
    ResourceLink,
    Warning
  },
  data() {
    return {
      cards: [
        {
          title: 'Step One: Ensure your session is authenticated',
          content: `
          <p>
            In order to use Client Portal API, an authenticated brokerage session must be established. 
            The easiest way to check if the current session is authenticated is by making a POST request to the endpoint <b>/iserver/auth/status</b>. 
            If the session is fully authenticated the response will contain the field 'authenticated' set to true. 
            If you are not seeing this, first check the <a href='./quickstart'>Quickstart</a> page for instructions on authenticating your session, or <a href="./authentication">Authentication</a> for common authentication questions.
          </p>
          <p>
            <b>Note:</b> It may take a some time for the <b>/iserver/auth/status</b> endpoint to return a true value for the authentication status when logging in. 
            If you're using Client Portal API for the first time, please allow up to 15 minutes for the session to fully authenticate.
          </p>
          `
        },
        {
          title: 'Step Two: Call other endpoints',
          content: `
            <p>
              Most endpoints are self-contained, however in a few cases a preceeding endpoint must first be called before calling another endpoint. 
              As an example of this, the <b>/portfolio/accounts</b> endpoint must be called prior to other <b>/portfolio</b> endpoints in an individual account structure, 
              and <b>/portfolio/subaccounts</b> must be called first in an advisor or master account structure. 
              This will return a list of accounts that are valid to use with the other <b>/portfolio</b> endpoints.
            </p>
            `
        },
        {
          title: 'Step Three: Generate request logs',
          content: `
            <p>
              When troubleshooting Client Portal API issues, it may sometimes be necessary for our client services team to obtain additional information about the request in the form of a request log. 
              As such you may be asked to generate a request log (HAR) and send it to us.
            </p>
            <p>
              This file contains additional information about the network requests that are sent and received by your browser. 
              Your browser can generate such files by recording the content, timeline and status of network requests and responses while the issue occurs.
              Most browsers have an option to preserve logs, which can then be exported. 
              Please see the 'How to generate a HAR file' link in the resources section of this page.
            </p>
          `
        },
        {
          title: 'Get in touch with us',
          content: `
          <p>
            Interactive Brokers API support can be reached by creating a ticket in the Secure Message Center in Client Portal. See steps below for more information:
            <ol>
              <li> Login to <a href="https://interactivebrokers.com/en/home.php" target="_blank">Client Portal</a></li>
              <li> Click on the head & shoulders icon in the upper right corner and select the Help option</li>
              <li> Click on the Secure Message Center option and click "Compose" -> "New Ticket"</li>
              <li> To report a Client Portal Web API issue, or to get support for a specific feature, please select the "API" -> "REST/Web API" from the topics list on the left</li>
              <li> Enter a meaningful subject line and provide a concise description for the issue, steps taken, request details, add any log files as an attachment. Please note, you can only attach PDF, HAR files with logs as well as JPEG and PNG images if you would like to provide screenshots illustrating the issue.</li>
          </p>
          `
        }
      ],
      resources: [
        {
          title: 'How to generate a HAR file',
          url: 'https://ibkr.info/article/3512',
          description: 'Information on generating the HAR file used when troubleshooting web API issues.'
        },
        {
          title: 'Troubleshooting Client Portal API login failures',
          url: 'https://ibkr.info/node/1132',
          description: 'Review this article if you are experiencing issues logging in to Client Portal API.'
        },
      ]
    }
  }
}
</script>

<template>
  <base-layout>
    <template #content>
      <h2>Support</h2>
      <warning>
        <p>
          For common integration scenarios, make sure you have reviewed the <router-link to="/use-cases">use cases</router-link> section first.
        </p>
      </warning>
      <p>
        This page is intended to provide guidance on how to troubleshoot issues with Client Portal API and get
        in touch with the support team.
      </p>
      <p>
        Please note that Interactive Brokers is unable to provide support for third-party solutions. 
        When troubleshooting third-party libraries, try to reproduce the problem using the native Client Portal API first. 
        If the problem still exists after using the native API, contact support; otherwise, contact the third-party developer.
      </p>
      <expandable-card v-for="card in cards" v-bind="card" />
    </template>
    <template #aside>
      <div class="resources">
        <h2>Resources</h2>
        <resource-link v-for="resource in resources" v-bind="resource" />
      </div>
    </template>
  </base-layout>
</template>

<style scoped>
.resources {
  display: flex;
  flex-direction: column;
  margin-inline: 1.5rem;
}

@media only screen and (min-width: 1200px) {
  .resources {
    margin-inline: 0;
    margin-right: 1.5rem;
    margin-top: 3rem;
  }
}
</style>