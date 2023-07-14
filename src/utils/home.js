import { request } from './request'

//获取轮播图
export function getBanner() {
    return request({
        url: 'home/swiperdata',
        params: {

        }
    })
}
//获取home-nav数据
export function getHomeNav() {
    return request({
        url: 'home/catitems',
        params: {

        }
    })
}
//获取floor数据
export function getHomeFloor() {
    return request({
        url: 'home/floordata',
        params: {

        }
    })
}
