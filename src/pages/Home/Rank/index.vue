<template>
    <!-- 商品排行 -->
    <div class="rank">
        <div class="tab">
            <div class="tab-tit clearfix">
                <a href="javascript:;" class="on" v-for="(item,index) in ranks" :key="index">
                    <p class="img">
                        <i></i>
                    </p>
                    <p class="text">{{item}}</p>
                </a>
                
            </div>

        </div>
        <div class="content">
            <ul>
                <li>
                    <div class="img-item" v-for="(item) in goodsInfo" :key="item.goods_id">
                        <p class="tab-pic">
                            <a href="#">
                                <img :src="item.goods_pic" />
                            </a>
                        </p>
                        <div class="tab-info">
                            <div class="info-title">
                                <a href="#">{{item.goods_name}}</a>
                            </div>
                            <p class="info-price">价格：¥{{item.goods_pri.toFixed(2)}}</p>
                        </div>
                    </div>
       
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    
    name: 'Rank',
    data() {
        return {
              ranks:['热卖排行','特价排行','新品排行']
        }
    },
    created() {
        this.$store.dispatch('getGoodsInfo');
    },
    mounted() {
         this.$store.dispatch('getGoodsInfo');
         
        
    },
    computed:{
        ...mapState({goodsInfo:state=>state.Home.goodsInfo})
    }

}
</script>

<style scoped lang="less">
.rank {
    width: 1200px;
    margin: 0 auto;

    .tab {
        margin: 0 auto;
        overflow: hidden;
        width: 312px;

        .tab-tit {
            text-align: center;

            a {
                display: block;
                padding: 0 18px;
                float: left;
                text-decoration: none;
                font-size: 16px;
                color: #999;

                p {
                    margin: 5px 0;
                }

                .img {
                    i {
                        width: 35px;
                        height: 35px;
                        display: block;
                        background: url(./images/bg0.png);
                        margin-left: 10px;
                    }
                }

                .text {
                    line-height: 28px;
                }
            }

            .on {
                color: #e60012;

                .img {
                    i {
                        background-position: -35px 0;
                    }
                }
            }
        }
    }

    .content {
        overflow: hidden;
        padding: 10px;

        ul {
            li {
                overflow: hidden;
                list-style: none;
                line-height: 18px;

                .img-item {
                    border: 1px solid whitesmoke;
                    width: 269px;
                    float: left;
                    overflow: hidden;
                    margin: 0 12px 10px;
                    border-radius: 10px;
                    background: #fff;

                    .tab-pic {
                        width: 230px;
                        height: 210px;
                        overflow: hidden;
                        text-align: center;
                        margin: 5px auto 18px;

                        a {
                            img {
                                width: 200px;
                                height: 200px;
                                transition: all 400ms;
                            }
                            

                        &:hover {
                            opacity: 0.8;
                            transform: scale(1.1)
                        }
                        }
                    }

                    .tab-info {
                        background: #fafafa;

                        .info-title {
                            height: 50px;
                            line-height: 50px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin: 0 auto;
                            padding-left: 10px;

                            a {
                                color: #333;
                                text-decoration: none;
                                font-size: 13px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                text-indent: 2rem;
                            }
                        }

                        .info-price {
                            font-size: 20px;
                            color: #e1251b;
                            height: 35px;
                            padding-left: 10px;
                            display: block;
                            line-height: 24px;
                            margin: 10px auto 0;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>