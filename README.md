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
- 保持登入状态（用localStorage储存uid，不主动登出就永远保持登入）

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

## 用户验证及权限设置

在firebase的 `Authentication` 之下新建一个邮箱密码的登录账号，拿到 `uid`。

开发的时候设计一下用 `uid` 验证登录。

在firebase的 `firestore database`里面设置 `rule`

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid == ${uid};
    }
  }
}
```

储存规则之后，这个 uid 以外的用户都不能使用了。

为什么要限制仅允许一个 uid ？

因为我是开发给我自己用的，我希望即使别人拿到我的firebase credentials也用不了它。

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

# 导出账单并转移到APP

之前在别的地方记了半年的账，导出来csv一看，其实也才几百条。

在Excel或者WPS里面打开csv文件，将表头改成 `id` `DATE` `NAME` `NATURE` `CATEGORY` `ACC_OUT` `ACC_IN` `AMOUNT` `REMARK` `NOTES`，然后用公式自动生成 `BILL202307240101` 格式的 `id`，保存csv。

此时要注意，我的APP需要的日期格式是 `YYYY-MM-DD` ，但是Excel或者WPS有个坏习惯，就是在识别到日期的时候自动转成 `YYYY/M/D` 的格式，所以我们需要手动调整一下，改对了之后再保存。

然后在网上搜一个 `csv to json` 的工具，上传 `csv` 文件，拿到我们需要的 `json` 数据，此时不要保存成 `json`。为了方便使用，我们把它存成这样的 `bills.js` 文件。

```js
var bills = [{
  id: "BILL202307240101",
  DATE: "2023-07-24",
  NATURE: "支出",
  CATEGORY: "饮食",
  NAME: "晚饭",
  ACC_IN: "",
  ACC_OUT: "信用卡A",
  AMOUNT: 45.5,
  REMARK: "",
  NOTES: ""
}];
```

然后在同文件夹下新建一个 `app.html` 文件，内容如下

```html
<head>
  <meta charset="UTF-8">
</head>

<body>
  asdf
</body> 

<script src="./bills.js"></script>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getFirestore,doc,setDoc,collection  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "***",
    authDomain: "***.firebaseapp.com",
    projectId: "***",
    storageBucket: "***.appspot.com",
    messagingSenderId: "***",
    appId: "***"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


for (let i = 0; i < bills.length; i++) {
  addBill(bills[i]);
}

async function addBill(bill) {
  await setDoc(doc(db, `BOOK/${uid}/BILL`, bill.id), bill);
}
</script>
```

这是一个极简的导入账单的网页，直接在本机使用即可。

网页一打开就会开始上传账单，网页和浏览器控制台不显示结果，但是你可以到浏览器的开发者工具的“网络”标签页查看，等到上传任务不再增多，就说明上传完了。

这里有一个很重要的地方，那就是 `<head></head>` 里面一定要写明此html文档的文字编码

```html
<meta charset="UTF-8">
```

如果不写明是 `UTF-8` ，那么上传内容有中文的时候会变成乱码，而写了 `UTF-8` 就能上传正常的内容了。
