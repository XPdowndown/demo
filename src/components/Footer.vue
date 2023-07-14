<template>
  <div>
    <div class="footer">
      <router-link
        class="footer-item"
        active-class="active"
        to="/home"
        @click.native="type = 'home'"
      >
        <div class="iconfont icon-shouye-shouye"></div>
        <div class="title">首页</div>
      </router-link>
      <router-link
        class="footer-item"
        active-class="active"
        to="/category"
        @click.native="type = 'category'"
      >
        <div
          class="iconfont"
          :class="type == 'category' ? 'icon-yingyongzhongxin' : 'icon-fenlei'"
        ></div>
        <div class="title">分类</div>
      </router-link>
      <router-link
        class="footer-item"
        active-class="active"
        to="/cart"
        @click.native="type = 'cart'"
      >
        <div
          class="iconfont"
          :class="type == 'cart' ? 'icon-gouwucheman' : 'icon-gouwuchekong'"
        ></div>
        <div class="title">购物车</div>
      </router-link>
      <router-link
        class="footer-item"
        active-class="active"
        to="/profile"
        @click.native="type = 'profile'"
      >
        <div class="iconfont icon-my"></div>
        <div class="title">我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      type: "home",
    };
  },
  created() {
    this.type = this.$route.path.slice(1);
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 49px;
  display: flex;
  position: fixed;
  top: calc(100vh - 49px);
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 12px 0 rgb(0, 0, 0, 0.1);
  background-color: #f6f6f6;
  z-index: 888;
}
.footer-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #f6f6f6;
  color: #000;
}
.active {
  color: red;
}
.footer-item .iconfont {
  flex: 1.5;
  font-size: 24px;
  margin: 4px 0;
}
.footer-item .title {
  flex: 1;
  font-size: 14px;
}
</style>