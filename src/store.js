import Vue from 'vue'
import Vuex from 'vuex'
import pageModuleStore from './stors/page-store'

const {remote} = require('electron');
const {dialog} = remote;
const fg = require('fast-glob');
const {promises: fsp} = require("fs");
const path = require('path');

Vue.use(Vuex);
const level = require('level');
const db = level('./quotes', {valueEncoding: 'json'});


export default new Vuex.Store({
    state: {
        rootPath: '',
        // sectionList: [],
        section: '',
        quotesList: [],
    },
    modules: {
        pages: pageModuleStore
    },
    mutations: {
        setQuotesList(state, newList) {
            state.quotesList = newList;
        },
        changeSection(state, newSection) {
            state.section = newSection;
        },
        setSectionsList(state, sections) {
            state.sectionList = sections;
        },
        setRootPath(state, cwd) {
            state.rootPath = cwd;
        },

    },
    getters: {
        activePath(state) {
            return path.join(state.rootPath, state.section)
        },
        projectName(state) {
            return path.basename(state.rootPath)
        },
        async sectionList(state) {
            const directoriesPaths = await fg.async([path.join(state.rootPath, '*')], {onlyDirectories: true});
            return directoriesPaths.map(dp => path.basename(dp));
        }
    },
    actions: {
        async addNewQuotes({commit, state}, quote) {
            const quotesList = [...state.quotesList, quote];
            commit('setQuotesList', quotesList);
            await db.put(state.section, quotesList);
        },
        async editQuotes({commit, state}, {index, quote}) {
            state.quotesList.splice(index, 1, quote);
            const quotesList = [...state.quotesList];
            commit('setQuotesList', quotesList);
            await db.put(state.section, quotesList);
        },
        async changeRootPath({commit, state, getters, dispatch}, cwd){
            commit('setRootPath', cwd);
            const sections = await getters.sectionList;
            dispatch('pages/setPages', sections);
        },
        async changeRootPathByDialog({commit, state, getters, dispatch}) {
            let [cwd] = dialog.showOpenDialog(remote.getCurrentWindow(), {
                properties: ['openDirectory']
            });
            return dispatch('changeRootPath',cwd)
        },
        async selectSection({commit}, section) {
            commit('changeSection', section);
            try {
                var quoteList = await db.get(section);
            } catch (e) {
                if (!e.notFound) {
                    console.error(e);
                }
                quoteList = [];
            }

            commit('setQuotesList', quoteList);

        },
    }
})
