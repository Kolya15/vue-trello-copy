<template>
    <div class="wrapper-boards-page">
        <div class="title-board">
            <h3>{{board.title}}</h3>
        </div>
        <CreatingButton title="Add a list.." :style-btn="styleCreatingBtn"></CreatingButton>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CreatingButton from "../components/CreatingButton";

  export default {
    name: "Boards",
    data() {
      return {
        board: null,
        styleCreatingBtn: {
          width: 200 + 'px',
          height: 100 + 'px',
          ['background-color']: `#0a2c74`,
        }
      }
    },
    computed: {
      ...mapGetters(['GET_BOARDS']),
      GetBoard() {
        return this.GET_BOARDS.find(item => item.id == this.$route.params.id);
      },
    },
    components: {
      CreatingButton,
    },
    created() {
      this.board = this.GetBoard;
    }
  }
</script>

<style scoped>
    .title-board {
        width: 200px;
        min-height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #46de87;
        color: #f5f2f2;
        transition: all .5s;
        border-radius: 5px;
        margin-bottom: 50px;
    }

    .wrapper-boards-page > * {
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }

    .title-board h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }
</style>