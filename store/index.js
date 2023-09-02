export const state = () => ({
    counter: 0,
    projectlist : [],
    actualProject : {},
})

export const mutations = {
    setProjectList(state, list) {
        state.projectlist = list
    },
    setActualProject(state, project) {
        state.actualProject = project
    },
    updateProjectName(state, name) {
        state.actualProject = {...state.actualProject, name : name}
    },
}