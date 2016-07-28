# react-router-redux
```
react
```

### WebStrom 开发环境配置
1. 确定启用node环境 Language & FrameWorks -> Node And Npm -> Node Core Library enable 为 `enable`
2. Javascript Version 为 `JSX Harmony`
3. Javascript -> Libray -> ECMAScript 6 勾选
4. 启用ESLint代码质量及代码风格检查 Javascript -> Code Qutity tool -> Eslint
   配置文件使用项目列表中".eslintrc",上传代码时不允许有任何error
5. 使用2个空格替换Tab符 Code Style -> JavaScript -> Tab and Indents
6. 每个文件必须有文件头,注明文件名(类名),作者,创建日期,文件描述等信息, Editor->File and Code Templates -> JavaScript File


### 编译流程
```
1.安装nodejs环境：https://nodejs.org/en/
2.打开cmd命令，移动到项目目录
3.执行cmd命令安装依赖模块： npm install 
4.运行开发环境：npm start
  产品包:      npm run build
  切换两种环境时需要修改"server.js"(根据文件内注释)
5.浏览器访问：http://localhost:3000/
（注：首次使用webpack请先执行：npm install -g webpack）
```

#### 第三方模块

| 模块   |      说明
|----------|:-------------:|
| [react-weui](https://github.com/weui/react-weui) | 由微信官方设计团队为微信 Web 开发量身设计
| [react-virtualized](https://github.com/bvaughn/react-virtualized) | 包含很多非常棒的容器类组件比如VirtualScroll,Grid等
| [flex-css-layout](https://github.com/1340641314/flex-css-layout) | 弹性盒布局