<template>
    <div  class="card" :style="{'background-color':value.color}">
      <div class="text-wrapper" style="cursor:pointer" @click="maskValue(value)">
        <h3>{{value.title.substr(0,22)}} <span v-if="value.title.length >= 22 ">...</span></h3>
        <p>{{value.text.substr(0,50)}} ...</p>
      </div>
      <div class="labels">
        <small  class="label" v-for="(tagId, i) in value.tagsId" :key="i"><span  class="label-title"> {{ store.getters.tagLabel(tagId) }} </span><div class="deleteLabel" @click="store.commit('deleteTagFromTodo', {todoId: value.id, tagId: tagId})"></div></small>
      </div>
        <div class="options-wrapper">
            <div class="option1 option">
                <div class="pallet">
                  <label v-for="(color, i) in colors" :key="i" class="container color" :style="{'backgroundColor':color.colorVal}" @click="setColor(value.id, color.colorVal)">
                  <input type="radio" checked="checked" name="radio">
                  <span class="checkmark" :style="{'background-color': color.colorVal}" ></span>
                  </label>
                </div>
            </div>
            <div class="option2 option" @click="archiver(value.id)"></div>
            <div class="option4 option" @click="deleteNote(value)"></div>
            <div class="option3 option">
              <AddNewtagAndSelect  class="auto-tags" :value="allTag" :cardId="value.id" :tagsId="value.tagsId"  />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import AddNewtagAndSelect from '../components/AddNewtagAndSelect'
export default {
  emits: ['deleteNote', 'maskValue'],
  props: { value: Object },
  components: {
    AddNewtagAndSelect
  },
  setup (props, { emit }) {
    const singleTodoForEdit = ref()
    const store = useStore()
    const tick = ref('tick')
    const isActive = ref(false)
    const archiver = (id) => {
      store.commit('archiver', id)
    }

    const colors = computed(() => {
      return store.state.colors
    })
    const act = () => {
      tick.value = 'null'
    }
    const deleteNote = (id) => {
      store.commit('deleteNote', id)
    }
    const maskValue = (value) => {
      emit('maskValue', value)
    }
    const allTag = computed(() => {
      return store.getters.allLabel
    })
    const colorAndId = reactive({
      id: '',
      color: ''
    })
    const setColor = (id, color) => {
      colorAndId.id = id
      colorAndId.color = color
      store.commit('colorise', colorAndId)
    }
    return {
      setColor,
      colorAndId,
      allTag,
      maskValue,
      colors,
      store,
      tick,
      isActive,
      act,
      deleteNote,
      archiver,
      singleTodoForEdit
    }
  }
}
</script>

<style scoped>
    .card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        width: 340px;
        height: 190px;
        padding: 15px;
        transition: all .25s;
    }
    .options-wrapper {
        padding-top: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .option {
        width: 24px;
        height: 24px;
        border-radius: 100%;
        padding: 3px;
        transition:all .3s;
    }
    .option:hover {
        background-color: #92929277;
        transition:all .3s;
        cursor: pointer;

    }
    .option1 {
        background-image: url('../assets/mdi-icons/palette.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 18px 18px;
        position: relative;
        }
    .option2 {
        background-image: url('../assets/mdi-icons/archive-arrow-down-outline.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 18px 18px;
    }
    .option3 {
        background-image: url('../assets/mdi-icons/label-outline.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 18px 18px;
        position: relative;
    }
  .auto-tags{
    position: absolute;
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    transition: all .5s;
    cursor: pointer;
  }
  .option3:hover .auto-tags {
    visibility: visible;
    opacity: 1;
    transition: all .5s;
  }
    .option4 {
        background-image: url('../assets/mdi-icons/delete-outline-small.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 18px 18px;
    }
    .pallet{
        display:none;
        flex-wrap: wrap;
        gap: 6px;
        justify-content: space-around;
        width: 126px;
        min-height: 30px;
        background-color: white;
        position: absolute;
        top: -85px;
        left: 8px;
        padding: 8px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
        transition: all .3s;
        opacity: 0;

   }
    .option1:hover .pallet {
      display: flex;
      opacity: 1;
      transition: all 1s;
    }
    .color {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
    }
    .labels{
      display: flex;
      flex-wrap: wrap;
      margin: 20px 3px;
      height: 30px;
    }
    .label{
      border: 1px solid rgba(128, 128, 128, 0.822);
      border-radius: 15px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 3px;
    }
    .deleteLabel{
      background-image: url('../assets/mdi-icons/close.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 9px 9px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
            display: flex;
      justify-content: center;
      align-items: center;

    }
    .deleteLabel:hover{
      background-color: #afafaf ;
    }
    /* The container */
.container {
  position: relative;
  cursor: pointer;
  font-size: 1em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;

}
/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: '\2713';
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
}
</style>
