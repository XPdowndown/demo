<template>
  <div class="floor-item">
    <div class="title">
      <img :src="message.floor_title.image_src" alt="" />
    </div>
    <div class="body">
      <div class="left">
        <img :src="message.product_list[0].image_src" alt="" />
      </div>
      <div class="right">
        <div class="img">
          <img :src="message.product_list[1].image_src" alt="" />
        </div>
        <div class="img">
          <img :src="message.product_list[2].image_src" alt="" />
        </div>
        <div class="img">
          <img :src="message.product_list[3].image_src" alt="" />
        </div>
        <div class="img">
          <img :src="message.product_list[4].image_src" alt="" />
        </div>
      </div>
    </div>
    <div>
      <img
        style="width: 33%; height: 33%"
        :src="
          item.goods_small_logo
            ? item.goods_small_logo
            : goods[0].goods_small_logo
        "
        alt=""
        v-for="item in goods"
        :key="item.goods_id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FloorItem",
  data() {
    return {};
  },
  props: ["message", "goods"],
  mounted() {
    console.log(this.message);
  },
};
</script>

<style scoped>
.floor-item {
  width: 100%;
}
.floor-item img {
  width: 100%;
  height: 100%;
}
.body {
  display: flex;
}
.title {
  padding: 5px 0 0 0;
}
.left {
  flex: 1;
}
.right {
  flex: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.right .img {
  margin: 0 5px;
  flex: 40%;
}
.right .img:nth-child(-n + 2) {
  margin-bottom: 5px;
}
.right .img img {
  width: 100%;
}
</style>