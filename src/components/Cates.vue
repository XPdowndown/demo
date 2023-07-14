<template>
  <div class="cates">
    <div class="body">
      <div class="left">
        <div class="left-item">
          <!-- 左盒子 -->
          <div
            class="left-title"
            v-for="(title, index) in cateLeftName"
            :key="index"
            :class="{ active: Active == index }"
            @click="isActive(index)"
          >
            {{ title }}
          </div>
        </div>
      </div>
      <!-- 右盒子 -->
      <div class="right">
        <div
          class="wrap"
          v-for="(content, index) in cateRightContent"
          :key="index"
        >
          <div class="title">
            {{ content.cat_name }}
          </div>
          <div class="content">
            <!-- 如果没有children,则显示 -->
            <div
              class="content-img"
              v-if="!content.children"
              @click="goGoodsListErr"
            >
              <img
                :src="
                  content.cat_icon != '/full/none.jpg' ? content.cat_icon : img
                "
              />
              <div>{{ content.cat_name }}</div>
            </div>
            <!-- 遍历content.children -->
            <div
              class="title-item"
              v-for="(item, index) in content.children"
              :key="index"
              @click="goGoodsList(item.cat_id)"
            >
              <div class="img">
                <img :src="item.cat_icon" />
              </div>
              <div class="name">{{ item.cat_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCategories } from '@/utils/category.js'


  export default {
    name: 'Cates',
    data() {
      return {
        message: {},
        cateLeftName: [],
        Active: 0,
        cateRightContent: [],
        img: require('@/assets/img/err01.jpg')
      }
    },
    methods: {
      //请求left-title数据
      async getCategories() {
        let { data: { message } } = await getCategories()
        //保存请求过来的message的值
        this.message = message
        //将left-title数据里的cat_name存放在一个数组中，方便遍历
        message.forEach(value => this.cateLeftName.push(value.cat_name)
        );
        //给右边盒子存放数据，默认显示数组第一个
        this.cateRightContent = message[0].children
      },

      //动态绑定active，同时切换展示内容
      isActive(index) {
        this.Active = index
        //切换右盒子的内容
        this.cateRightContent = this.message[index].children
      },

      //点击前往goodsList路由,携带query参数
      goGoodsList(cid) {
        this.$router.push({ path: '/goodsList', query: { cid } })
      },

      //点击跳转 错误界面
      goGoodsListErr() {
        this.$router.push('/err')
      }
    },
    created() {
      this.getCategories()
    },
  }
</script>

<style scoped>
  .cates {
    /* 计算宽度，减去头尾和搜索栏 */
    height: calc(100vh - 138px);
  }
  .body {
    display: flex;
    height: 100%;
  }

  /* 左盒子 */
  .body .left {
    flex: 2;
    overflow-y: scroll;
    height: 100%;
    border-right: 1px solid #e7e7e7;
  }
  .left::-webkit-scrollbar {
    display: none;
  }
  .body .left .left-title {
    position: relative;
    height: 40px;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
  }
  .body .left .active {
    color: #eb4450;
  }
  .body .left .active::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 2px solid #eb4450;
  }

  /* 右盒子 */
  .body .right {
    flex: 5;
    overflow-y: scroll;
    height: 100%;
    text-align: center;
  }
  .right::-webkit-scrollbar {
    display: none;
  }
  .right .title {
    box-sizing: border-box;
    width: 100%;
    padding: 15px 0 5px 0;
    font-weight: 800;
  }
  .right .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .content .content-img {
    width: 33%;
  }
  .content .content-img img {
    width: 60%;
  }
  .content .content-img div {
    font-size: 14px;
  }
  .content .title-item {
    box-sizing: border-box;
    width: 33%;
    padding: 5px;
  }
  .title-item .img {
    width: 100%;
  }
  .title-item .img img {
    width: 60%;
  }
  .title-item .name {
    font-size: 14px;
  }
</style>