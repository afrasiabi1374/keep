<template>
  <Modal v-model="maskProp" @close="closeModal" />
  <div class="archive-container">
    <h2>unarchived</h2>
    <div class="childContainer">
      <template v-for="(note ,i) in unarchivedNotes" :key="i" >
        <Card :value="note" @maskValue="maskToFlex"/>
      </template>
    </div>
    <h2>archived</h2>
    <div class="childContainer">
      <template v-for="(note ,i) in archivedNotes" :key="i">
        <Card :value="note" @maskValue="maskToFlex"/>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import Card from '../components/Card'
import Modal from '../components/Modal'
export default {
  components: {
    Card,
    Modal
  },
  setup () {
    const store = useStore()
    const unarchivedNotes = computed(() => {
      return store.getters.archivedOrUnarchivedNotes(false)
    })
    const archivedNotes = computed(() => {
      return store.getters.archivedOrUnarchivedNotes(true)
    })
    const maskProp = reactive({
      actived: false
    })
    const closeModal = () => {
      maskProp.actived = false
    }
    const maskToFlex = (todoObject) => {
      maskProp.actived = true
      maskProp.todo = todoObject
    }
    return {
      closeModal,
      maskToFlex,
      unarchivedNotes,
      archivedNotes,
      maskProp
    }
  }
}
</script>

<style scoped>
.archive-container {
  width: 70%;
  position: absolute;
  left: 20%;
  height: calc(100%-80px);
  top: 100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
}
.childContainer {
  display: flex;
  gap: 20px;
  margin-left: 10px;
}

</style>
