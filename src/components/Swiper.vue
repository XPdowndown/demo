<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <img :src="image.image_src" @click="goGoodDetail(image.goods_id)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { getBanner } from "@/utils/home.js"
  // import { request } from '@/utils/request.js'

  export default {
    name: 'Swiper',
    data() {
      return {
        banners: [],
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      async getBanner() {
        let { data: { message }
        } = await getBanner()
        this.banners = message

        // let { data: { message } } = await request({
        //   url:"",params:{
        //     id:
        //   }
        // })
        // console.log(message);
        // this.banners = message


      },

      //前往商品详情页面
      goGoodDetail(goods_id) {
        this.$router.push({ path: '/gooddetail', query: { goods_id } })
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
</style>