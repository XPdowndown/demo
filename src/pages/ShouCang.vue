<template>
  <div class="shou-cang">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">我的收藏</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <div
      class="item"
      v-for="(item, index) in message"
      :key="index"
      @click="goGoodDetail(item.goods_id)"
    >
      <van-card
        :price="item.goods_price"
        class="card"
        :title="item.goods_name"
        :thumb="item.goods_small_logo ? item.goods_small_logo : img"
      />
    </div>

    <div v-if="message.length == 0">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无该商品"
      />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'

  export default {
    name: 'ShouCang',
    components: { Header },
    data() {
      return {
        message: JSON.parse(localStorage.getItem('ShouCangMessage')) ? JSON.parse(localStorage.getItem('ShouCangMessage')) : [],
      }
    },
    methods: {
      //返回上一页
      goBack() {
        this.$router.back()
      },

      //点击前往商品详情页面
      goGoodDetail(goods_id) {
        this.$router.push({ path: '/gooddetail', query: { goods_id } })
      },
    },
  }
</script>

<style scoped>
  .shou-cang {
    margin-top: 44px;
  }
  .card {
    border-bottom: 1px solid #e7e7e7;
    background-color: #fff;
  }

  .item /deep/ .van-card__title {
    font-size: 13px;
  }
  .item /deep/ .van-card__price span {
    font-size: 18px;
    color: red;
  }
  .item /deep/ .van-card__price div {
    color: #fff;
  }
</style>