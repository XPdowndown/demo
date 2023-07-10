const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  /*  devServer: {
     proxy: {
       "/api": {
         target: "http://gmall-h5-api.atguigu.cn",
         changeOrigin: true,
       },
     },
   }, */
})
