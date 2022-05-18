<template>
  <div class="flex bg-gray-800">
    <Header/>
    <div class="text-white p-3 w-5/6 bg-gray-900 rounded-l-xl">
      <p class="text-center">Gestion de projet</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
    name: "IndexPage",
    components: { Header }
}
</script>
