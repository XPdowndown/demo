<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-show="$route.meta.show" :value="msg" @input="msg = $event"></Footer> -->
    <Footer v-show="$route.meta.show" v-model="msg"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    //发请求获取服务端数据
    this.$store.dispatch('categoryList')
  },
  data() {
    return {
      msg: "sai"
    }
  },



}
</script>

<style></style>