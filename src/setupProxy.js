// const proxy = require('http-proxy-middleware') 适合react17版本
const { createProxyMiddleware } = require('http-proxy-middleware')
//"proxy":"http://localhost:5000" 在package.json中配置，但是只能有转发一个服务
module.exports = function (app) {
	app.use(
		createProxyMiddleware('/api1', { //遇见/api1前缀的请求，就会触发该代理配置
			target: 'http://localhost:5000', //请求转发给谁
			changeOrigin: true,//控制服务器收到的请求头中Host的值
			pathRewrite: { '^/api1': '' } //重写请求路径(必须)
		}),

	)
}