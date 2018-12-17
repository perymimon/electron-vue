const shortid = require('shortid');

const level = require('level');
const db = level('./quotes', {valueEncoding: 'json'});

export default {
    namespaced: true,
    state: {
        blocksList: []
    },
    getters: {},
    actions: {
        async loadSectionQuoteDB(context, section) {
            try {
                var quoteList = await db.get(section);
            } catch (e) {
                if (!e.notFound) {
                    console.error(e);
                }
                quoteList = [];
            }
            context.commit('setQuotesList',quoteList)
        }
        // async addNewQuotes({commit, state}, quote) {
        //     const quotesList = [...state.quotesList, quote];
        //     commit('setQuotesList', quotesList);
        //     await db.put(state.section, quotesList);
        // },
        // async editQuotes({commit, state}, {index, quote}) {
        //     state.quotesList.splice(index, 1, quote);
        //     const quotesList = [...state.quotesList];
        //     commit('setQuotesList', quotesList);
        //     await db.put(state.section, quotesList);
        // },
    },
    mutations: {
        setQuotesList(state, payload) {

        },
    },
}
