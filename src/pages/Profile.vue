<template>
  <div id="porfile">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">我的优购</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <div class="login">
      <div class="user_cover">
        <img :src="userImg" />
      </div>
      <div class="user_name">XP</div>
    </div>
    <div class="shop_wrap">
      <div class="header" @click="goShouCang">
        <div class="item">
          <van-icon name="star-o" />
          <span>商品收藏 {{ $store.state.ShouCang.length }}</span>
        </div>
        <div class="item">
          <van-icon name="shop-o" />
          <span>店铺关注 3</span>
        </div>
        <div class="item">
          <van-icon name="tosend" />
          <span>浏览记录 100</span>
        </div>
      </div>
      <div class="footer">
        <div class="footer_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daifukuan"></use>
          </svg>
          <div class="title">待付款</div>
        </div>
        <div class="footer_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daishouhuo"></use>
          </svg>
          <div class="title">待收货</div>
        </div>
        <div class="footer_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daipingjia"></use>
          </svg>
          <div class="title">待评价</div>
        </div>
        <div class="footer_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouhou"></use>
          </svg>
          <div class="title">退换/售后</div>
        </div>
        <div class="footer_item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dingdan"></use>
          </svg>
          <div class="title">我的订单</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="3"
          autosize
          label="留言"
          type="textarea"
          maxlength="80"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-uploader v-model="fileList" multiple />
      </van-cell-group>
    </div>

    <Footer />
  </div>
</template>

<script>
// import Header from '@/components/Header'
import Footer from "@/components/Footer";
import "@/assets/font/iconfont.js";

export default {
  name: "Porfile",
  // components: { Header, Footer },
  components: { Footer },
  data() {
    return {
      userImg: require("@/assets/img/微信图片_20230522104605.jpg"),
      value: "",
      message: "",
      fileList: [
        {
          url: "https://img01.yzcdn.cn/vant/leaf.jpg",
        },
        {
          url: "https://img01.yzcdn.cn/vant/tree.jpg",
        },
      ],
    };
  },
  methods: {
    //返回上一页
    goBack() {
      this.$router.back();
    },

    //前往收藏页
    goShouCang() {
      this.$router.push("/shouCang");
    },
  },
};
</script>

<style scoped>
/* 彩色字体图标样式 */
.icon {
  font-size: 26px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#porfile {
  padding: 0 8px;
  background-color: #f1f1f1;
  height: calc(100vh - 44px);
}
.login {
  margin-top: 44px;
  padding: 10px 0;
  text-align: center;
}
.login .user_cover {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.user_cover img {
  width: 100%;
  height: 100%;
}
.login .user_name {
  margin-top: 8px;
  font-weight: 600;
  color: #333;
}

.shop_wrap {
  background-color: #fff;
  border-radius: 8px;
}
.shop_wrap .header {
  display: flex;
  padding: 14px 5px;
  border-bottom: 1px solid #e7e7e7;
  text-align: center;
}
.header .item {
  flex: 1;
}
.header /deep/ .van-icon {
  font-size: 16px;
  font-weight: 600;
}
.header span {
  font-size: 15px;
}
.shop_wrap .footer {
  display: flex;
  justify-content: space-around;
  padding: 20px 5px;
  text-align: center;
}
.footer .footr_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer_item .title {
  margin-top: 5px;
  font-size: 13px;
}

.bottom {
  margin-top: 8px;
}
.bottom /deep/ .van-cell-group {
  margin: 0;
}
.bottom /deep/ .van-field {
  height: 30vh;
}
.bottom /deep/ .van-uploader {
  margin: 10px;
}

.bottom /deep/ .van-field__body {
  height: 80%;
  align-items: flex-start;
}
</style>