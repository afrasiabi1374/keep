<template>
  <TagModal v-model="maskProp" @close="closeModal"/>
  <div class="main-wrapper">
    <Header @navToggle="navToggle"/>
    <MegaMenu @editLabel="showModal" v-model="toggleVal"/>
    <router-view></router-view>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import Header from './components/Header'
import MegaMenu from './components/MegaMenu'
import TagModal from './components/TagModal'
export default {
  components: { Header, MegaMenu, TagModal },
  setup () {
    const maskProp = reactive({
      actived: false
    })
    const showModal = () => {
      maskProp.actived = true
    }
    const closeModal = () => {
      maskProp.actived = false
    }
    const toggleVal = ref(true)
    const navToggle = () => {
      toggleVal.value = !toggleVal.value
    }
    return {
      toggleVal,
      navToggle,
      maskProp,
      showModal,
      closeModal
    }
  }
}
</script>

<style lang="scss">
.main-wrapper {
  display: flex;
}
.menu-container{
  display: inline-block;
  min-height: 90vh;
  width: 20%;
  position: fixed;
  background-color: cyan;
  top: 11%;
}
.menu {
  list-style-type: none;
}
.menu-items {
  display: flex;
  align-items: center;
  border-radius: 0 25px 25px 0;
  width: 100%;
  img{
    padding: 10px 18px;
  }
}

</style>
