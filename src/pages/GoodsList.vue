<template>
  <div class="goods-list">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">商品列表</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <Search />
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="goods">
        <div
          class="goods-item"
          v-for="(item, index) in goods"
          :key="index"
          @click="goGoodDetail(item.goods_id)"
        >
          <div class="img">
            <img :src="item.goods_small_logo ? item.goods_small_logo : img" />
          </div>
          <div class="info">
            <div class="title">{{ item.goods_name }}</div>
            <div class="price">￥{{ item.goods_price }}</div>
          </div>
        </div>
        <div v-if="goods.length == 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无该商品"
          />
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import { getGoodsList } from "@/utils/goodsList.js";
import { Toast } from "vant";

export default {
  name: "GoodsList",
  components: { Header, Search },
  data() {
    return {
      goods: [],
      img: require("@/assets/img/err02.jpg"),
      isLoading: false,
    };
  },
  methods: {
    async getGoodsList() {
      //获取url地址里的cid参数
      let cid = this.$route.query.cid;
      // console.log(cid);
      //传参获取商品列表信息
      let {
        data: {
          message: { goods },
        },
      } = await getGoodsList(cid);
      this.goods = goods;
      // console.log(this.goods);
    },

    //返回上一页
    goBack() {
      this.$router.back();
    },

    //点击前往商品详情页面
    goGoodDetail(goods_id) {
      this.$router.push({ path: "/gooddetail", query: { goods_id } });
    },

    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style scpoed>
.goods {
  display: flex;
  flex-direction: column;
}
.goods-item {
  flex: 1;
  display: flex;
  border-bottom: 1px solid #e7e7e7;
}
.goods-item .img {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goods-item .img img {
  width: 70%;
}
.goods-item .info {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info .title {
  font-size: 13px;
  line-height: 17px;
}
.info .price {
  font-size: 18px;
  color: red;
}
</style>