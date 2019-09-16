const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    // 如需自定义主题 style: true
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    // style: true,
  }),
  // 自定义 ant 主题
  // addLessLoader({
  //   javascriptEnabled: true,
  //   modifyVars: { '@primary-color': '#C40000' },
  // }),
);