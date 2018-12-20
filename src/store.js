import Vue from 'vue'
import Vuex from 'vuex'
import pageModuleStore from './stors/page-store'

const {remote} = require('electron');
const {dialog} = remote;
const fg = require('fast-glob');
const {promises: fsp} = require("fs");
const path = require('path');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rootPath: '',
        section: '',
    },
    getters: {
        projectName(state) {
            return path.basename(state.rootPath)
        },

        async sections(state) {
            const directoriesPaths = await fg.async([path.join(state.rootPath, '*')], {onlyDirectories: true});
            return directoriesPaths.map(dp => path.basename(dp));
        },

        sectionPath(state) {
            return path.join(state.rootPath, state.section)
        },
    },

    actions: {
        async changeRootPath({commit, state, getters, dispatch}, cwd){
            commit('setRootPath', cwd);
            const sections = await getters.sections;
            dispatch('setPages', sections);
        },

        async changeRootPathByDialog({commit, state, getters, dispatch}) {
            let [cwd] = dialog.showOpenDialog(remote.getCurrentWindow(), {
                properties: ['openDirectory']
            });
            return dispatch('changeRootPath',cwd)
        },

        async selectSection({commit,dispatch}, section) {
             commit('setSection', section);
        },
    },
    mutations: {
        setRootPath(state, cwd) {
            state.rootPath = cwd;
        },
        setSection(state, newSection) {
            state.section = newSection;
        },
    },
    modules: {
        pages: pageModuleStore,
    },
})
