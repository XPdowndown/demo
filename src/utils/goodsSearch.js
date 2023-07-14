import { request } from './request'

//获取goodDetail数据
export function getGoodsSearch(query) {
    return request({
        url: '/goods/qsearch',
        params: {
            query
        }
    })
}