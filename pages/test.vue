<template>
    <h1 class="text-center">Salut {{prenom}}</h1>
</template>

<script>
export default {
    data(){
        return {
            prenom : ""
        }
    },
    mounted(){
        this.prenom = "Raphael"
    }
}
</script>