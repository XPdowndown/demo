<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a v-for="(item, index) in navs" :key="index" href="###">{{ item }}</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!--三级联动 一级分类 -->
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex == index }" v-show="!(c1.categoryName=='汽车用品') &&!(c1.categoryName=='运动健康')">
              <h3>
                <a @mouseenter="changeIndex(index)" :data-CategoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二三级分类 -->
              <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-CategoryName="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-CategoryName="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入 节流
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
      navs: ["服装城", "美妆馆", "通城超市", "全球购", "闪购", "团购", "有趣", "秒杀"],
    };
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // ...mapState('Home', ['categoryList']),
    ...mapState({
      //对象写法,对象的K,给VC新增的属性
      //新增的属性erha,右侧属性值为箭头函数返回的结果。作为新增属性的属性值
      //箭头函数执行，注入一个参数state->大仓库【包含小仓库】
      categoryList: (state) => state.Home.categoryList, //对象简写形式
    }),
  },

  methods: {
    // 点击三级导航中的链接时，进行跳转
    goSearch(e) {
      // this.$router.push('/search');
      let element = e.target; // 获取触发此事件的元素节点对象
      let { categoryname, category1id, category2id, category3id } =
        element.dataset; // 节点对象上有一个dataset属性，通过此属性，可以获得此元素对象的自定义属性
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // this.$router.push({...location,...query})
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
    //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
    //函数的防抖与节流技术
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") this.show = false;
    },
    enterShow() {
      if (this.$route.path != "/home") this.show = true;
    },
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /*  &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
        }

        .cur {
          background-color: skyblue;
        }

        /*    .item:hover {
                    background-color: skyblue;
                } */
      }
    }

    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }

    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.25s linear;
    }

    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
  }
}
</style>
