<template>
  <div>
    <Modal v-model="maskProp" @close="closeModal" />
    <div class="archive-container">
      <template v-for="(note ,i) in store.getters.archivedOrUnarchivedNotes(false, tagId)" :key="i">
        <Card :value="note" @maskValue="maskToFlex"/>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Modal from '../components/Modal.vue'
import { useRoute } from 'vue-router'
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    Card,
    Modal
  },
  setup () {
    const router = useRoute()
    const store = useStore()
    const tagId = computed(() => {
      return parseInt(router.params.id)
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
      maskProp,
      maskToFlex,
      router,
      tagId,
      store
    }
  }
}
</script>

<style scoped>
  .archive-container {
    width: 75%;
    margin: 25px;
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
</style>
