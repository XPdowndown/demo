<template>
  <div class="search">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
      @keydown.enter="goSearch(value)"
      @focus="$store.commit('isHide')"
      @blur="$store.commit('isShow')"
    />
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data() {
      return {
        value: ''
      }
    },
    methods: {
      goSearch(query) {
        this.$router.push({ path: '/goodsSearch', query: { query } })
      },
    },
  }
</script>

<style scoped>
  .search .van-search {
    height: 44px;
    margin-top: 44px;
    background-color: #eb4450;
  }
  .search .van-search .van-search__content {
    border-radius: 10px;
    background-color: #fff;
  }
</style>