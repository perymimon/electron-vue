import Vue from 'vue'
import Vuex from 'vuex'

const {remote} = require('electron');
const {dialog} = remote;
const fg = require('fast-glob');
const {promises: fsp} = require("fs");
const path = require('path');

Vue.use(Vuex);
var level = require('level');
var db = level('./quotes');

export default new Vuex.Store({
    state: {
        rootPath: 'C:\\Users\\perym\\OneDrive\\Documents\\תן אמון במימון',
        sectionList: [],
        section: '',
        quotesList: [],
        pages:{
            section:[]
        }
    },
    getters:{
        activePath(state){
            return path.join(state.rootPath, state.section)
        }
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
        setRootPath(state,rootPath){
            state.rootPath = rootPath;
        },

    },
    actions: {
        async addNewQuotes({commit, state}, quote) {
            const quotesList = [...state.quotesList,quote];
            commit('setQuotesList',quotesList);
            await db.set(state.section, quotesList );
        },
        async changeRootPathByDialog({ commit, state }) {
            let folderPath = dialog.showOpenDialog(remote.getCurrentWindow(), {
                properties: ['openDirectory']
            });
            commit('setRootPath',folderPath[0]);

            const directoryPaths = await fg.async([path.join(state.rootPath, '*')], {onlyDirectories: true});
            const directories = directoryPaths.map(directoryPath => path.basename(directoryPath));
            commit('setSectionsList',directories);
        },
        async selectSection({ commit }, section) {
            commit('changeSection',section);
            try{
                var quoteList  = await db.get(section);
            }catch (e) {
                if(e.notFound){
                    quoteList = [];
                }
            }

            commit('setQuotesList',quoteList);

        },
    }
})
