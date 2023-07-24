# april-bill intro

An SPA app for personal bookkeeping purpose, static front-end page with serverless service from Firebase.

Frameworks used: Vue and Vite.

中文名称: 四方账单

使用的框架: Vue 和 Vite。

## base url

in `vite.config.js` file

```js
export default defineConfig({
  base: "/april-bill/"//project will be accessed at <username.github.io>/april-bill
})
```

## dev server

```
npm run dev
```

Hot reload is supported. 

The cmd console will display 2 urls, `localhost:3000` is for current dev computer to access server, `local IP:3000` is for other devices in the same wifi environment to access server.

## generate static site

```
npm run build
```

static site files are generated under `\dist` folder, you can deploy files to static server.

## preview static site

```
npm run serve
```

# 功能详情

## 用户验证

- 登入/登出
- 保持登入状态（用localStorage存的，不主动登出就永远保持登入）

## 加载账单

- 显示默认时间区间的账单（默认时间过去一个月，会根据月份横跨不同的天数）
- 设置每页显示条数
- 筛选特定时间区间的账单（加载一次call一次API）
- 显示交易汇总（加载一次计算一次）
- 分页显示（翻页不call API）
- 在本页账单内搜索关键字（搜索不call API）

## 查看汇总

- 查看账户流水汇总
- 查看分类交易汇总

## 账户和分类设置

- 编辑账户名和类型（更新数据库，刷新选项）
- 编辑分类名和类型（更新数据库，刷新选项）

## 账单

- 新增空白账单（更新数据库，重新加载账单）
- 根据收入或支出性质来加载分类和账户的选项
- 查看现有账单
- 更新现有账单（更新数据库，重新加载账单）
- 另存现有账单（更新数据库，重新加载账单）
- 删除现有账单（更新数据库，重新加载账单）
- 新建/删除账单模板（更新数据库，重新加载模板）
- 应用账单模板

# 系统界面UI

## 登录页面

![image](https://github.com/c53hzn/april-bill/assets/30020736/af379cb0-54bb-4e5f-8fef-a17e74d5c4bb)

## 登入后页面

![image](https://github.com/c53hzn/april-bill/assets/30020736/731d4181-d0f4-466f-93fa-fd1df54e32f5)

## 编辑账户选项

![image](https://github.com/c53hzn/april-bill/assets/30020736/5e5a6362-c564-4c22-a6c1-703126f5784d)

## 编辑分类选项

![image](https://github.com/c53hzn/april-bill/assets/30020736/53d0ce30-63b1-4a84-8db4-90fdd87ca035)

## 新增/修改/查看账单

![image](https://github.com/c53hzn/april-bill/assets/30020736/b0c10081-7dbb-4b57-b79b-7d0ac7214682)

## 新增/修改/应用账单模板

![image](https://github.com/c53hzn/april-bill/assets/30020736/b5762682-f9a4-47b9-8606-fb48d4e22bfc)

## 查看账户交易汇总

![image](https://github.com/c53hzn/april-bill/assets/30020736/404612cd-9cbf-45f1-8534-14ac92854987)

## 查看分类交易汇总

![image](https://github.com/c53hzn/april-bill/assets/30020736/8ab78426-0738-486e-8fe8-4f849c3083f3)

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

需要做的是进入GitHub的repo的settings页面，左侧菜单里找到`Secrets and Variables`，点开之后进入 `Actions` 的页面，新建一个secret变量，变量名可以叫 `ENV_FILE`，变量内容输入 `.env` 文件里的内容

```
VITE_apiKey = "***"
VITE_authDomain = "***.firebaseapp.com"
VITE_projectId = "***"
VITE_storageBucket = "***.appspot.com"
VITE_messagingSenderId = "***"
VITE_appId = "***"
```

然后在工作流程文件的 `steps` 当中新增一步

```yml
jobs:
  my_job:
    steps:
    - name: Create .env file
      run: echo "${{ secrets.ENV_FILE }}" > .env
```

这样会在 `workflow` 的部署环境下新建一个 `.env` 文件，那么在后面的步骤中，工程文件就能访问到 `.env` 里面的环境变量了。