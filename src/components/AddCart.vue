<template>
  <div class="add-cart">
    <!-- 加入购物车模块 -->
    <div class="buy">
      <van-goods-action>
        <van-goods-action-icon
          :icon="
            this.$store.state.ShouCang.includes(message.goods_id)
              ? 'star'
              : 'star-o'
          "
          :text="
            this.$store.state.ShouCang.includes(message.goods_id)
              ? '已收藏'
              : '收藏'
          "
          color="#ff5000"
          @click="
            addShouCang(message.goods_id);
            addShouCangMessage(message.goods_id);
          "
        />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart()" />
        <van-goods-action-icon
          icon="share-o"
          text="分享"
          @click="showShare = true"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addCart"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onSubmit"
        />
      </van-goods-action>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>
    <!-- 结算弹窗 -->
    <van-dialog
      class="dialog"
      v-model="dialogShow"
      title="结算中"
      show-cancel-button
    >
      <img :src="myImg" />
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "AddCart",
  data() {
    return {
      dialogShow: false,
      myImg: require("@/assets/img/微信图片_二维码.jpg"),
      ShouCangMessage: JSON.parse(localStorage.getItem("ShouCangMessage"))
        ? JSON.parse(localStorage.getItem("ShouCangMessage"))
        : [],
      // vant组件分享功能数据
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  props: ["message"],
  methods: {
    // 添加购物车功能
    addCart() {
      let cartVal = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      if (!cartVal.some((val) => val.goods_id == this.message.goods_id)) {
        this.message.num = 1;
        this.message.checked = true;
        cartVal.push(this.message);
      } else {
        cartVal.forEach((val) => {
          if (val.goods_id == this.message.goods_id) {
            val.num++;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartVal));
      Toast.success("加入成功");
    },

    // 添加/取消 收藏
    addShouCang(goods_id) {
      console.log(this.$store.state.ShouCang.includes(goods_id));
      if (this.$store.state.ShouCang.includes(goods_id)) {
        this.$store.commit("deleteShouCang", goods_id);
      } else {
        this.$store.commit("addShouCang", goods_id);
      }
    },

    addShouCangMessage(goods_id) {
      if (!this.ShouCangMessage.some((val) => val.goods_id == goods_id)) {
        this.ShouCangMessage.push(this.message);
      } else {
        this.ShouCangMessage = this.ShouCangMessage.filter(
          (val) => val.goods_id !== goods_id
        );
      }
      localStorage.setItem(
        "ShouCangMessage",
        JSON.stringify(this.ShouCangMessage)
      );
    },

    //前往购物车
    goCart() {
      this.$router.push("/cart");
    },

    //点击结算
    onSubmit() {
      this.dialogShow = true;
    },

    //vant分享功能
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style>
/* 结算 */
.dialog img {
  width: 100%;
}
</style>