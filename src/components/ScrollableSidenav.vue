<script>
export default {
    props: {
        sections: {type: Array, required: true},
        activeSection: {type: String, required: false}
    }
}
</script>

<template>
    <div class="scrollable-container">
        <section v-for="section in sections">
            <h3>{{ section.category }}</h3>
            <a 
                v-for="item in section.titles"
                :key="item.id"
                :id="(item.id === this.activeSection) ? 'active' : null"
                :href="`#${item.id}`"
            >
                {{ item.title }}
            </a>
        </section>
    </div>
</template>

<style scoped>
.scrollable-container {
    background-color: #F5F5F5;
    height: 100vh;
    padding-block: 3rem;
    position: sticky;
    right: 0;
    top: 0;
    overflow-y: scroll;
}

.scrollable-container::-webkit-scrollbar {
  display: none;
}

.scrollable-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

h3 {
    margin: 0;
    padding: 1rem 1rem;
}

a {
    text-decoration: none;
    color: #777;
    display: block;
    font-size: small;
    padding: 0.5rem 2rem;
    cursor: pointer;
    font-weight: normal;
}

a#active {
    color: #fff;
    background-color: #344D78;
}

@media only screen and (max-width: 1200px) {
    .scrollable-container {
        display: none;
    }
}
</style>