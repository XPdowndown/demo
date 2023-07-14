import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
    let instance = axios.create({
        baseURL: "https://api-hmugo-web.itheima.net/api/public/v1",
        timeout: 10000
    })

    instance.interceptors.request.use(config => {
        NProgress.start()
        return config
    }, err => {
        NProgress.done()
        return err
    })

    instance.interceptors.response.use(res => {
        NProgress.done()
        return res
    }, err => {
        NProgress.done()
        return err
    })

    return instance(config)
}