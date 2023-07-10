<template>
    <!-- 猜你喜欢 -->
    <div class="like">
        <div class="py-container">
            <div class="title">
                <h3 class="fl">猜你喜欢</h3>
                <a @click="random1"  href="javascript:;" class="fr tip changeBnt">换一换</a>
            </div>
            <div class="bd">
                <ul class="favourate">
                    <li v-for="(item) in likesInfo" :key="item.id" v-show="item.id>=randoms&&item.id<randoms+4">
                        <img :src="item.imgUrl" alt="" />
                        <div class="like-text">
                            <p>{{item.introduce}}</p>
                            <h3>¥{{item.pri.toFixed(2)}}</h3>                         
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'Like',
    data() {
        return {
            num:1
        }
    },

    mounted() {
        this.$store.dispatch('getLikesList')
    },
    computed:{
        ...mapState({likesInfo:state=>state.Home.likesInfo}),
        randoms(){
            return parseInt(Math.random()*4+this.num)
        }
    },
    methods: {
        random1(){
            this.num++;
            
            this.num--;

        }
            
    },


}
</script>

<style scoped lang="less">
.like {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            overflow: hidden;

            .fl {
                float: left;
                font-size: 20px;
                line-height: 30px;
            }

            .fr {
                float: right;
                background-image: url(./images/icons.png);
                width: 66px;
                height: 25px;
                background-position: 182px -104px;
                line-height: 30px;
                font-size: 12px;
                font-weight: 400;
                color: #666;
                text-decoration: none;
            }
        }

        .bd {
            .favourate {
                border: 1px solid #e4e4e4;
                overflow: hidden;
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;
                

                li {
                    height: 250px;
                    margin: 0 -1px;
                    overflow: hidden;
                    background: #fff;
                    position: relative;
                    width: 25%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    overflow: hidden;

                    img {
                        width: 70%;
                        height: 70%;
                        transition: all 400ms;

                        &:hover {
                            opacity: 0.8;
                            transform: scale(1.1)
                        }
                    }

                    .like-text {
                        padding: 0;
                        width: 90%;
                        border-right: 1px solid #e4e4e4;

                        p {
                            margin: 5px 0;                                                   
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        h3 {
                            color: #df3033;
                            font-size: 20px;
                            line-height: 30px;
                            margin: 9px 0;
                            font-weight: 700;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>