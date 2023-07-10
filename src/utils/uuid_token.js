//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有这个随机字符串
    if (!uuid_token) {
        // 就生成一个，存储在本地
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token;
}