<template>
  <VueMarkdown
    :toc="true"
    :source="source"
    toc-anchor-link-class="md-anchor"
    class="markdown-body"
    @toc-rendered="$emit('toc-rendered', $event)"
    @rendered="$emit('rendered', $event)"
  ></VueMarkdown>
</template>

<script>
import VueMarkdown from "vue-markdown-v2";

export default {
  name: "Markdown",
  components: {
    VueMarkdown
  },
  props: {
    source: {
      type: String,
      default: ""
    }
  },
  methods: {
    doEnvent1(html) {
      html;
      debugger;
    },
    doEnvent2(html) {
      html;
      debugger;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/markdown.scss";
</style>
