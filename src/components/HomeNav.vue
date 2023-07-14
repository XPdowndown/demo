<template>
  <!-- https://www.showdoc.com.cn/128719739414963/2513235043485226 -->
  <div>
    <van-swipe-cell right-width="300px" left-width="300px">
      <div class="home-nav">
        <div class="nav-wrap">
          <div class="nav-wrap-item">
            <img
              v-for="(images, index) in images"
              :key="index"
              :src="images.image_src"
              @click="goUrl"
            />
          </div>
        </div>
      </div>

      <template #right>
        <!-- <van-button square text="删除" type="danger" class="delete-button" /> -->
        <div class="home-nav">
          <div class="nav-wrap">
            <div class="nav-wrap-item">
              <img
                v-for="(images, index) in images"
                :key="index"
                :src="images.image_src"
                @click="goUrl"
              />
            </div>
          </div>
        </div>
      </template>
      <template #left>
        <!-- <van-button square text="删除" type="danger" class="delete-button" /> -->
        <div class="home-nav">
          <div class="nav-wrap">
            <div class="nav-wrap-item">
              <img
                v-for="(images, index) in images"
                :key="index"
                :src="images.image_src"
                @click="goUrl"
              />
            </div>
          </div>
        </div>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { getHomeNav } from "@/utils/home.js";

export default {
  name: "HomeNav",
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async getHomeNav() {
      let {
        data: { message },
      } = await getHomeNav();
      console.log(message);
      this.images = message;
    },

    goUrl() {
      this.$router.push("/category");
    },
  },
  created() {
    this.getHomeNav();
  },
};
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
.home-nav .nav-wrap {
  padding: 15px 0;
}
.nav-wrap-item {
  display: flex;
  justify-content: space-around;
}
.nav-wrap-item img {
  width: 22%;
}
</style>