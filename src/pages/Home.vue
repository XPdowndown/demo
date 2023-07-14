<template>
  <div id="home">
    <Header>
      <template slot="left">
        <div class="left"></div>
      </template>
      <template slot="center">
        <div class="center">优购首页</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <Search />
    <Swiper />
    <HomeNav />
    <Floor />
    <Footer v-show="$store.state.bottomShow" />
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Search from '../components/Search'
  import Swiper from '../components/Swiper'
  import HomeNav from '../components/HomeNav'
  import Floor from '../components/Floor'
  import Footer from '@/components/Footer'

  export default {
    name: 'Home',
    components: { Header, Search, Swiper, HomeNav, Floor, Footer },
  }
</script>

<style scoped>
  #home {
    width: 100%;
    /* min-height: 200vh; */
    margin-bottom: 45px;
  }
</style>