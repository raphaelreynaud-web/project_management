<template>
  <div class="flex bg-gray-800">
    <Header/>
    <Pages />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
    name: "IndexPage",
    components: { Header }
}
</script>
