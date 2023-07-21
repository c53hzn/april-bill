# april-bill
An SPA app for personal bookkeeping purpose, static front-end page with serverless service from Firebase.

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

Hot reload is supported. The cmd console will display 2 urls, `localhost:port` is for current dev computer to access server, `your IP:port` is for other devices in same wifi environment to access server.

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
- 保持登入状态

## 加载账单

- 显示默认时间区间的账单
- 筛选特定时间区间的账单
- 显示账单流水汇总
- 设置每页显示条数
- 分页显示
- 在本页账单内搜索关键字

## 查看汇总

- 查看账户流水汇总
- 查看分类交易汇总

## 账户和分类设置

- 编辑账户名和类型
- 编辑分类名和类型

## 账单

- 新增空白账单
- 另存现有账单
- 删除现有账单
- 更新现有账单
- 查看现有账单
- 新建账单模板
- 应用账单模板
