module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import '@/scss/_reset.scss';
          @import '@/scss/_variables.scss';
        `
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
}