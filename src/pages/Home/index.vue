<template>
  <div>
    <!-- 全局组件，因而使用时不需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(items) in floorList" :key="items.id" :floor="items"></Floor>

    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch('getFloorList')
    // 派发action 获取用户信息
    // this.$store.dispatch('userInfo')
  },
  computed: {
    ...mapState({ floorList: state => state.Home.floorList }),
  }

}
</script>

<style scoped></style>