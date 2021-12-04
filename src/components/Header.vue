<template>
  <Modal v-model="maskProp" @close="closeModal" />
  <div class="main-header-wrapper">
      <div class="signin-google">
          <img src="../assets/mdi-icons/login-variant.png" alt="signin">
      </div>
      <div class="list-view">
          <img src="../assets/mdi-icons/view-list.png" alt="list-view">
      </div>
      <div class="search-input">
          <input type="text" class="input-search" placeholder="search" v-model="autoCompleteWord" @keyup="search(autoCompleteWord)">
          <img src="../assets/mdi-icons/close.png" @click="clearModal" class="clear-search" alt="">
          <div class="response-wrapper" :style="responseWrapper">
              <template v-for="(item, i) in autoCompleteResponse" :key="i">
                  <h3 @click="maskToFlex(item)">{{ item.title }}</h3>
              </template>
          </div>
      </div>
      <div class="logo">
          <router-link to="/" class="logo">
            <img class="logo-image" src="../assets/mdi-icons/keep.png" alt="" >
            <div class="logo-text">keep</div>
          </router-link>
      </div>
      <div class="menu" @click="showNav">
          <img class="menu-icon" src="../assets/mdi-icons/menu.png" alt="" >
      </div>
  </div>
</template>

<script >
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal'
export default {
  components: {
    Modal
  },
  setup (props, { emit }) {
    const store = useStore()
    const showNav = () => {
      emit('navToggle')
    }
    const autoCompleteWord = ref('')
    const autoCompleteResponse = ref('')
    const items = ref(store.getters.allNotes)
    const search = (val) => {
      if ((val !== '') && (items.value.filter(item => item.title.toLowerCase().includes(val.toLowerCase())).length > 0)) {
        autoCompleteResponse.value = items.value.filter(item => item.title.toLowerCase().includes(val.toLowerCase()))
        responseWrapper.display = 'flex'
      } else {
        autoCompleteResponse.value = []
        responseWrapper.display = 'none'
      }
    }
    const responseWrapper = reactive({
      backgroundColor: 'white',
      position: 'absolute',
      bottom: '-205px',
      width: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      display: 'none',
      flexDirection: 'column',
      height: '200px',
      overflow: 'scroll',
      overflowX: 'hidden',
      transition: 'all 1s'
    })
    const maskProp = reactive({
      actived: false
    })
    const closeModal = () => {
      maskProp.actived = false
      responseWrapper.display = 'none'
    }
    const clearModal = () => {
      responseWrapper.display = 'none'
      autoCompleteWord.value = ''
    }
    const maskToFlex = (todoObject) => {
      maskProp.actived = true
      maskProp.todo = todoObject
    }
    return {
      clearModal,
      closeModal,
      maskProp,
      maskToFlex,
      responseWrapper,
      autoCompleteResponse,
      items,
      showNav,
      autoCompleteWord,
      search,
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header-wrapper {
    background: white;
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: space-around;
    height: 70px;
    line-height: 40px;
    align-items: center;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.signin-google {
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 1s;
}
.signin-google:hover {
    transition: background-color 1s;
    background-color: rgba(199, 199, 199, 0.788);
    cursor: pointer;
}
.list-view {
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 1s;
}
.list-view:hover {
    transition: background-color 1s;
    background-color: rgba(199, 199, 199, 0.788);
    cursor: pointer;
}
.search-input {
    width: 50%;
    height: 50px;
    display: flex;
    position: relative;
}
.response-wrapper {
    h3 {
        padding-left: 10px;
        cursor: pointer;
        transition: all .3s;
    }
    h3:hover {
        background-color: lightblue;
        transition: all .3s;
    }
}
.input-search{
    width: 100%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    outline: none;
    padding: 10px;
    padding-left:50px;
    padding-right:50px;
    background: url('../assets/mdi-icons/magnify.png') no-repeat scroll 7px 7px;
    font-size: 1.5em;
}
.logo {
    display: flex;
    height: 44px;
    width: 40px;
    background: transparent;
}
.logo-text {
    color: lightgray;
    height: 24px;
    font-size: 1.7em;
}
.menu {
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 1s;
}
.menu:hover {
    transition: background-color 1s;
    background-color: rgba(199, 199, 199, 0.788);
    cursor: pointer;
}
.clear-search{
    position: absolute;
    left: 94.5%;
    top: 25%;
    z-index: 2;
    border-radius: 50%;
}
.clear-search:hover {
    transition: background-color 1s;
    background-color: rgba(199, 199, 199, 0.788);
    cursor: pointer;
}
</style>
