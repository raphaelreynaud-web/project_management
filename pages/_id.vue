<template>
    <div class="flex bg-gray-800">
        <Header />
        <Pages v-bind:id="this.$route.params.id" />
    </div>
</template>

<script>

</script>