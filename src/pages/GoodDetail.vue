<template>
  <div class="good-detail">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">商品详情</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <!-- 商品详情盒子 -->
    <div class="goods_info">
      <!-- 小轮播图 -->
      <div class="good_swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in pics" :key="index">
            <div class="img" @click="ImagePreview()">
              <img :src="image.pics_mid" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="goods_price">￥{{ message.goods_price }}</div>
      <div class="goods_name">
        <div class="left">{{ message.goods_name }}</div>
        <div
          class="right"
          @click="
            addShouCang(message.goods_id);
            addShouCangMessage(message.goods_id);
          "
        >
          <span
            class="iconfont"
            :class="
              this.$store.state.ShouCang.includes(message.goods_id)
                ? 'icon-shoucang1'
                : 'icon-shoucang'
            "
          ></span>
          <span class="ShouCang">
            {{
              this.$store.state.ShouCang.includes(message.goods_id)
                ? "已收藏"
                : "收藏"
            }}
          </span>
        </div>
      </div>
      <div class="goods_title">图文详情</div>
      <!-- 商品详细内容 -->
      <div ref="goods_detail_content"></div>
      <AddCart :message="message" />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import AddCart from '@/components/AddCart'
  import { getGoodDetail } from '@/utils/goodDetail.js'
  import { ImagePreview } from 'vant';

  export default {
    name: 'GoodDetail',
    components: { Header, AddCart },
    data() {
      return {
        message: {},
        goods_introduce: null,
        pics: [],
        ShouCangMessage: JSON.parse(localStorage.getItem('ShouCangMessage')) ? JSON.parse(localStorage.getItem('ShouCangMessage')) : [],
      }
    },

    methods: {
      async getGoodDetail() {
        //获取url地址里的goods_id参数
        let goods_id = this.$route.query.goods_id
        let { data: { message } } = await getGoodDetail(goods_id)
        this.message = message
        this.goods_introduce = message.goods_introduce
        this.pics = message.pics
        // 打印富文本内容
        this.$refs.goods_detail_content.innerHTML = this.goods_introduce
      },

      // 添加/取消 收藏
      addShouCang(goods_id) {
        if (this.$store.state.ShouCang.includes(goods_id)) {
          this.$store.commit('deleteShouCang', goods_id)
        } else {
          this.$store.commit('addShouCang', goods_id)
        }
      },

      addShouCangMessage(goods_id) {
        if (!this.ShouCangMessage.some(val => val.goods_id == goods_id)) {
          this.ShouCangMessage.push(this.message)
        } else {
          this.ShouCangMessage = this.ShouCangMessage.filter(val => val.goods_id !== goods_id)
        }
        localStorage.setItem('ShouCangMessage', JSON.stringify(this.ShouCangMessage))
      },

      //返回上一页
      goBack() {
        this.$router.back()
      },

      //商品展示 插件实现
      ImagePreview() {
        let swiperImg = []
        this.pics.forEach(val => {
          swiperImg.push(val.pics_mid)
        })
        ImagePreview(swiperImg);
      },
    },
    created() {
      this.getGoodDetail(this.pics)
    },
  }
</script>

<style scoped>
  .goods_info {
    margin-top: 44px;
    text-align: center;
  }
  .good_swiper {
    padding-top: 8px;
  }
  .img {
    text-align: center;
  }
  .img img {
    width: 40%;
  }

  .goods_price {
    padding: 8px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: red;
  }
  .goods_name {
    display: flex;
    border-top: 5px solid #dedede;
    border-bottom: 5px solid #dedede;
    padding: 5px 0;
  }
  .goods_name .left {
    flex: 5;
    padding: 0 5px;
    font-size: 14px;
    text-align: left;
    color: #000;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goods_name .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    border-left: 1px solid #000;
  }
  .right span:nth-child(1) {
    font-size: 22px;
    color: red;
  }
  .goods_name .right .ShouCang {
    font-size: 13px;
  }
  .goods_title {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: red;
    padding: 16px 0 0 0;
  }
</style>