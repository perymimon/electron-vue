import Vue from 'vue'
import blockFactory from "../factories/block";


const shortid = require('shortid');
/*
Entity Page
   page: {
    issues:[issue]
   }

Entity ISSUES
   issue:{
    blocks:[block]
   }

Entity BLOCK
   block:{
       type: text|image|video|quote
       comment: string
   }

*/

const IssuePartModel = {
    type: 'text', /*text,image, video, quote*/
    comment: '',
};


/* PAGES */
export default {
    namespaced:false,
    state: {
        pagesMap: {},
        issuesMap: {},
        blocksMap:{},
        pagesList: [],
    },
    getters: {
        //args: state, getters, rootState, rootGetters
        pages/*Set*/({pagesMap, pagesList}) {
            return pagesList.map(id => pagesMap[id])
        },
        issues({issuesMap}) {
            return (page) =>{
                return page.issues.map(id => issuesMap[id])
            }
        },
        blocks({}, getters, {blocksMap}, rootGetters) {
            return (issue) => issue.blocks.map(id => blocksMap[id])
        }
    },
    actions: {
        setPages({state, commit}, pagesName = []) {
            commit('clearPages');
            pagesName.forEach(function (name) {
                commit('addNewPage',name);
            })
        }
    },
    mutations: {
        clearPages(state){
            state.pagesMap = {};
            state.pagesList = [];
        },
        addNewPage(state, pageName) {
            var page = {
                section: pageName,
                preword: '',
                issues: []
            };
            Vue.set(state.pagesMap, pageName, page);
            Vue.set(state.pagesList, state.pagesList.length, pageName);
            return page;
        },
        addNewIssue(state, page) {
            var id = shortid.generate();
            var issue = {
                id,
                blocks: []
            };

            Vue.set(state.issuesMap, id, issue);
            Vue.set(page.issues, page.issues.length, id);
            Vue.set(page.issues, 'blocks', []);
            return issue;
        },
        addNewBlock(state, payload) {
            var block  = blockFactory(payload);
            Vue.set(state.blocksMap, block.id, block);
            Vue.set(issue.blocks, issue.blocks.length, id);
            return block;
        },
    },
}
