import { request } from './request'

//获取categories数据
export function getCategories() {
    return request({
        url: '/categories',
        params: {

        }
    })
}