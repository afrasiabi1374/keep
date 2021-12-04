<template>
  <div class="auto-wrapper">
    <div class="search-container">
      <input type="text" class="search-label" placeholder="add label" v-model="labelText.name" @keyup.enter="saveLabel(labelText)">
    </div>
    <template v-for="(item, i) in value" :key="i">
      <div  class="labels-names" >
        <label class="label-name" :for="cardId + '-label' + i">{{ item.name }}</label>
        <input :checked="tagsId.includes(item.id)"  class="checkbox-label" type="checkbox" :id="cardId + '-label' + i"  style="color:gray" :value="item.id"  @change="addLabel(item.id)" >
      </div>
    </template>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    value: Array,
    cardId: Number,
    tagsId: Array
  },
  setup (props) {
    const tagsArr = reactive({
      todoId: props.cardId,
      tagId: null
    })
    const checked = ref('checked')
    const store = useStore()
    const labelText = reactive({
      name: ''
    })
    const saveLabel = (txt) => {
      store.commit('saveLabel', JSON.parse(JSON.stringify(txt)))
      txt.name = ''
    }
    const addLabel = (val) => {
      if ((!props.tagsId.includes(val))) {
        tagsArr.tagId = val
        store.commit('addLabelOnTodo', JSON.parse(JSON.stringify(tagsArr)))
      } else if ((props.tagsId.includes(val))) {
        tagsArr.tagId = val
        console.log('tagsArr.tagId', tagsArr.tagId)
        store.commit('deleteTagFromTodo', JSON.parse(JSON.stringify(tagsArr)))
      }
    }
    return {
      checked,
      addLabel,
      tagsArr,
      store,
      saveLabel,
      labelText
    }
  }
}
</script>

<style scoped>
.auto-wrapper{
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;    min-height: 100px;
  max-width: 225px;
  max-height: 326px;
  padding: 11px 0 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.labels-names {
  margin-left: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px 3px;
}
.labels-names:hover{
  background: rgb(223, 223, 223);
}
.search-label{
  border: none;
  outline: none;
  padding: 8px 12px;
}
.checkbox-label{
  margin-left: 9px;
  cursor: pointer;
}
.label-name{
  cursor: pointer;
}
</style>
