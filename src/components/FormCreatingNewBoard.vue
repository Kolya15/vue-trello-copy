<template>
    <div class="wrapper-form-new-board">
        <div class="form-new-board">
            <div class="form-new-board__header">
                <h3>Creating a board</h3>
                <div>
                    <svg class="close-icon" @click="getStateShowForm()"></svg>
                </div>
            </div>
            <div class="form-new-board__body">
                <p class="title-board">What shall we call the board?</p>
                <input type="text" ref="input" @keyup.enter="createNewBoard()">
                <div class="wrapper-button">
                    <button class="btn-cancel" @click="getStateShowForm()">Canсel</button>
                    <button class="btn-create" @click="createNewBoard()">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "FormCreatingNewBoard",
    data() {
      return {}
    },
    props: {
      styleBoxForm: Object,
    },
    methods: {
      getStateShowForm() {
        this.$emit('showForm', false)
      },
      createNewBoard() {
        let board = {
          id: Math.floor(Math.random() * 100),
          title: String(this.$refs.input.value),
          data:[],
        }
        this.$store.dispatch('ADD_BOARD', board);
        this.getStateShowForm();
      }
    },
  }
</script>

<style scoped>
    .form-new-board {
        width: 360px;
        min-height: 100px;
        height: 100%;
        background-color: #46de87;
        color: #f5f2f2;
        cursor: pointer;
        transition: all .5s;
        border-radius: 5px;
    }

    .form-new-board h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }

    .form-new-board__header {
        display: flex;
        justify-content: space-around;
        padding: 20px 0;
        border-bottom: 1px solid #ffffff;
    }

    .form-new-board__header .title-board {
        margin: 0;
    }

    .title-board {
        font-size: 14px;
    }

    .close-icon {
        background-image: url('../assets/images/closeIcon.svg');
        width: 24px;
        height: 24px;
    }

    .form-new-board__body {
        padding: 20px 0;
    }

    .form-new-board__body input {
        width: 60%;
        height: 35px;
        padding: 5px;
        border: none;
        border-radius: 5px;
        font-size: 18px;
    }

    .wrapper-button {
        margin-top: 15px;
    }

    .btn-cancel {
        background-color: transparent;
        border: none;
        color: #ffffff;
        transition: all 0.5s;
    }

    .btn-create {
        width: 40%;
        height: 35px;
        border-radius: 5px;
        border: none;
        background-color: #02f6e9;
        transition: all 0.5s;
    }

    .btn-cancel,
    .btn-create {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        outline: none;
        cursor: pointer;
    }

    .btn-cancel:hover {
        color: #00ffc5;
    }

    .btn-create:hover {
        background-color: #0AB8F6;
        color: #05ff74;
    }
    @media (max-width: 1240px){
        .wrapper-form-new-board{
            width: 25% !important;
        }
        .form-new-board{
            width: 100%;
        }
    }
    @media (max-width: 850px) {
        .wrapper-form-new-board{
            display: flex;
            justify-content: center;
            width: 75% !important;
            margin-left: auto !important;
            margin-right: auto !important;
         }
        .form-new-board{
            width: 100%;
        }
    }
    @media (max-width: 450px) {
        .wrapper-form-new-board {
            width: 90%;
        }
        .btn-create {
            width: 40%;
        }
    }
</style>