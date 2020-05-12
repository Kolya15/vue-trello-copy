<template>
    <div class="wrapper-list">
        <div class="close-icon-card" @click="deleteList()"></div>
        <div class="list-title"><h3>{{list.name}}</h3></div>
        <input type="text" @keyup.enter="setItemList($event)">
        <ul class="wrapper-card">
            <li v-for="item in list.cards" :key="item.cardId" :id="item.cardId" class="card" v-bind:class="{archived: item.isArchived}">
                <div class="close-icon-card" @click="deleteCard(item)"></div>
                <h3>{{item.name}}</h3>
                <div class="checked" @click="archivedCard(item)">✓</div>
            </li>
        </ul>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "List",
    data() {
      return {
      }
    },
    props: {
      board: Number,
      list: Object,
      activeDragElement: Boolean,
    },
    methods: {
      setItemList(event) {
        if (!event.target.value){
          return
        }
        const cardList = {
          name: event.target.value,
          cardId: `card${Math.floor(Math.random() * 100 * 50)}`,
          listId: this.list.id,
          isArchived: false,
        }
        this.$store.dispatch('SAVE_ITEM_LIST', {
          payload: cardList,
          indexBoard: this.board,
          indexList: this.getIndexList
        });
        event.target.value = '';
      },
      getCardId (cardSelected){
        let indexCard = null;
        for (let i = 0; i <= this.BOARD.data.length; i++) {
          indexCard = this.BOARD.data[i].cards.findIndex(card => card.cardId == cardSelected.cardId);
          if (indexCard > -1) break
        }
        return indexCard
      },
      archivedCard(cardSelected) {
        this.$store.dispatch('SAVE_CARD_ARCHIVED', {
          indexBoard: this.board,
          indexList: this.getIndexList,
          indexCard: this.getCardId(cardSelected)
        })
      },
      deleteCard (cardSelected){
        this.$store.dispatch('DELETE_CARD', {
          indexBoard: this.board,
          indexList: this.getIndexList,
          indexCard: this.getCardId(cardSelected)
        })
      },
      deleteList (){
        this.$store.dispatch('DELETE_LIST', {
          indexBoard: this.board,
          indexList: this.getIndexList,
        })
      },
    },
    computed: {
      ...mapGetters(['GET_BOARDS', 'BOARD']),
      getIndexList() {
        const indexList = this.BOARD.data.findIndex(item => item.id == this.list.id);
        return indexList
      }
    },
    created() {
      this.$store.dispatch('SET_BOARD', this.$route.params.id);
    }
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
    .wrapper-list {
        padding: 5px;
        width: 270px;
        height: 100%;
        position: relative;
        background-color: #ffffff;
    }

    .list-title {
        border-bottom: 1px solid #7a7b7b;
        margin-bottom: 15px;
    }

    .list-title h3 {
        margin: 15px;
        font-size: 20px;
        word-wrap: break-word;
    }

    .wrapper-list input {
        width: 70%;
        height: 35px;
        padding-left: 10px;
        margin-bottom: 10px;
    }

    .wrapper-card {
        margin: 0;
        padding: 0 10px;
    }
    .card:nth-last-child(){
        margin-bottom: 10px;
    }
    .card {
        display: flex;
        justify-content: space-between;
        list-style: none;
        background-color: #0dacf6;
        color: #000000;
        width: 190px;
        padding: 15px 30px;
        margin: 5px 0;
        border-radius: 5px;
        cursor: grab;
        transition: margin-top .5s;
        position: relative;
    }
    .card h3{
        word-wrap: break-word;
    }

    .archived {
        background-color: #decaff;
        text-decoration: line-through;
        color: #a29d9d;
    }

    .archived .checked {
        color: #a29d9d;
    }

    .card * {
        margin: 0;
    }

    .checked {
        color: #08ff17;
        cursor: pointer;
    }
</style>