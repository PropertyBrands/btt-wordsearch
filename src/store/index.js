import Vue from 'vue';
import Vuex from 'vuex';
import { queryForResults } from '@/api';

Vue.use(Vuex);

// root state object
const state = {
  solrParameters: {
    q: '',
    fq: {},
  },
  results: [],
};

// mutations
const mutations = {
  updateQuery(state, { query }) {
    state.solrParameters.q = query;
  },
  updateFilterQuery(state, { key, properties }) {
    state.solrParameters.fq[key] = properties;
  },
  removeFilterQuery(state, { key }) {
    delete state.solrParameters.fq[key];
  },
  updateResults(state, { results }) {
    state.results = results;
  },
};

const actions = {
  updateQuery({ commit }, query) {
    commit('updateQuery', { query });
  },
  updateFilterQuery({ commit }, filterQuery) {
    commit('updateFilterQuery', filterQuery);
  },
  removeFilterQuery({ commit }, filterQuery) {
    commit('removeFilterQuery', filterQuery);
  },
  updateResults({ commit }) {
    queryForResults(state.solrParameters).then(results => {
      commit('updateResults', { results });
    });
  },
};

const getters = {
  currentQuery: state => state.solrParameters.q,
  currentSolrParameters: state => state.solrParameters,
  getResults: state => state.results,
};

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: debug,
});
