<!-- PROJECT LOGO -->
<p align="center">
  <a href="">
    <img src="https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/public/assets/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Walnut Admin</h1>
  <p align="center">
    面向开发者的中后台管理系统模板
    <br />
    <a target="_blank" href="https://walnut-admin-doc.netlify.app/"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a target="_blank" href="https://www.walnut-admin.com">查看Demo</a>
    ·
    <a target="_blank" href="https://github.com/Zhaocl1997/walnut-admin-client/issues">报告Bug</a>
    ·
    <a target="_blank" href="https://github.com/Zhaocl1997/walnut-admin-client/issues">提出新特性</a>
  </p>

</p>

## 序言

Walnut Admin, 一个开源的、持续优化的中后台管理系统模板。重点是前台，后台和数据库有点规模，但是不成体系。现仍在开发阶段中。技术栈使用了 `Vue3`, `NaiveUI`, `Vite3`, `TypeScript`, `VueUse`, `pnpm`, `unocss` 等, 用于学习和交流！

项目跑起来需要[后台][walnut-admin-server]（**后端仓库暂时私有，后期会开放的**），是 [NestJS][nestjs-url] 的一个单体应用的架子。数据库用的 [MongoDB](https://www.mongodb.com/)。更多信息可查看文档。

## Discord

[点击这里](https://discord.gg/kfVuasVXs2)

## TODOS  

- [ ] 999 查看[issue](https://github.com/vuejs/vue-router-next/issues/626)。嵌套路由的keep-alive有问题，为了暂时让keep-alive好使，就把路由扁平化了。但是左侧menu和头部的breadcrumb需要做相应的变动（路由不再是树状结构，但在左侧菜单和面包屑的位置逻辑还是原来树状的逻辑）

- [ ] 888 查看[issue](https://github.com/vuejs/core/issues/4294)。项目中组件的props的类型定义都在vue的文件的外部，引入并使用到defineProps上会导致编译错误，暂时为了解决问题，都在组件内部又重新定义了一遍props的类型，后续支持了就可以从外部文件引入类型了。

- [ ] 99 tsx + setup + auto-import 打包后会出问题，暂时需要显式引入 [issue](https://github.com/antfu/unplugin-auto-import/issues/75)

- [ ] vue-tsc 错误全部消除  
- [ ] layout 扩展 
- [ ] 主题扩展
- [x] 打包优化+自动化部署
- [x] 后台自定义code
- [x] 后台入参校验
- [x] 登录日志/操作日志
- [x] 第三方认证
- [ ] 找回密码
- [ ] 接口错误模拟 demo
- [ ] 页面中的错误模拟 demo
- [x] 权限模块开发
- [x] case police
- [ ] rrweb
- [x] hover css
- [ ] pdf/word/excel/print.js plugin
- [ ] error monitor (femonitor-web)
- [ ] untyper
- [ ] closure-compiler (hard to do)
- [ ] markdown (vditor)
- [ ] fullcalendar
- [x] tab样式重做
- [x] 劫持F5事件
- [ ] 菜单 自定义动画/记住滚动位置/页面离开提示(路由和全局)
- [ ] 拆分面板 splitpanes
- [ ] 强退在线用户 没想好怎么做
- [ ] 动态设置tab的名称，图标，badge, 进入之前的路由钩子处理
- [x] 输入框的定制插槽 - 复制
- [ ] 手机号组件，邮箱填充组件，身份证组件
- [ ] 搜索组件
- [x] ~~颜色组件，配合放大镜~~ naive的show-preview支持
- [ ] vue3-mindmap

vueuse 的 useHead 或许可以实现第三方插件的cdn使用方式

## 更新日志

请阅读[CHANGELOG.md](./CHANGELOG.md) 查阅为该项目的更新日志。

## 项目架构

请阅读[ARCHITECTURE.md](./ARCHITECTURE.md) 查阅为该项目的架构。


## 作者

[zhaocl1997][author-url]

## 版权说明

该项目签署了 MIT 授权许可，详情请参阅 [LICENSE][license-url]

<!-- links -->

[author-url]: https://github.com/Zhaocl1997
[walnut-admin-client]: https://github.com/Zhaocl1997/walnut-admin-client
[walnut-admin-server]: https://github.com/Zhaocl1997/walnut-admin-server
[license-url]: https://github.com/Zhaocl1997/walnut-admin-client/blob/main/LICENSE

[nestjs-url]: https://docs.nestjs.com/
