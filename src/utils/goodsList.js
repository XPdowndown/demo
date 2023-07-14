import { request } from './request'

//获取goodsList数据
export function getGoodsList(cid) {
    return request({
        url: 'goods/search',
        params: {
            cid
        }
    })
}