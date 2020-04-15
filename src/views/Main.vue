<template>
    <div class="wrapper-main-page">
        <CreatingButton @hideForm="showFormCreating($event)" title="Create a new board..." :style-btn="styleCreatingBtn" v-if="!showFormAddNewBoard" ></CreatingButton>
        <FormCreatingNewBoard @showForm="showFormCreating($event)" :style-box-form="styleCreatingBtn" v-if="showFormAddNewBoard"></FormCreatingNewBoard>
        <div class="board" v-for="item in GET_BOARDS" :key="item.id">
            <router-link :to="`/board/${item.id}`">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import CreatingButton from "../components/CreatingButton";
  import FormCreatingNewBoard from "../components/FormCreatingNewBoard";

  export default {
    name: "Main",
    data() {
      return {
        styleCreatingBtn: {
          width: 360 + 'px',
          ['min-height']: 100 + 'px',
          height: 100 + '%',
          ['background-color']: `#46de87`,
        },
        showFormAddNewBoard: false,
      }
    },
    methods: {
      showFormCreating(event){
        console.log(event)
        this.showFormAddNewBoard = event;
      },
    },
    computed: {
      ...mapGetters(['GET_BOARDS'])
    },
    components: {
      CreatingButton,
      FormCreatingNewBoard,
    },
  }
</script>

<style scoped>
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

    .board {
        background-color: #ffffff;
        width: 360px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        transition: all .5s;
    }

    .wrapper-main-page > *:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
    }

    .board a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: inherit;
        height: inherit;
        color: black;
        text-decoration: none;
    }
</style>