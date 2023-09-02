<template>
    <div class="text-white p-3 w-5/6 bg-gray-900 rounded-l-xl">
        <form @submit.prevent="updateProjectName()">
            <input v-model="name"  class="text-2xl bg-transparent"/> <br />
        </form>
        <form @submit.prevent="updateProjectDescription()">
            <input v-model="description" class="w-3/12 text-sm bg-transparent"/>
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
                        <div class="mt-1" @click="deleteGroupe(groupe.id)">X</div>
                    </div>
                </th>
                <th class="text-gray-400 pt-4">Statut</th>
                <th class="text-gray-400 pt-4">Période</th>
                </thead>
                <tbody>
                <tr v-if="groupe.todos !== null" v-for="todo in groupe.todos" :key="todo.id" class="border text-white bg-gray-800 hover:bg-gray-600 ">
                    <td class="p-2 w-full h-11 text-xs flex items-center">
                      <form class="w-full" @submit.prevent="updateTodoName(todo.id)">
                            <input v-bind:id="'todo-'+todo.id" class="bg-transparent w-1/2" type="text" v-bind:value="todo.name" />
                      </form>
                      <div @click="deleteTodo(todo.id, groupe.id)">X</div>
                    </td>
                    <td class="w-1/6  text-xs text-center">
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
                    <td class="p-2 w-1/6 text-xs text-center">
                        <div class="bg-blue-400 rounded-full p-1 text-black"><input type="date" v-bind:value="todo.start_date" @change="updateStart($event, todo.id)"> - <input type="date" v-bind:value="todo.end_date" @change="updateEnd($event, todo.id)"></div>    
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="p-2 w-full bg-transparent">
                <input v-model="todoname" v-on:keyup.enter="createTodo(groupe.id, todoname)" class="bg-transparent text-sm w-1/2" type="text" placeholder="+ ajouter une tâche">
            </div>
        </div>
      </div>
      <button class="mt-8 w-52 text-sm p-2 button border" v-on:click="createGroupe">+ Ajouter un nouveau groupe</button>
    </div>
</template>

<script>
import axios from "axios"
import moment from "moment"
import {mapState, mapMutations} from "vuex"

export default {
    props : {
        id : String
    },
    data(){
        return {
            project_id : this.id,
            todoname : "",
        }
    },
    computed: {
        ...mapState({
            actualProject: state => state.actualProject
        }),
        name: {
            get() {
                return this.actualProject.name
            },
            set(value) {
                const updatedProject = { ...this.actualProject, name: value }
                this.$store.commit('setActualProject', updatedProject)
            }
        },
        description: {
            get() {
            return this.actualProject.description
            },
            set(value) {
            const updatedProject = { ...this.actualProject, description: value }
            this.$store.commit('setActualProject', updatedProject)
            }
        },
        groupes: {
            get() {
                return this.actualProject.groupes
            },
            set(value) {
                const updatedProject = { ...this.actualProject, groupes: value }
                this.$store.commit('setActualProject', updatedProject)
            }
        },
    },
    mounted(){
        axios.get("/api/project/"+this.project_id).then(res => {
            var actualProject = res.data[0]
            actualProject.groupes.map(groupe => {
                groupe.todos.map(todo => {
                    todo.start_date = moment(todo.start_date, "YYYY-MM-DD").format("YYYY-MM-DD")
                    todo.end_date = moment(todo.end_date, "YYYY-MM-DD").format("YYYY-MM-DD")
                })
            })
            this.setActualProject(res.data[0])
        })
    },
    filters : {
        moment : function(date){
            return moment(date, "DD-MM-YYYY")
        }
    },
    methods : {
        ...mapMutations(['setActualProject', 'updateProjectName', 'deleteTodoFromProject', 'setProjectList']),
        createGroupe : function () {
            axios.post("/api/creategroupe", {
                name : "Nouveau Groupe",
                project_id : this.project_id
            }).then(res => {
                axios.get("/api/project/"+this.project_id).then(res => {
                    this.setActualProject(res.data[0])
                    this.todoname = ""
                })
            })
        },
        createTodo : function (gid, name) {
            axios.post("/api/createtodo", {
                name : name,
                groupe_id : gid,
                statut : "bloqué",
                start_date : moment().format("DD-MM-YYYY"),
                end_date : moment().format("DD-MM-YYYY")
            }) .then(res => {
                axios.get("/api/project/"+this.project_id).then(res => {
                    this.setActualProject(res.data[0])
                    this.todoname = ""
                })
            })
        },
        updateProjectName : function(){
            axios.post("/api/updateprojectname", {
                id : this.project_id,
                name : this.name
            }).then(res => {
                axios.get("/api/projectlist").then(res => {
                    this.setProjectList(res.data)
                })
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
        },
        updateStart : function (e, tid){
            axios.post("/api/updatestart", {
                id : tid,
                start_date : e.target.value
            })
        },
        updateEnd : function (e,tid){
            axios.post("/api/updateend", {
                id : tid,
                end_date : e.target.value
            })
        },
        deleteTodo : function (tid, gid){
            axios.post("/api/deletetodo", {
                id : tid
            }).then(res => {
                axios.get("/api/project/"+this.project_id).then(res => {
                    this.setActualProject(res.data[0])
                    this.todoname = ""
                })
            })
        },
        deleteGroupe : function (gid){
            axios.post("/api/deletegroupe", {
                id : gid
            }).then(res => {
                axios.get("/api/project/"+this.project_id).then(res => {
                    this.setActualProject(res.data[0])
                    this.todoname = ""
                })
            })
        }
    }
}
</script>