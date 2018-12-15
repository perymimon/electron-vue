import Vue from 'vue'


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
    namespaced:true,
    state: {
        pagesMap: {},
        issuesMap: {},
        blocksMap: {},
        pagesList: []
    },
    mutations: {
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
            Vue.set(page.issues, page.issues.length, issue);
            return issue;
        },
        addNewBlock(state, {issue, type}) {
            var id = shortid.generate();
            var block = {
                id,
                type: type || 'text', /*text,image, video, quote*/
                comment: '',
            };
            Vue.set(state.blocksMap, id, block);
            Vue.set(issue.blocks, issue.blocks.length, id);
        },
    },
    getters: {
        pages({pagesMap, pagesList}) {
            return pagesList.map(id => pagesMap[id])
        },
        issues({issuesMap}) {
            return (page) => page.issues.map(id => issuesMap[id])
        },
        blocks({blocksMap}) {
            return (issue) => issue.blocks.map(id => blocksMap[id])
        }
    },
    actions: {
        setPages({state, commit}, pagesName = []) {
            pagesName.forEach(function (name) {
                commit('addNewPage',name);
            })
        }
    }
}
