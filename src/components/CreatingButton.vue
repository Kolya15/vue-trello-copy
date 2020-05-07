<template>
    <div class="btn-creating" :style="styleBtn" @click="getStateShowForm()">
        <h3>{{title}}</h3>
    </div>
</template>

<script>
  export default {
    name: "CreatingButton",
    data (){
      return{
      }
    },
    props:{
      title: String,
      styleBtn: Object,
    },
    methods: {
      getStateShowForm (){
        this.$emit('hideForm', true)
      }
    },
  }
</script>

<style scoped>
    .btn-creating {
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
    .btn-creating:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
    }
</style>