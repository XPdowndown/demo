<template>
  <div id="cart">
    <Header>
      <template slot="left">
        <div class="left" @click="goBack">
          <i class="iconfont icon-shangyiyehoutuifanhui"></i>
        </div>
      </template>
      <template slot="center">
        <div class="center">购物车</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <AddressList />
    <div class="carts">
      <div class="item" v-for="(item, index) in cart" :key="index">
        <div class="checked">
          <van-checkbox
            v-model="item.checked"
            @click="changeChecked(index)"
          ></van-checkbox>
        </div>
        <van-swipe-cell>
          <van-card
            :num="item.num"
            :price="item.goods_price"
            :title="item.goods_name"
            :thumb="item.goods_small_logo ? item.goods_small_logo : img"
            @click-thumb="goGoodDetail(item.goods_id)"
          >
            <template #footer>
              <van-button
                :disabled="item.num > 1 ? false : true"
                size="mini"
                @click="changeNum(index, -1)"
              >
                <van-icon name="minus" />
              </van-button>
              <van-button size="mini" @click="changeNum(index, 1)">
                <van-icon name="plus" />
              </van-button>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              class="delete-button"
              @click="removeItem(index)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div class="all">
        <van-submit-bar
          :price="price"
          button-text="提交订单"
          @submit="onSubmit"
        >
          <van-checkbox v-model="checkedAll" @click="changeCheckedAll">
            <!-- 全选 -->
          </van-checkbox>
        </van-submit-bar>
      </div>
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
    <!-- 购物车空状态 -->
    <div class="empty">
      <van-empty
        class="custom-image"
        :image="cartKong"
        description="购物车空空荡荡"
        v-if="!cart.length"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
/*  */
import Header from "@/components/Header";
import AddressList from "@/components/AddressList";
import Footer from "@/components/Footer";
// import { Dialog } from "vant";

export default {
  name: "Cart",
  components: { Header, AddressList, Footer },
  // components: { Footer },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
      checkedAll: false,
      cartKong: require("@/assets/img/cartKong.gif"),
      img: require("@/assets/img/err01.jpg"),
      myImg: require("@/assets/img/微信图片_二维码.jpg"),
      dialogShow: false,
    };
  },
  computed: {
    price() {
      let arr = [];
      this.cart.forEach((val) => {
        if (val.checked) arr.push(val.goods_price * val.num);
      });
      return (eval(arr.join("+")) ? eval(arr.join("+")) : 0) * 100; //纯数字数组所有元素快速相加 （price的单位是分 所有要*100）
    },
  },
  methods: {
    //返回上一页
    goBack() {
      this.$router.back();
    },

    goGoodDetail(goods_id) {
      this.$router.push({ path: "/gooddetail", query: { goods_id } });
    },

    //点击切换本地存储里的商品checked
    changeChecked() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.isCheckedAll();
    },

    //点击改变商品数量num
    changeNum(index, num) {
      this.cart[index].num += num;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    //判断是否为全选状态
    isCheckedAll() {
      if (this.cart.some((val) => val.checked == false)) {
        this.checkedAll = false;
      } else {
        this.checkedAll = true;
      }
    },

    //改变全选状态
    changeCheckedAll() {
      if (this.checkedAll == true) {
        this.cart.forEach((val) => (val.checked = true));
      } else {
        this.cart.forEach((val) => (val.checked = false));
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    //删除购物车
    removeItem(index) {
      console.log(index);
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    //点击结算
    onSubmit() {
      this.dialogShow = true;
    },
  },
  created() {
    this.isCheckedAll();
  },
};
</script>

<style scoped>
#cart {
  width: 100%;
}
.carts {
  margin-bottom: 100px;
}
.van-submit-bar {
  bottom: 49px;
}
.item {
  position: relative;
}
.item .checked {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 100%;
  background-color: #fafafa;
  z-index: 9;
}
.checked /deep/ .van-checkbox {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
}
.item .van-card {
  padding: 8px 16px 8px 40px;
}

/* vant 插件样式修改 */
.van-swipe-cell {
  margin-bottom: 8px;
}
.delete-button {
  height: 100%;
}
.van-card__price div {
  color: #fafafa;
}
.van-card__price div span {
  font-size: 16px;
  color: red;
}

.empty /deep/ .van-empty__image {
  width: 100%;
  height: 100%;
}

/* 结算 */
.dialog img {
  width: 100%;
}
</style>