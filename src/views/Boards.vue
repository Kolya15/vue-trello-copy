<template>
    <div class="wrapper-boards-page" @touchstart="createDrag($event)" @touchmove="goDrag($event)" @mousedown="createDrag($event)" @mousemove="goDrag($event)" @mouseup="finishDrag()" @touchend="finishDrag()">
        <div class="title-board">
            <h3>{{BOARD.title}}</h3>
        </div>
        <div class="creating-list-btn" @click="showFormCreating(true)" v-if="!showFormAddNewList">
            <h3>Add a list...</h3>
        </div>
        <FormCreatingNewList @showForm="showFormCreating($event)" v-if="showFormAddNewList"
                             class="form-creating-new-list"></FormCreatingNewList>
        <div class="box-list">
            <List v-for="item in BOARD.data" :id="item.id" :key="item.id" :list="item" :board="getIndexBoard" @mouseup="finishDrag()"></List>
        </div>
        <div ref="avatar" @mouseup="finishDrag()" @touchend="finishDrag()"></div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FormCreatingNewList from "../components/FormCreatingNewList";
  import List from "../components/List"

  export default {
    name: "Boards",
    data() {
      return {
        showFormAddNewList: false,
        avatar: null,
        dragObject: {},
        dragCard: null,
        dropOnCard: null,
        dropCardAnimation: null,
      }
    },
    methods: {
      setDragObject (selectedElement){
          let elem = selectedElement.target;
          if (!elem.className.includes('card')) {
            return
          }
          this.dragObject.elemReal = elem;
          this.dragObject.elem = elem.cloneNode(true);
          this.dragObject.downX = selectedElement.pageX;
          this.dragObject.downY = selectedElement.pageY;
          this.dragObject.coordEvent = elem.getBoundingClientRect();
          let cardSettings = {
            cardId: elem.id,
            listId: elem.closest('.wrapper-list').id,
          }
          this.dragCard = this.getCardId(cardSettings)
      },
      movementDrag(selectedElement){
        if (!this.dragObject.avatar) {
          this.dragObject.elemReal.classList.add('dragCard');
          this.clearSelection();
          // если перенос не начат посчитать дистанцию, на которую переместился курсор мыши
          let moveX = selectedElement.pageX - this.dragObject.downX;
          let moveY = selectedElement.pageY - this.dragObject.downY;
          if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return; // ничего не делать, мышь не передвинулась достаточно далеко
          }
          this.dragObject.avatar = this.dragObject.elem; // захватить элемент
          if (!this.dragObject.avatar) {
            this.dragObject = {}; // аватар создать не удалось, отмена переноса
            return; // возможно, нельзя захватить за эту часть элемента
          }

          // аватар создан успешно
          // создать вспомогательные свойства shiftX/shiftY
          let coords = this.getCoords(this.dragObject.coordEvent);
          this.dragObject.shiftX = this.dragObject.downX - coords.left;
          this.dragObject.shiftY = this.dragObject.downY - coords.top;

          this.startDrag(); // отобразить начало переноса
        }
        event.preventDefault()
        // отобразить перенос объекта при каждом движении мыши
        this.dragObject.avatar.style.left = selectedElement.pageX - this.dragObject.shiftX + 'px';
        this.dragObject.avatar.style.top = selectedElement.pageY - this.dragObject.shiftY + 'px';
        this.findDroppable(event)
        return false;
      },
      createDrag(event) {
        // Если событие Touch (сенсор)
        if (event.changedTouches){
          this.setDragObject(event.changedTouches[0]);
        }
        else{
          if (event.which != 1) return
          this.setDragObject(event);
        }
      },
      startDrag() {
        let avatar = this.dragObject.elem;
        avatar.setAttribute('id', 'avatar');
        this.$refs.avatar.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
        avatar.style.opacity = '0.8'
      },
      goDrag(event) {
        if (!this.dragObject.elem) return

        // Если событие Touch (сенсор)
        if (event.changedTouches){
          this.movementDrag(event.changedTouches[0])
        }
        else{
          this.movementDrag(event)
        }
      },

      getCoords(avatar) {
        let box = avatar;
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset,
        };
      },

      findDroppable(event) {
        let cardSettings = {}
        // спрячем переносимый элемент
        this.dragObject.avatar.style.visibility= 'hidden';
        let elem = null;
        // получить самый вложенный элемент под курсором мыши
        // Если событие Touch (сенсор)
        if (event.changedTouches){
           elem = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
        else {
           elem = document.elementFromPoint(event.clientX, event.clientY);
        }
        // показать переносимый элемент обратно
        this.dragObject.avatar.style.visibility= 'visible';
        if (elem === null) {
          return null;
        }
        else if (elem.className !== 'card'){
          if (elem.closest('.wrapper-list')){
            if (this.dropCardAnimation != null){
              this.dropCardAnimation.style.marginTop = 0 + 'px'
            }
            cardSettings.cardId = false;
            cardSettings.listId = elem.closest('.wrapper-list').id;
          }
        }
        else{
          if (this.dropCardAnimation != elem && this.dropCardAnimation != null){
            this.dropCardAnimation.style.marginTop = 0 + 'px'
          }
          this.dropCardAnimation = elem;
          this.dropCardAnimation.style.marginTop = 20 + 'px'
          cardSettings.cardId = elem.id;
          cardSettings.listId = elem.closest('.wrapper-list').id;
        }
        return cardSettings
      },
      finishDrag() {
        if (Object.prototype.hasOwnProperty.call(this.dragObject, "avatar")) {
          this.dropOnCard = this.getCardId(this.findDroppable(event));
          this.dragObject.elemReal.classList.remove('dragCard');
          if (this.dropCardAnimation) this.dropCardAnimation.style.marginTop = 0 + 'px';
          document.querySelector('#avatar').remove();
          this.saveChange(this.dragCard, this.dropOnCard);
        }
        this.dragObject = {};
        return this.dragObject;
      },
      getCardId (idCardSearch){
        let card = {};
        if (idCardSearch.cardId) {
          for (let i = 0; i <= this.BOARD.data.length; i++) {
            card.indexCard = this.BOARD.data[i].cards.findIndex(card => card.cardId == idCardSearch.cardId);
            if (card.indexCard > -1) break
          }
          card.indexList = this.BOARD.data.findIndex(list => list.id == idCardSearch.listId);
        }
        else{
          card.indexCard = 0;
          card.indexList = this.BOARD.data.findIndex(list => list.id == idCardSearch.listId);
        }
        return card;
      },

      saveChange(dragCard, dropCard){
        if (dropCard.indexList >= 0){
          this.$store.dispatch('SAVE_DRAG_AND_DROP', {indexBoard:this.getIndexBoard, dragCard: dragCard, dropCard: dropCard})
        }
      },
      clearSelection() {
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else {
          document.selection.empty();
        }
      },
      showFormCreating(event) {
        this.showFormAddNewList = event;
      }
    },
    computed: {
      ...mapGetters(['GET_BOARDS', 'BOARD']),
      getIndexBoard() {
        const indexBoard = this.GET_BOARDS.findIndex(item => item.id == this.$route.params.id);
        return indexBoard;
      },
    },
    components: {
      FormCreatingNewList,
      List,
    },
    created() {
      this.$store.dispatch('SET_BOARD', this.$route.params.id);
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
        border-radius: 5px;
        margin-bottom: 50px;
    }

    .wrapper-boards-page .form-creating-new-list,
    .wrapper-boards-page .creating-list-btn{
        transition: all .5s;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }

    .wrapper-boards-page .form-creating-new-list:hover,
    .wrapper-boards-page .creating-list-btn:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.3);
    }
    .creating-list-btn{
        width: 270px;
        height: 100px;
        background-color: #0a2c74;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f5f2f2;
        cursor: pointer;
        transition: all .5s;
        border-radius: 5px;
    }
    .title-board{
        width: 300px;
        word-wrap: break-word;
    }
    .title-board h3 {
        width: inherit;
        margin: 0;
        font-size: 20px;
        font-weight: 600;
    }

    .box-list {
        display: flex;
        flex-wrap: wrap;
    }

    .box-list > * {
        margin: 10px 20px 10px 0;
    }

    @media (max-width: 650px) {
        .creating-list-btn,
        .title-board,
        .form-creating-new-list{
            width: 80%;
            margin-left: auto;
            margin-right: auto;
         }
        .box-list{
            margin-top: 20px;
            justify-content: center;
        }
    }
</style>