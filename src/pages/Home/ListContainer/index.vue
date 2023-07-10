<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList"></Carousel>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">通城快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li v-for="(item) in daliyHotInfo" :key="item.id"> 
                <span class="bold">{{item.Daily_title}}</span>  <a href="javascript:;">{{item.Daily_name}}</a> 
            </li>   
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item" v-for="(item,index) in icons" :key="index">
            <i class="list-item"></i>
            <span class="service-intro">{{item}}</span>
          </li>         
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListContainer",
  data() {
    return {
        icons:['话费','机票','电影票','游戏','彩票','加油站','酒店','火车票','众筹','理财','礼品卡','白条']
    }
  },

  mounted() {
    this.$store.dispatch("getBannerList");
    this.$store.dispatch('getDaliyHotList');
    //下面这种写法:存在问题,定时器事件,没有办法去预估
    //Swiper在使用的时候注意:new Swiper类的实例之前,轮播图结构DOM,必须要完整!!!
    /*   setTimeout(() => {
              //初始化Swiper类的实例
              //1:swiper插件,对外暴露一个Swiper构造函数
              //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
              //鼠标进入停止轮播
              mySwiper.el.onmouseover = function () {
                  mySwiper.autoplay.stop();
              };
              //鼠标离开开始轮播
              mySwiper.el.onmouseout = function () {
                  mySwiper.autoplay.start();
              };
          }, 2000); */
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.Home.bannerList,
      daliyHotInfo:(state)=> state.Home.daliyHotInfo,
    }),
  },
};
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;
   

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;
      

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {      
          padding: 5px 15px;
          line-height: 26px;
          
          .bold {
            display: inline-block;
            position: relative;
            font-size: 12px;
            height: 16px;
            width: 35px;
            line-height: 16px;
            text-align: center;
            vertical-align: 0;
            color: #e1251b;
            background-color: rgba(225, 37, 27, 0.08);
            margin-right: 6px;
          }
          a {
            margin-top: 5px;
            display: inline-block;
            width: 170px;        
            height: 18px;
            line-height: 25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          a:hover{
            color:red !important;
            text-decoration: none;
          }
        }
    }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>