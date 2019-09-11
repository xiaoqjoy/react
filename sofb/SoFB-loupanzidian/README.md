本项目使用 [Create React App](https://github.com/facebook/create-react-app)创建，[Ant UI框架](https://ant.design/docs/react/introduce-cn)。

## 项目架构简介

* 后台系统多交互，选用React作为基础框架可控制每个组件是否重新渲染，保证性能。
* ant.design UI框架(组件功能完善)。
* 路由管理采用 [React-router V4](https://reacttraining.com/react-router/web/guides/quick-start)。
* 组件状态管理采用 Redux[English Document](https://redux.js.org/introduction/getting-started)[中文参考](https://www.redux.org.cn/) + Immutable.js[English Document](https://immutable-js.github.io/immutable-js/docs/#/)。
* 使用Styled-Components[English Documents](https://www.styled-components.com/docs) 编写组件样式。

## 关于Immutable使用
* 使用Immutable的目的是为了方便props的属性值为Object/Array时的深比较
* 如果要做比较的props属性值非Object、Array则不建议使用Immutable

## 开发注意事项
1. 如需对组件的表单数据做缓存，继承CacheComponent即可， 具体使用请看components/CacheComponent.js中注释说明
1. 使用AsyncComponent可以按需加载组件，使用方法：const _404 = AsyncComponent(() => import('../layouts/404'));

## Available Scripts

在项目目录下，可以运行以下命令：

### `npm start`

启动项目
打开浏览器访问[http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

打包项目到 build 目录
关于部署的更多详情[deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
