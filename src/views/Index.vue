<template>
  <div>
    <Modal v-model="maskProp" @close="closeModal" />
    <div class="index-container">
      <div class="addTextContainer">
        <div class="containerTwo">
          <input @input="see" type="text"  placeholder="Title" class="addTitle" v-model="todoData.title">
          <textarea name="" id="" cols="71" rows="10"  :style="[textArea]" placeholder="Take a note" v-model="todoData.text"></textarea>
          <div :style="option">
            <button :style="btn" @click="addNewNote($event),notSee($event)">close</button>
          </div>
        </div>
      </div>
      <template v-for="(note ,i) in unarchiveNote" :key="i">
        <Card :value="note" @maskValue="maskToFlex"  />
      </template>
    </div>
  </div>
</template>
<script>
import Card from '../components/Card'
import Modal from '../components/Modal'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    Card,
    Modal
  },
  setup () {
    // data
    const todoData = reactive({
      title: '',
      text: '',
      color: '',
      tagsId: []
    })
    const addNewNote = () => {
      if (todoData.title !== '') {
        store.commit('saveNote', todoData)
      }
    }

    // endData
    const store = useStore()
    const unarchiveNote = computed(() => {
      return store.getters.archivedOrUnarchivedNotes(false)
    })
    const see = () => {
      active.value = true
      if ((active.value === true) && (todoData.title !== '')) {
        textArea.display = 'inherit'
        btn.display = 'inherit'
      }
    }
    const notSee = () => {
      active.value = false
      if (active.value === false) {
        textArea.display = 'none'
        btn.display = 'none'
        todoData.title = ''
        todoData.text = ''
      }
    }
    const active = ref(false)
    const textArea = reactive({
      width: '543px',
      height: 'max-content',
      padding: '12px 16px',
      border: 'none',
      outline: 'none',
      borderRadius: '5px',
      fontWeight: '400px',
      fontSize: '.875rem',
      fontFamily: 'Roboto,Arial,sans-serif',
      letterSpacing: '.01428571em',
      display: 'none'
    })
    const option = reactive({
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: '2px',
      width: '100%',
      paddingTop: '6px',
      backgroundColor: 'rgba(197, 197, 197, 0.26)',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    })
    const btn = reactive({
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '1.2em',
      padding: '8px 24px',
      display: 'none',
      cursor: 'pointer'
    })
    const maskProp = reactive({
      actived: false
    })
    const closeModal = () => {
      maskProp.actived = false
    }
    const maskToFlex = (todoObject) => {
      maskProp.actived = true
      maskProp.todo = _.clone(todoObject)
    }
    return {
      closeModal,
      maskProp,
      maskToFlex,
      store,
      unarchiveNote,
      see,
      textArea,
      option,
      btn,
      todoData,
      addNewNote,
      active,
      notSee
    }
  }
}
</script>

<style scoped>
.index-container {
  width: 70%;
  position: absolute;
  left: 20%;
  height: calc(100%-80px);
  top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
.containerTwo {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.addTextContainer {
width: 100%;
min-height:46px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
.addTitle {
  width: 543px;
  height: 46px;
  padding: 12px 16px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: 400;
  font-size: .875rem;
  font-family: Roboto,Arial,sans-serif;
  letter-spacing: .01428571em;
}
.modalTitle{
    width: 543px;
  height: 46px;
  padding: 12px 16px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: 400;
  font-size: .875rem;
  font-family: Roboto,Arial,sans-serif;
  letter-spacing: .01428571em;
}
.modalText {
      width: 543px;
      height: max-content;
      padding: 12px 16px;
      border: none;
      outline: none;
      border-radius: 5px;
      font-weight: 400px;
      font-size: .875rem;
      font-family: Roboto,Arial,sans-serif;
      letter-spacing: '.01428571em';
      display: block;
    }
</style>
