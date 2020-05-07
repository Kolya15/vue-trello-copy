<template>
    <div class="wrapper-new-list">
        <input type="text" placeholder="add a list" @keyup.enter="setList($event)">
        <div class="close-icon" @click="closeForm()"></div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "FormCreatingNewList",
    data (){
      return{
      }
    },
    methods:{
      closeForm(){
        this.$emit('showForm', false);
      },
      setList(event){
        if(!event.target.value){
          return
        }
        const list = {
          name: event.target.value,
          id: `list${Math.floor(Math.random() * 100)}`,
          cards: [],
        }
        event.target.value = '';
        let indexBoard = this.GET_BOARDS.findIndex(item => item.id == this.$route.params.id );
        this.$store.dispatch('SAVE_LIST', {payload: list, indexBoard: indexBoard});
          },
      },
    computed: {
      ...mapGetters (['GET_BOARDS']),
    }
  }
</script>

<style scoped>
    .wrapper-new-list{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        width: 270px;
        height: 70px;
        position: relative;
        background-color: #ffffff;
    }
    .close-icon {
        position: absolute;
        top: -9px;
        right: -9px;
        background-image: url('../assets/images/closeIcon.svg');
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .wrapper-new-list input{
        padding-left: 10px;
        width: 70%;
        height: 50%;
    }
</style>