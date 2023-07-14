<template>
  <div class="goods-search">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">搜索详情</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <div class="search">
      <van-index-bar :index-list="indexList">
        <van-cell
          :title="item.goods_name"
          v-for="(item, index) in message"
          :key="index"
          @click="goGoodDetail(item.goods_id)"
        />
      </van-index-bar>
      <van-empty
        v-if="message.length == 0"
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无该商品"
      />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import { getGoodsSearch } from '@/utils/goodsSearch.js'

  export default {
    name: 'GoodsSearch',
    components: { Header },
    data() {
      return {
        message: [],
        indexList: []
      }
    },
    methods: {
      //获取后台搜索内容相关信息
      async getGoodsSearch() {
        let query = this.$route.query.query.trim()
        let { data: { message } } = await getGoodsSearch(query)
        this.message = message
      },

      //返回上一页
      goBack() {
        this.$router.back()
      },

      //前往商品详情页面
      goGoodDetail(goods_id) {
        this.$router.push({ path: '/gooddetail', query: { goods_id } })
      }
    },
    created() {
      this.getGoodsSearch()
    },
  }
</script>

<style scoped>
  .search {
    margin-top: 44px;
  }
  .van-cell {
    border-bottom: 1px solid #e7e7e7;
  }
  .van-cell::after {
    border-bottom: 0;
  }
</style>