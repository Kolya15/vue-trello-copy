import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boards: [],
    selectedBoard: null,
  },
  mutations: {
    SET_BOARDS: (state, payload) => state.boards = [...payload],
    SET_BOARD: (state, id) => state.selectedBoard = state.boards.find(item => item.id == id),
    ADD_BOARD: (state, payload) => {
      state.boards.push(payload);
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    SET_LIST: (state, {payload, indexBoard}) => {
      state.boards[indexBoard].data.push(payload)
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    SET_ITEM_LIST: (state, {payload, indexBoard, indexList}) => {
      state.boards[indexBoard].data[indexList].cards.push(payload)
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    SAVE_CARD_ARCHIVED: (state, {indexBoard, indexList, indexCard}) => {
      state.boards[indexBoard].data[indexList].cards[indexCard].isArchived = !state.boards[indexBoard].data[indexList].cards[indexCard].isArchived
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    SAVE_DRAG_AND_DROP: (state, {indexBoard, dragCard, dropCard}) => {
      const saveDragCard = state.boards[indexBoard].data[dragCard.indexList].cards[dragCard.indexCard]
      if (dragCard.indexList === dropCard.indexList){
        state.boards[indexBoard].data[dragCard.indexList].cards.splice(dragCard.indexCard, 1);
        state.boards[indexBoard].data[dropCard.indexList].cards.splice(dropCard.indexCard, 0, saveDragCard);
      }
      else{
        state.boards[indexBoard].data[dropCard.indexList].cards.splice(dropCard.indexCard, 0, saveDragCard);
        state.boards[indexBoard].data[dragCard.indexList].cards.splice(dragCard.indexCard, 1);
      }
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    DELETE_BOARD: (state, indexBoard) => {
      state.boards.splice(indexBoard, 1);
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    DELETE_LIST: (state, {indexBoard, indexList}) => {
      state.boards[indexBoard].data.splice(indexList, 1);
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
    DELETE_CARD: (state, {indexBoard, indexList, indexCard}) => {
      state.boards[indexBoard].data[indexList].cards.splice(indexCard, 1);
      localStorage.setItem("boardsCollection", JSON.stringify(state.boards));
    },
  },
  actions: {
    SET_BOARDS: ({commit}) => {
      if (localStorage.boardsCollection) {
        commit('SET_BOARDS', JSON.parse(localStorage.getItem("boardsCollection")));
      }
    },
    SET_BOARD: ({commit}, id) => commit('SET_BOARD', id),
    ADD_BOARD: ({commit}, payload) => commit('ADD_BOARD', payload),
    SAVE_LIST: ({commit}, {payload, indexBoard}) => {
      commit('SET_LIST', {payload: payload, indexBoard: indexBoard});
    },
    SAVE_ITEM_LIST: ({commit}, {payload, indexBoard, indexList}) => {
      commit('SET_ITEM_LIST', {payload: payload, indexBoard: indexBoard, indexList: indexList});
    },
    SAVE_CARD_ARCHIVED: ({commit}, {indexBoard, indexList, indexCard}) => commit('SAVE_CARD_ARCHIVED', {
      indexBoard: indexBoard,
      indexList: indexList,
      indexCard: indexCard
    }),
    SAVE_DRAG_AND_DROP: ({commit}, {indexBoard, dragCard, dropCard}) => commit('SAVE_DRAG_AND_DROP', {
      indexBoard: indexBoard,
      dragCard: dragCard,
      dropCard: dropCard
    }),
    DELETE_BOARD: ({commit}, indexBoard) => commit('DELETE_BOARD', indexBoard),
    DELETE_LIST: ({commit}, {indexBoard, indexList}) => commit('DELETE_LIST', {
      indexBoard: indexBoard,
      indexList: indexList,
    }),
    DELETE_CARD: ({commit}, {indexBoard, indexList, indexCard}) => commit('DELETE_CARD', {
      indexBoard: indexBoard,
      indexList: indexList,
      indexCard: indexCard
    }),
  },
  getters: {
    GET_BOARDS: state => state.boards,
    BOARD: state => state.selectedBoard,
  }
})
