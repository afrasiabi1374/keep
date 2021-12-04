<template  v-if="modelValue.actived">
  <div class="editMask" :style="[modelValue.actived?maskFlex:'display:none']" @click="closeModal"></div>
  <div :style="[modelValue.actived?maskItemsFlex:'display:none']">
    <input   type="text"  placeholder="Title" class="modalTitle"  v-model="formData.title" >
    <textarea name="" id="" cols="71" rows="40"  class="modaltext" placeholder="Take a note"  v-model="formData.text"></textarea>
    <!-- HTML !-->
    <button class="button-4" role="button" @click="editNotes($event), closeModal($event)">submit edits</button>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { watch, reactive } from 'vue'
import _ from 'lodash'
export default {
  emits: ['close'],
  props: { modelValue: Object },
  setup (props, { emit }) {
    const formData = reactive({
      title: '',
      text: '',
      id: '',
      archived: '',
      tagsId: [1, 2]
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
      width: '600px',
      height: '600px',
      'z-index': '6',
      left: '35%',
      top: '10%',
      display: 'flex',
      flexDirection: 'column'
    })
    const closeModal = () => {
      emit('close')
    }
    watch(
      () => _.cloneDeep(props.modelValue.todo),
      () => {
        formData.title = props.modelValue.todo.title ? _.clone(props.modelValue.todo.title) : ''
        formData.text = props.modelValue.todo.text ? _.clone(props.modelValue.todo.text) : ''
        formData.archived = _.clone(props.modelValue.todo.archived)
        formData.tagsId = props.modelValue.todo.tagsId ? _.clone(props.modelValue.todo.tagsId) : []
        formData.id = props.modelValue.todo.id ? _.clone(props.modelValue.todo.id) : ''
      },
      { deep: true }
    )
    const editNotes = () => {
      try {
        console.log('formDaTA in try', formData)
        store.commit('saveNote', JSON.parse(JSON.stringify(formData)))
        emit('close')
      } catch (e) {
        console.log(e)
      }
    }

    return {
      store,
      editNotes,
      maskFlex,
      maskItemsFlex,
      closeModal,
      formData
    }
  }
}
</script>

<style>
.editMask{
    background: rgba(5, 5, 5, 0.63)
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
</style>
