<template  v-if="modelValue.actived">
  <div class="editMask" :style="[modelValue.actived?maskFlex:'display:none']" @click="closeModal"></div>
  <div :style="[modelValue.actived?maskItemsFlex:'display:none']">
    <div class="search-container">
      <div class="make-empty" @click="makeEmpty()"></div><input type="text" class="search-label" placeholder="add label" v-model="labelText.name" @keyup.enter="saveLabel(labelText)">
    </div>
    <template v-for="(tag, i) in allTags" :key="i">
      <div class="tags-wrapper" >
        <span class="trash-icon" @click="deleteTag(tag)"></span><input class="tag-item" type="text" v-model="tag.name"><div class="edit-tag" @click="editTag({id: tag.id , name: tag.name })"></div>
      </div>
    </template>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
export default {
  emits: ['close'],
  props: { modelValue: Object },
  setup (props, { emit }) {
    const labelText = reactive({
      name: ''
    })
    const formData = reactive({
      title: '',
      text: '',
      id: '',
      archived: '',
      tagsId: []
    })
    const store = useStore()
    const maskFlex = reactive({
      width: '100%',
      height: '100vh',
      opacity: '.7',
      position: 'absolute',
      'z-index': '5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })
    const maskItemsFlex = reactive({
      position: 'absolute',
      width: '300px',
      height: '422px',
      'z-index': '6',
      left: '38%',
      top: '20%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      background: 'white',
      padding: '15px'
    })
    const closeModal = () => {
      emit('close')
    }
    const allTags = computed(() => {
      return store.getters.allLabel
    })
    const editNotes = () => {
      try {
        console.log('formDaTA in try', formData)
        store.commit('saveNote', JSON.parse(JSON.stringify(formData)))
      } catch (e) {
        console.log(e)
      }
    }
    const saveLabel = (txt) => {
      store.commit('saveLabel', JSON.parse(JSON.stringify(txt)))
      txt.name = ''
    }
    const deleteTag = (id) => {
      store.commit('deleteTag', id)
    }
    const makeEmpty = () => {
      labelText.name = ''
    }
    const editTag = (tag) => {
      store.commit('saveLabel', JSON.parse(JSON.stringify(tag)))
    }
    return {
      editTag,
      makeEmpty,
      deleteTag,
      store,
      editNotes,
      maskFlex,
      maskItemsFlex,
      closeModal,
      formData,
      allTags,
      labelText,
      saveLabel
    }
  }
}
</script>

<style>
.editMask{
    background: rgba(5, 5, 5, 0.63);
    display: flex;
    justify-content: center;
    align-items: center;
}
.childContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 34px;
  min-height: 50vh;
}
.button-4 {
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.button-4:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.button-4:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.button-4:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.button-4:focus {
  outline: 1px transparent;
}

.button-4:before {
  display: none;
}

.button-4:-webkit-details-marker {
  display: none;
}
.tags-wrapper{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.trash-icon {
  width: 20px;
  height: 20px;
  background-image: url('../assets/mdi-icons/trash-can-outline.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  opacity: 0.54;

}
.make-empty{
  background-image: url('../assets/mdi-icons/close.png');
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: 18px 18px;
    background-size: 18px 18px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid transparent;
    height: 24px;
    opacity: 0.54;
    width: 24px;
  cursor: pointer;
}
.edit-tag{
  background-image: url('../assets/mdi-icons/pen.png');
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: 18px 18px;
    background-size: 18px 18px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid transparent;
    height: 24px;
    opacity: 0.54;
    width: 24px;
  cursor: pointer;
}
.tag-item{
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  width: 172px;
  height: 26px;
  margin: 0px 15px;
}
.search-label{
  border: none;
  outline: none;
  margin: 0px 15px;
}
.search-label{
  font-weight: 500;
  flex: 1 1 auto;
  font-size: 14px;
  margin: 0 15px;
}
.search-container{
  display: flex;
  align-items: center;
}
</style>
