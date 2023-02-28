<script>
import AccountToggle from './AccountToggle.vue';
export default {
    methods: {
        unrollNavbarLinks(event) {
            // If event target is not an 'a' or 'i', return
            if (event.target.tagName !== 'A' && event.target.tagName !== 'I') {
                return;
            }
            this.$el.querySelector(".links").classList.toggle("unrolled");
            this.$el.querySelector(".fa-solid.fa-xmark").classList.toggle("hidden");
        }
    },
    components: { AccountToggle }
}
</script>

<template>
  <nav>
    <div class="branding">
      <a href="./" class="branding-logo">
        <img src="@/assets/ib-logo-text-black.svg" alt="ibkr-logo">
        <h6>Client Portal API Documentation</h6>
      </a>
      <i class="fa-solid fa-xmark hidden" @click="unrollNavbarLinks"></i>
    </div>
    <div class="links" @click="unrollNavbarLinks">
      <router-link to="/">Home</router-link>
      <router-link to="/quickstart">Quickstart</router-link>
      <router-link to="/authentication">Authentication</router-link>
      <router-link to="/endpoints">Endpoints</router-link>
      <router-link to="/websockets">Websockets</router-link>
      <router-link to="/use-cases">Use Cases</router-link>
      <router-link to="/changelog">Changelog</router-link>
      <router-link to="/support">Support</router-link>
      <i class="fa-solid fa-chevron-down"></i>
      <account-toggle />
    </div>
    <div class="links-desktop">
      <router-link to="/">Home</router-link>
      <router-link to="/quickstart">Quickstart</router-link>
      <router-link to="/authentication">Authentication</router-link>
      <router-link to="/endpoints">Endpoints</router-link>
      <router-link to="/websockets">Websockets</router-link>
      <router-link to="/use-cases">Use Cases</router-link>
      <router-link to="/changelog">Changelog</router-link>
      <router-link to="/support">Support</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  z-index: 99;
  position: sticky;
  display: flex;
  top: 0;
  flex-direction: column;
  user-select: none;
  background-color: #F5F5F5;
  width: 100%;
  padding-bottom: 0;
  overflow: auto;
}

nav a {
  text-decoration: none;
  color: black;
  font-weight: normal;
}

nav a:hover {
  color: #DB1222;
}

nav a.router-link-active {
  color: white;
}

.branding {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.branding i.hidden {
  display: none;
}

.branding i {
  font-size: large;
  display: block;
  cursor: pointer;
}

.branding i:hover {
  color: #DB1222;
}

.branding h6 {
  margin: 0;
  width: fit-content;
}

.branding a {
  color: black;
}

.links {
  background-color: #db1222;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding-inline: 1.5rem;
}

.links > * {
  color: white;
  cursor: pointer;
}

.links > a.router-link-active {
  padding-block: 1rem;
  flex: 1;
}

.links > .toggle-switch {
  display: none;
}

.links:not(.unrolled) > a:not(.router-link-active) {
  display: none;
}

.links.unrolled {
  position: sticky;
  width: 100%;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  padding: 0;
  z-index: 99;
}

.links.unrolled > a {
  width: 100%;
  color: black;
  padding-block: 1rem;
  padding-inline: 1.5rem;
}

.links.unrolled > .toggle-switch {
  margin-left: 1.5rem;
  position: fixed;
  bottom: 5%;
  display: block;
}

.links.unrolled > .toggle-switch {
  display: block;
}

.links.unrolled > a.router-link-exact-active {
  background-color: #DB1222;
  color: white;
  padding-block: 1rem;
  padding-inline: 1.5rem;
  flex: none;
}

.links.unrolled > a:hover:not(.router-link-exact-active) {
  color: #DB1222;
}

.links.unrolled > i {
  display: none;
}

.links-desktop {
  display: none;
}

@media only screen and (min-width: 700px) {
  nav {
    height: 100vh;
    width: 225px;
  }

  nav a:not(:first-child) {
    display: block;
  }

  .links {
    display: none;
  }

  .links-desktop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    background-color: #F5F5F5;
    flex-direction: column;
    padding: 0;
  }

  .links-desktop a {
    width: 100%;
    color: black;
    padding-block: 1rem;
    padding-left: 1.5rem;
  }

  .links-desktop a:hover {
    color: #DB1222;
  }

  .links-desktop a.router-link-exact-active {
    background-color: #DB1222;
    color: white;
  }

  .links-desktop i {
    display: none;
  }

  .branding {
    padding-left: 1.5rem;
  }

  .branding > i {
    display: none;
  }

  .links.unrolled {
    display: none;
  }
}
</style>