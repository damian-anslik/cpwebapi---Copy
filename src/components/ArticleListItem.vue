<script>
export default {
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
  }
}
</script>

<template>
  <article>
    <h4 :id="`${this.id}`">{{ this.title }}</h4>
    <component :innerHTML="this.content" />
    <hr>
  </article>
</template>