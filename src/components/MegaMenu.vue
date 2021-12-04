<template>
  <div :style="menuContainer">
      <ul class="menu">
          <li class="menu-items" >
            <router-link to="/" class="menu-items">
            <img src="../assets/mdi-icons/lightbulb-outline.png" alt="">
            <h3>Notes</h3>
          </router-link>
          </li>
        <template v-for="(item, i) in allTags" :key="i">
            <li class="menu-items">
              <router-link :to="'/byTag/'+item.id" class="menu-items">
                <img src="../assets/mdi-icons/tag-outline.png" alt="">
                <h3>{{ item.name }}</h3>
              </router-link>
            </li>
        </template>
        <li class="menu-items" @click="editLabel">
            <img src="../assets/mdi-icons/pen.png" alt="">
            <h3>edit label</h3>
        </li>
          <li class="menu-items">
            <router-link to="/archive" class="menu-items">
              <img src="../assets/mdi-icons/archive-arrow-down-outline.png" alt="">
              <h3>archive {{ modelValue }}</h3>
            </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, watch } from 'vue'
import _ from 'lodash'
export default {
  props: {
    modelValue: Boolean
  },
  setup (props, { emit }) {
    const editLabel = () => {
      emit('editLabel')
    }
    const store = useStore()
    const allTags = computed(() => {
      return store.getters.allLabel
    })
    const menuContainer = reactive({
      height: 'calc(100%-80px)',
      width: '280px',
      position: 'fixed',
      top: '80px',
      left: '0%',
      transition: 'all .4s'
    })
    watch(
      () => _.cloneDeep(props.modelValue),
      () => {
        if (props.modelValue === true) {
          menuContainer.left = '0%'
        } else if (props.modelValue === false) {
          menuContainer.left = '-50%'
        }
      },
      { deep: true }

    )
    return {
      menuContainer,
      editLabel,
      store,
      allTags
    }
  }
}
</script>

<style lang="scss" scoped>

.menu {
  list-style-type: none;

}
.menu-items {
  display: flex;
  align-items: center;
  color: black;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  width: 100%;
  img{
    padding: 10px 18px;
  }
}
.router-link-exact-active {
  background-color: #feefc3;
  transition: all .5s;
}
</style>
