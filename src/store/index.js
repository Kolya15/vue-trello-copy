import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        boards: []
    },
    mutations: {
        SET_BOARDS: (state, payload) => state.boards = [...payload],
        ADD_BOARD: (state, payload) => {
            state.boards.push(payload);
            localStorage.setItem ("boardsCollection", JSON.stringify(state.boards));
        },
    },
    actions: {
        SET_BOARDS: (context) =>{
          if (localStorage.boardsCollection) {
              console.log(localStorage.boardsCollection)
              context.commit('SET_BOARDS',JSON.parse(localStorage.getItem("boardsCollection")));
          }
    },
        ADD_BOARD: (context, payload) => context.commit('ADD_BOARD', payload),
},
    getters: {
        GET_BOARDS: state => state.boards,
    }
})
