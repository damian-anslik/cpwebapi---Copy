<script>
import ArticleListItem from '@/components/ArticleListItem.vue'
export default {
    props: {
        articles: {type: Array, required: false}
    },
    components: {
        ArticleListItem
    },
    methods: {
        mapArticlesToIDs() {
            let elements = Array.prototype.slice.call(document.getElementsByTagName('h4'));
            this.elementToIdMap = elements.reduce((result, ele) => {
                // Get the offset of the header relative to the top of the document
                let offset = ele.offsetTop;
                result[offset] = ele.id;
                return result
            }, {})
        },
        onScroll() {
            let currentScrollPosition = window.scrollY;
            let scrollPositionOffset = 25;
            let elementToIdMap = this.elementToIdMap;
            let activeSectionID = null;
            for (let eleOffset in elementToIdMap) {
                if (parseFloat(eleOffset) >= currentScrollPosition - scrollPositionOffset) {
                    activeSectionID = elementToIdMap[eleOffset];
                    return this.$emit('onArticleScroll', activeSectionID);
                }
            }
        },
        parseJsonStrings() {
            // Parse the JSON strings in the samp blocks
            let sampBlocks = Array.prototype.slice.call(document.getElementsByTagName('samp'));
            // Place each key/value pair on its own line
            sampBlocks.forEach((sampBlock) => {
                let content = sampBlock.innerText;
                // Remove any whitespace
                content = content.replace(/\s/g, '');
                // Add a newline after each comma, unless it's a comma in a string
                content = content.replace(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/g, ",\n");
                // Add a newline after the opening brace
                content = content.replace(/{/g, '{\n');
                // Add a newline before the closing brace
                content = content.replace(/}/g, '\n}');
                // Indent each line
                content = content.replace(/\n/g, '\n    ');
                // Add a space after the colon, unless it's a colon in a string
                content = content.replace(/:(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/g, ": ");
                // Add a newline after the opening bracket of the array
                content = content.replace(/\[/g, '[\n    ');
                // Add a newline before the closing bracket of the array
                content = content.replace(/\]/g, '\n]');
                sampBlock.innerText = content;
            })
        }
    },
    created() {
        document.addEventListener('scroll', this.onScroll)
    },
    updated() {
        this.mapArticlesToIDs();
    },
    unmounted() {
        document.removeEventListener('scroll', this.onScroll)
    },
    mounted() {
        this.mapArticlesToIDs();
        this.parseJsonStrings();
    },
    data() {
        return {elementToIdMap: null}
    },
}
</script>

<template>
    <div v-for="article in this.articles">
        <h3>{{ article.category }}</h3>
        <article-list-item v-for="item in article.items" v-bind="item" />
    </div>
</template>