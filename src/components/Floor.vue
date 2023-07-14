<template>
  <van-tabs v-model="active" @click="getGoodsList" type="card">
    <van-tab title="时尚女装">
      <div class="floor">
        <FloorItem :message="message[0]" :goods="goods" @click.native="goUrl" />
      </div>
    </van-tab>
    <van-tab title="户外运动">
      <div class="floor">
        <FloorItem :message="message[1]" :goods="goods" @click.native="goUrl" />
      </div>
    </van-tab>
    <van-tab title="箱包配饰">
      <div class="floor">
        <FloorItem :message="message[2]" :goods="goods" @click.native="goUrl" />
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import { getGoodsList } from "@/utils/goodsList.js";
import { getHomeFloor } from "@/utils/home.js";
import FloorItem from "./FloorItem";

export default {
  name: "Floor",
  components: { FloorItem },
  data() {
    return {
      active: 0,
      message: [],
      goods: [],
      cid: 927,
    };
  },
  methods: {
    async getHomeFloor() {
      let {
        data: { message },
      } = await getHomeFloor();
      this.message = message;
      // console.log(this.message);
    },

    goUrl() {
      this.$router.push("/goodsList?cid=927");
    },
    // beforeRouteUpdate() {
    //   this.getGoodsList();
    // },
    async getGoodsList() {
      if (this.active == 0) {
        this.cid = 927;
      } else if (this.active == 1) {
        this.cid = 1011;
      } else {
        this.cid = 1430;
      }
      let {
        data: {
          message: { goods },
        },
      } = await getGoodsList(this.cid);
      this.goods = goods;
    },
  },
  created() {
    this.getHomeFloor();
    this.getGoodsList();
  },
};
</script>

<style >
.floor {
  width: 100vw;
}
.van-tabs__nav--card {
  box-sizing: border-box;
  height: 30px;
  margin: 0px !important;
  border: 1px solid #ee0a24;
  border-radius: 2px;
}
</style>