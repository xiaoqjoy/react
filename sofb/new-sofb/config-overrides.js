const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        // 如需自定义主题 style: true
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    // 自定义 ant 主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#6595F4',
            '@link-color': '#6595F4',
            '@font-size-base': '12px',
            '@heading-color': '#535A75',
            '@text-color': '#475266',
            '@text-color-secondary': '#464B5B'
        }
    })
);
