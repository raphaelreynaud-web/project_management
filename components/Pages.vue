<template>
    <div class="text-white p-3 w-5/6 bg-gray-900 rounded-l-xl">
        <form @submit.prevent="updateProjectName()">
            <input v-model="name"  class="text-2xl bg-transparent"/> <br />
        </form>
        <form @submit.prevent="updateProjectDescription()">
            <input v-model="description" class="text-sm bg-transparent"/>
        </form>
      <hr class="mt-3">
      <div v-if="groupes">
        <div v-for="groupe in groupes" :key="groupe.id">
            <table class="table-auto w-full">
                <thead>
                <th>
                    <div class="text-green-400 flex mt-6 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1.5 bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                    </svg>
                        <form @submit.prevent="updateGroupeName(groupe.id)">
                            <input v-bind:id="'groupe-'+groupe.id" class="ml-2 text-xl bg-transparent" type="text" v-bind:value="groupe.name" />
                        </form>
                    </div>
                </th>
                <th class="text-gray-400 pt-4">Statut</th>
                <th class="text-gray-400 pt-4">Période</th>
                </thead>
                <tbody>
                <tr v-if="groupe.todos !== null" v-for="todo in groupe.todos" :key="todo.id" class="text-white bg-gray-800 hover:bg-gray-600 ">
                    <td class="p-2 w-4/6 border text-xs">
                      <form @submit.prevent="updateTodoName(todo.id)">
                            <input v-bind:id="'todo-'+todo.id" class="bg-transparent w-1/2" type="text" v-bind:value="todo.name" />
                      </form>
                    </td>
                    <td class="w-1/6 border text-xs text-center">
                        <select v-if="todo.statut === 'en_cours'" v-bind:id="'statut-'+todo.id" class="text-center bg-yellow-500 w-full h-10" @change="updateStatut(todo.id)">
                            <option selected value="en_cours" class="checked:bg-yellow-500 w-full h-18 bg-yellow-500">En cours</option>
                            <option value="bloqué" class="w-full h-10 bg-red-500">Bloqué</option>
                            <option value="fini" class="w-full h-10 bg-green-500">Fini</option>
                        </select>
                        <select v-else-if="todo.statut === 'bloqué'" v-bind:id="'statut-'+todo.id" class="text-center bg-red-500 w-full h-10" @change="updateStatut(todo.id)">
                            <option value="en_cours" class="checked:bg-yellow-500 w-full h-18 bg-yellow-500">En cours</option>
                            <option selected value="bloqué" class="w-full h-10 bg-red-500">Bloqué</option>
                            <option value="fini" class="w-full h-10 bg-green-500">Fini</option>
                        </select>
                        <select v-else v-bind:id="'statut-'+todo.id" class="text-center bg-green-500 w-full h-10" @change="updateStatut(todo.id)">
                            <option value="en_cours" class="checked:bg-yellow-500 w-full h-18 bg-yellow-500">En cours</option>
                            <option value="bloqué" class="w-full h-10 bg-red-500">Bloqué</option>
                            <option selected value="fini" class="w-full h-10 bg-green-500">Fini</option>
                        </select>
                    </td>
                    <td class="p-2 w-1/6 border text-xs text-center">
                    <p class="bg-blue-400 rounded-full p-1">Période</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="p-2 border w-full bg-transparent">
                <input v-model="todoname" v-on:keyup.enter="createTodo(groupe.id)" class="bg-transparent text-sm w-1/2" type="text" placeholder="+ ajouter une tâche">
            </div>
        </div>
      </div>
      <button class="mt-8 w-52 text-sm p-2 button border" v-on:click="createGroupe">+ Ajouter un nouveau groupe</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props : {
        id : String
    },
    data(){
        return {
            name : "",
            description : "",
            groupes : [],
            project_id : this.id,
            todoname : "",
        }
    },
    mounted(){
        axios.get("/api/project/"+this.project_id).then(res => {
            console.log(res.data)
            this.name = res.data[0].name;
            this.description = res.data[0].description;
            if (res.data[0].groupes === null) {
                this.groupes = false
            }
            else {
                this.groupes = res.data[0].groupes
                console.log(this.groupes)
            }
        })
    },
    methods : {
        createGroupe : function () {
            axios.post("/api/creategroupe", {
                name : "Nouveau Groupe",
                project_id : this.project_id
            })
        },
        createTodo : function (gid) {
            axios.post("/api/createtodo", {
                name : this.todoname,
                groupe_id : gid,
                statut : "bloqué"
            })
        },
        updateProjectName : function(){
            axios.post("/api/updateprojectname", {
                id : this.project_id,
                name : this.name
            })
        },
        updateProjectDescription : function(){
            axios.post("/api/updatedescription", {
                id : this.project_id,
                description : this.description
            })
        },
        updateGroupeName : function(gid){
            var groupeName = document.getElementById("groupe-"+gid)
            axios.post("/api/updategroupename", {
                id : gid,
                name : groupeName.value
            })
        },
        updateTodoName : function(tid){
            var todoName = document.getElementById("todo-"+tid)
            axios.post("/api/updatetodoname", {
                id : tid,
                name : todoName.value
            })
        },
        updateStatut : function (tid){
            var statut = document.getElementById("statut-"+tid)
            axios.post("/api/updatestatut", {
                id : tid,
                statut : statut.value
            })
            if (statut.value === "en_cours") {
                statut.classList.remove("bg-red-500")
                statut.classList.remove("bg-green-500")
                statut.classList.add("bg-yellow-500")
            }
            else if (statut.value === "bloqué") {
                statut.classList.remove("bg-green-500")
                statut.classList.remove("bg-yellow-500")
                statut.classList.add("bg-red-500")
            }
            else {
                // fini
                statut.classList.remove("bg-red-500")
                statut.classList.remove("bg-yellow-500")
                statut.classList.add("bg-green-500")
            }
        }
    }
}
</script>