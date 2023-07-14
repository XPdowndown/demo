<template>
  <div class="err">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">商品分类</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <Search />
    <van-empty description="暂无该商品" />
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Search from '@/components/Search'

  export default {
    name: 'Err',
    components: { Header, Search },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
</style>