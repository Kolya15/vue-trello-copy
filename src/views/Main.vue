<template>
    <div class="wrapper-main-page">
        <div class="creating-board-btn" @click="showFormCreating(true)" v-if="!showFormAddNewBoard">
            <h3>Create a new board...</h3>
        </div>
        <FormCreatingNewBoard @showForm="showFormCreating($event)" v-if="showFormAddNewBoard"></FormCreatingNewBoard>
        <div class="board" v-for="(item, index) in GET_BOARDS" :key="item.id">
            <div class="close-icon-card" @click="deleteBoard(index)"></div>
            <router-link :to="`/board/${item.id}`" class="title-board">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import FormCreatingNewBoard from "../components/FormCreatingNewBoard";

  export default {
    name: "Main",
    data() {
      return {
        showFormAddNewBoard: false,
      }
    },
    methods: {
      showFormCreating(event){
        this.showFormAddNewBoard = event;
      },
      deleteBoard (index){
        this.$store.dispatch('DELETE_BOARD', index)
      },
    },
    computed: {
      ...mapGetters(['GET_BOARDS'])
    },
    components: {
      FormCreatingNewBoard,
    },
  }
</script>

<style scoped>
    .close-icon-card {
        position: absolute;
        top: -9px;
        right: -9px;
        background-image: url('../assets/images/closeIcon.svg');
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .wrapper-main-page {
        display: flex;
        flex-wrap: wrap;
    }

    .wrapper-main-page > * {
        margin: 0 20px 20px 20px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        transition: all .5s;
    }
    .creating-board-btn{
        width: 360px;
        min-height: 100px;
        height: 100%;
        background-color: #46de87;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f5f2f2;
        cursor: pointer;
        transition: all .5s;
        border-radius: 5px;
    }
    .btn-creating h3{
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }

    .board {
        background-color: #ffffff;
        width: 360px;
        min-width: 170px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        transition: all .5s;
        position: relative;
    }

    .wrapper-main-page > *:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
    }

    .board a {
        line-height: 100px;
        width: 85%;
        height: inherit;
        color: black;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    @media (max-width: 1240px){
        .creating-board-btn,
        .board{
            width: 25%;
        }
    }
    @media (max-width: 850px){
        .wrapper-main-page{
            justify-content: center;
        }
        .creating-board-btn{
            width: 75%;
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }
    @media (max-width: 660px){
        .board{
            width: 40%;
        }
    }
    @media (max-width: 450px){
        .creating-board-btn{
            width: 90%;
            margin-left: auto !important;
            margin-right: auto !important;
        }
        .board{
            width: 90%;
        }
    }
</style>