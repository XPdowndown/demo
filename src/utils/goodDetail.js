import { request } from './request'

//获取goodDetail数据
export function getGoodDetail(goods_id) {
    return request({
        url: 'goods/detail',
        params: {
            goods_id
        }
    })
}