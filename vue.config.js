const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const {VueLoaderPlugin} = require("vue-loader");
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      },
    }
  },
  // css: {
  //   loaderOptions: {
  //     // sass: {
  //     //   sassOptions: {
  //     //     // data: `@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";`,
  //     //   },
  //     //   // Preload vuestic-ui variables and mixins for every component
  //     //   data: `@import "~vuestic-ui/src/components/vuestic-sass/resources/resources.scss";`,
  //     // },
  //   },
  // },
  assetsDir: "./assets",
})
