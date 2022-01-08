<template>
  <VueMarkdown
    :toc="true"
    :source="source"
    :toc-anchor-link="false"
    toc-anchor-link-class="md-anchor"
    class="markdown-body"
  ></VueMarkdown>
</template>

<script>
import VueMarkdown from "./VueMarkdown";
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
