# april-bill

An SPA app for personal bookkeeping purpose, static front-end page with serverless service from Firebase.

Frameworks used: Vue and Vite.

中文名称: 四方账单

使用的框架: Vue 和 Vite。

# base url

in `vite.config.js` file

```js
export default defineConfig({
  base: "/april-bill/"//project will be accessed at <username.github.io>/april-bill
})
```

# dev server

```
npm run dev
```

Hot reload is supported. 

The cmd console will display 2 urls, `localhost:3000` is for current dev computer to access server, `local IP:3000` is for other devices in the same wifi environment to access server.

# generate static site

```
npm run build
```

static site files are generated under `\dist` folder, you can deploy files to static server.

# preview static site

```
npm run serve
```

# 功能详情

## 用户验证

- 登入/登出
- 保持登入状态（用localStorage存的，不主动登出就永远保持登入）

## 加载账单

- 显示默认时间区间的账单（默认时间过去一个月，会根据月份横跨不同的天数）
- 筛选特定时间区间的账单（加载一次call一次API，翻页不call API）
- 显示账单流水汇总
- 设置每页显示条数
- 分页显示
- 在本页账单内搜索关键字

## 查看汇总

- 查看账户流水汇总
- 查看分类交易汇总

## 账户和分类设置

- 编辑账户名和类型（更新数据库，刷新选项）
- 编辑分类名和类型（更新数据库，刷新选项）

## 账单

- 新增空白账单
- 查看现有账单
- 更新现有账单（更新数据库，重新加载账单）
- 另存现有账单（更新数据库，重新加载账单）
- 删除现有账单（更新数据库，重新加载账单）
- 根据收入或支出性质来加载分类和账户的选项
- 新建/删除账单模板（更新数据库，重新加载模板）
- 应用账单模板

# 数据库和服务器

## serverless服务

本项目使用Firebase的Firestore，目前用量为 `spark` 套餐，暂不收费。

## 维护项目安全

项目的credentials保存在开发文件夹的 `.env` 文件中， `vite` 会自己读取。

```
VITE_apiKey = "***"
VITE_authDomain = "***.firebaseapp.com"
VITE_projectId = "***"
VITE_storageBucket = "***.appspot.com"
VITE_messagingSenderId = "***"
VITE_appId = "***"
```

`vite` 项目中调用

```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
```

然后在开发文件夹的 `.gitignore` 文件中新增一行 `.env` ，这样 `push` 到GitHub的时候就不会上传秘钥了。

## GitHub Actions自动部署

由于firebase的秘钥在电脑的环境变量里，自动部署的时候访问不到，这样就无法正确地生成静态文件并部署到静态服务器。

需要做的是进入GitHub的repo的settings页面，左侧菜单里找到`Secrets and Variables`，点开之后进入 `Actions` 的页面，新增五个 `repository secrets`，输入秘钥。

然后在GitHub Actions的 `workflows` 文件的 `jobs` 的详情里调用五个环境变量。

```yml
jobs:
  cd:
    runs-on: ${{ matrix.os }}
    env:
      VITE_apiKey : ${{ secrets.VITE_apiKey }}
      VITE_authDomain : ${{ secrets.VITE_authDomain }}
      VITE_projectId : ${{ secrets.VITE_projectId }}
      VITE_storageBucket : ${{ secrets.VITE_storageBucket }}
      VITE_messagingSenderId : ${{ secrets.VITE_messagingSenderId }}
      VITE_appId : ${{ secrets.VITE_appId }}
```

这样就可以自动部署静态文件，并正确地访问动态服务器了。

# bug fix

- 编辑并更新账户和分类之后，第一次查看现有账单，选项是新的，修改并保存之后，再查看别的账单，发现选项是旧的。（2023-07-22不知道改了哪里，现在无法复现了）
