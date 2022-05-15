<template>
        <div class="flex">
            <div class="w-14 h-screen bg-gray-900">

            </div>
            <div class="rounded-l-xl p-3 text-white h-screen w-72 bg-gray-800 font-sans font-thin">
                <div class="flex items-center">
                    <img width="100px" height="100px" src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/sbf423pagwh6fhfujbbw" />
                    <h1>Gestion de projet</h1>
                </div>
                <hr class="mb-3 mt-3">
                <div class="flex flex-col">
                    <a class="inline-flex mb-3" href="#" v-on:click="createProject" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1 bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <p class="pl-3">Ajouter un projet</p>
                    </a>
                    <a class="inline-flex mb-3" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1 bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <p class="pl-3">Rechercher</p>
                    </a>
                </div>
                <hr class="mb-3">
                <p class="text-center">Projets</p>
                {{/* Projets */}}
                <div v-for="project in projectlist" :key="project.id">
                    <a class="mt-2 inline-flex bg-blue-900 w-full h-7 rounded-full" v-bind:href="'/'+project.id" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1.5 ml-2 bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <p class="pl-3 mt-0.5">{{project.name}}</p>
                    </a>
                </div>
            </div>
        </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            projectlist : [],
        }
    },
    mounted(){
        axios.get("/api/projectlist").then(res => {
            this.projectlist = res.data
        })
    },
    updated(){
        axios.get("/api/projectlist").then(res => {
            this.projectlist = res.data
        })
    },
    methods: {
        createProject: async function (event) {
            event.preventDefault();
            const req = await axios.post("api/createproject", {
                name : 'Default project name',
                description : 'Default description'
            })
        }
    }
}
</script>