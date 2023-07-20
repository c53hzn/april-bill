<template>
  <div id="app">
    <div v-if="isLoggedin" class="main-container">
      <div class="loadbill-setting">
        <h3>筛选条件</h3>
        <div class="loadbill-set-unit">
          开始时间
          <DatePickerUnit
            @dateChanged="changeFilterStartDate"
            :startYear="startYear"
            :endYear="endYear"
            :year="filter.startDate.year"
            :month="filter.startDate.month"
            :day="filter.startDate.day"
          ></DatePickerUnit>
          结束时间
          <DatePickerUnit
            @dateChanged="changeFilterEndDate"
            :startYear="startYear"
            :endYear="endYear"
            :year="filter.endDate.year"
            :month="filter.endDate.month"
            :day="filter.endDate.day"
          ></DatePickerUnit>
        </div>
        <div class="loadbill-set-unit">
          每页条数
          <select v-model.number="perPageSelected">
            <option v-for="(option, i) in perPageOption" :key="i">
              {{ option }}
            </option>
          </select>
          <span>&nbsp;</span>
          <button @click="loadNewBill(1)">加载账单</button>
        </div>
        <button @click="logout" style="position: absolute; top: 10px; right: 10px">登出</button>
      </div>
      <hr />
      <div style="margin-bottom: 10px">
        <button @click="showSumAcc">查看账户汇总</button>
        <button @click="showSumCat">查看分类汇总</button>
      </div>
      <div style="position: relative; text-align: left">
        <span class="sum-up">
          支出: &nbsp;
          <span class="txt-red">
            {{ expenseTotal }}
          </span>
        </span>
        <br />
        <span class="sum-up">
          收入: &nbsp;
          <span class="txt-green">
            {{ incomeTotal }}
          </span>
        </span>
        <br />
        <span class="sum-up">
          结余: &nbsp;
          <span :class="getReserveClass(reserveTotal.val)">
            {{ reserveTotal.text }}
          </span>
        </span>
        <div style="position: absolute; right: 0px; bottom: 2px; text-align: right">
          <button @click="showAccDetail">编辑账户</button>
          <br />
          <button @click="showCatDetail">编辑分类</button>
          <br />
          <button @click="showBillDetail(-1)">新增账单</button>
        </div>
      </div>
      <div style="margin-bottom: 10px">
        共{{ pageNumOption[pageNumOption.length - 1] }}页, 共{{
          bills.length
        }}条记录
      </div>
      <div class="pagenation-container">
        <div>
          <span class="page-item" :class="prevNext.prevStyle" @click="goToPrev">
            «
          </span>
          <select
            style="margin-top: -1; min-width: 50px; height: 24px; text-align: center"
            @change="loadBill"
            v-model.number="curPage"
          >
            <option v-for="(option, i) in pageNumOption" :key="i">
              {{ option }}
            </option>
          </select>
          <span class="page-item" :class="prevNext.nextStyle" @click="goToNext">
            »
          </span>
        </div>
      </div>
      <div style="position: relative; margin: 10px auto; width: 230px">
        在此页搜索
        <input
          placeholder="输入关键字..."
          style="width: 134px; height: 34px; font-size: 16px; border-radius: 6px"
          @input="searchWithinPage"
          v-model="searchKW"
          type="text"
        />
        <div
          class="close-btn"
          :class="{ hide: !searchKW }"
          @click="clearSearch"
          style="top: -7px; font-size: 30px; right: 10px"
        >
          ×
        </div>
      </div>
      <div class="bills">
        <table class="table table-striped">
          <thead>
            <th>操作</th>
            <th style="min-width: 100px;">日期</th>
            <th>事项</th>
            <th>分类</th>
            <th style="min-width: 150px;">账户</th>
            <th>金额</th>
          </thead>
          <tbody class="table-group-divider">
            <tr
              :class="searchResultClass[idx]"
              v-for="(bill, idx) in curPageBills"
              :key="bill.id"
            >
              <td>
                <span class="act-btn" title="查看详情" @click="showBillDetail(idx)">
                  <i class="fa-solid fa-eye"></i>
                </span>
                <br />
                <span class="act-btn" title="删除" @click="delBill(bill.id)">
                  <i class="fa-solid fa-trash-can"></i>
                </span>
              </td>
              <td>
                <span style="display: inline-block">{{ bill.DATE }}</span>
              </td>
              <td>{{ bill.NAME }}</td>
              <td>{{ bill.CATEGORY }}</td>
              <td>
                <i
                  v-if="bill.ACC_OUT"
                  style="color: red"
                  class="fa-solid fa-arrow-down"
                ></i>
                {{ bill.ACC_OUT }}
                <br v-if="bill.ACC_OUT" />
                <i
                  v-if="bill.ACC_IN"
                  style="color: green"
                  class="fa-solid fa-arrow-up"
                ></i>
                {{ bill.ACC_IN }}
              </td>
              <td>
                <i
                  v-if="bill.NATURE == '收入'"
                  style="color: green"
                  class="fa-solid fa-arrow-up"
                ></i>
                <i
                  v-if="bill.NATURE == '支出'"
                  style="color: red"
                  class="fa-solid fa-arrow-down"
                ></i>
                <i
                  v-if="bill.NATURE == '转账'"
                  style="color: orange"
                  class="fa-solid fa-repeat"
                ></i>
                <br />
                {{ bill.AMOUNT }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="overlay"
        :class="{ show: isShowOverlay }"
        @click="hideOverlay"
      ></div>
      <div class="view-container" :class="{ show: isShowBill }">
        <p>
          日期:
          <br />
          <DatePickerUnit
            @dateChanged="changeBillDate"
            :startYear="startYear"
            :endYear="endYear"
            :year="billSelected.year"
            :month="billSelected.month"
            :day="billSelected.day"
          ></DatePickerUnit>
        </p>
        <p>
          事项:
          <input v-model="billSelected.NAME" type="text" />
        </p>
        <p>
          性质:
          <select v-model="billSelected.NATURE" @change="loadCategory">
            <option v-for="(nature, i) in natureOption" :key="i">{{ nature }}</option>
          </select>
          <br />
          <span
            :class="{
              hide: billSelected.NATURE == '转账' || billSelected.NATURE == ''
            }"
          >
            分类:
            <select v-model="billSelected.CATEGORY">
              <option v-for="(cat, i) in categoryOption" :key="i">{{ cat }}</option>
            </select>
          </span>
        </p>
        <p>
          <span :class="{ hide: billSelected.NATURE == '收入' }">
            支出账户:
            <select v-model="billSelected.ACC_OUT">
              <option v-for="(acc, i) in accounts" :key="i">
                {{ acc.NAME }}
              </option>
            </select>
          </span>
          <br :class="{ hide: billSelected.NATURE == '收入' }" />
          <span :class="{ hide: billSelected.NATURE == '支出' }">
            收入账户:
            <select v-model="billSelected.ACC_IN" :title="billSelected.ACC_OUT">
              <option v-for="(acc, i) in accounts" :key="i">
                {{ acc.NAME }}
              </option>
            </select>
          </span>
        </p>
        <p>
          金额:
          <input v-model="billSelected.AMOUNT" type="number" />
        </p>
        <p>
          备注:
          <input placeholder="选填" v-model="billSelected.REMARK" type="text" />
        </p>
        <p>
          详细描述:
          <textarea
            placeholder="选填"
            style="width: 100%; height: 150px"
            v-model="billSelected.NOTES"
          ></textarea>
        </p>
        <div style="text-align: center">
          <button v-if="isUpdateBill" @click="updateBill">更新</button>
          <button @click="addBill">另存</button>
          <button @click="hideOverlay">取消</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
      <div class="view-container" :class="{ show: isShowAcc }">
        <div class="view-acc" v-for="(acc, i) in accEditing" :key="i">
          账户:
          <input v-model="acc.NAME" />
          <br />
          类型:
          <input v-model="acc.TYPE" />
        </div>
        <div style="text-align: center">
          <button @click="addAcc(accEditing.length)">新增账户</button>
          <br />
          <button @click="updateAcc">更新</button>
          <button @click="hideOverlay">取消</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
      <div class="view-container" :class="{ show: isShowCat }">
        <div class="view-acc" v-for="(cat, i) in catEditing" :key="i">
          分类:
          <input v-model="cat.NAME" />
          <br />
          性质:
          <select v-model="cat.TYPE" :class="getTypeClass(cat.TYPE)">
            <option>收入</option>
            <option>支出</option>
          </select>
        </div>
        <div style="text-align: center">
          <button @click="addCat(catEditing.length)">新增分类</button>
          <br />
          <button @click="updateCat">更新</button>
          <button @click="hideOverlay">取消</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
      <div class="view-container" :class="{ show: isShowSumAcc }">
        <div v-if="sumAcc.length">
          <button
            v-for="(type, j) in sumAcc"
            :key="'opt' + j"
            :class="getSumAccBtnClass(type[0].TYPE)"
            @click="setActiveSumAccType(type[0].TYPE)"
          >
            {{ type[0].TYPE }}
          </button>
        </div>
        <hr />
        <div
          v-for="(type, j) in sumAcc"
          :key="j"
          :class="getSumAccTypeClass(type[0].TYPE)"
        >
          <div class="view-acc" v-for="(acc, i) in type" :key="j + '-' + i">
            <h3>{{ acc.NAME }}</h3>
            <span class="sum-up">
              支出: &nbsp;
              <span class="txt-red">
                {{ acc.expenseTotal }}
              </span>
            </span>
            <br />
            <span class="sum-up">
              收入: &nbsp;
              <span class="txt-green">
                {{ acc.incomeTotal }}
              </span>
            </span>
            <br />
            <span class="sum-up">
              结余: &nbsp;
              <span :class="getReserveClass(acc.reserveTotal.val)">
                {{ acc.reserveTotal.text }}
              </span>
            </span>
          </div>
        </div>
        <div style="text-align: center">
          <button @click="hideOverlay">关闭</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
      <div class="view-container" :class="{ show: isShowSumCat }">
        <div v-if="sumCat.length">
            <button
            v-for="(type, j) in sumCat"
            :key="'opt' + j"
            :class="getSumCatBtnClass(type[0].TYPE)"
            @click="setActiveSumCatType(type[0].TYPE)"
            >
            {{ type[0].TYPE }}
          </button>
        </div>
        <hr />
        <div v-for="(type, j) in sumCat" :key="j">
          <div
            class="view-acc"
            v-for="(cat, i) in type"
            :key="j + '-' + i"
            :class="getSumCatTypeClass(type[0].TYPE)"
          >
            <h3>{{ cat.NAME }}</h3>
            <span class="sum-up">
              金额: &nbsp;
              <span :class="getTxtClass(cat.TYPE)">
                {{ cat.total }}
              </span>
            </span>
          </div>
        </div>
        <div style="text-align: center">
          <button @click="hideOverlay">关闭</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
    </div>
    <Login v-if="!isLoggedin" :errorMsg="login_errMsg" @login="getLoginInfo"></Login>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import DatePickerUnit from "./components/DatePickerUnit.vue";
import dummyData from "./assets/dummy-data.js";
var myAccounts = dummyData.ACCOUNT;
var myCategories = dummyData.CATEGORY;
var myBills = dummyData.BILL;
//firebase config start
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore,doc,getDocs,setDoc,deleteDoc,collection  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
var isLoggedin = false;
if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  isLoggedin = true;
}
//firebase config end
var newBill = function (bill) {
  var DATE_NUM = bill.DATE.substring(0,4)+bill.DATE.substring(5,7)+bill.DATE.substring(8,10);
  DATE_NUM = Number(DATE_NUM);
  return {
    NAME: bill.NAME,
    ACC_IN: bill.ACC_IN,
    ACC_OUT: bill.ACC_OUT,
    AMOUNT: bill.AMOUNT,
    CATEGORY: bill.CATEGORY,
    DATE: bill.DATE,
    DATE_NUM,
    NATURE: bill.NATURE,
    NOTES: bill.NOTES,
    REMARK: bill.REMARK,
    id: bill.id
  };
};
var newAcc = function (acc) {
  return {
    id: acc.id,
    NAME: acc.NAME,
    TYPE: acc.TYPE
  };
};
var newCat = function (cat) {
  return {
    id: cat.id,
    NAME: cat.NAME,
    TYPE: cat.TYPE
  };
};
var emptyBill = {
  NAME: "",
  ACC_IN: "",
  ACC_OUT: "",
  AMOUNT: "",
  CATEGORY: "",
  DATE: "",
  NATURE: "",
  NOTES: "",
  REMARK: "",
  id: ""
};
var emptyAcc = {
  id: "",
  NAME: "",
  TYPE: ""
};
var emptyCat = {
  id: "",
  NAME: "",
  TYPE: ""
};
function custom_sort(a, b) {
    return new Date(b.DATE).getTime() - new Date(a.DATE).getTime();
}
export default {
  components: {
    Login,
    DatePickerUnit,
  },
	name: "April-Bill",
	data() {
		return {
      perPageSelected: 10,
      curPage: 99,
      prevPage: 0,
      nextPage: 0,
      startYear: 2020,
      endYear: 2030,
      natureOption: ["支出", "收入", "转账"],
      perPageOption: [1, 3, 5, 7, 10, 20, 30, 40],
      pageNumOption: [],
      curPageBills: [],
      bills: [],
      accounts: [],
      categories: [],
      isShowOverlay: false,
      isShowBill: false,
      isShowAcc: false,
      isShowCat: false,
      isShowSumAcc: false,
      isShowSumCat: false,
      isUpdateBill: true,
      billSelected: {},
      accEditing: [],
      catEditing: [],
      sumAcc: [],
      activeSumAccType: "",
      sumCat: [],
      activeSumCatType: "",
      expenseTotal: 0,
      incomeTotal: 0,
      reserveTotal: { val: 0, text: "0.00" },
      filter: {
        startDate: {
          year: "",
          month: "",
          day: ""
        },
        endDate: {
          year: "",
          month: "",
          day: ""
        },
        perPage: 10
      },
      searchKW: "",
      searchResultClass: [],
      isLoggedin,
      isGuestMode: false,
      login_errMsg: "",
		};
  },
  computed: {
    prevNext() {
      var prevStyle = this.prevPage ? "" : "disabled";
      var nextStyle = this.nextPage ? "" : "disabled";
      return { prevStyle, nextStyle };
    },
    categoryOption() {
      var nature = this.billSelected.NATURE;
      var catArr = [];
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].TYPE == nature) {
          catArr.push(this.categories[i].NAME);
        }
      }
      return catArr;
    }
  },
  methods: {
  	loadNewBill(pageNum) {
      this.bills = this.getFilteredBills(myBills, this.filter);
      this.accounts = myAccounts;
      this.categories = myCategories;
      var totalBills = this.bills.length;
      var perPage = this.perPageSelected;
      var lastPage = Math.ceil(totalBills / perPage);
      var pageNumOption = [];
      for (let i = 1; i < lastPage + 1; i++) {
        pageNumOption.push(i);
      }
      this.pageNumOption = pageNumOption;
      this.filter.perPage = perPage;
      this.curPage = pageNum;
      this.loadBill();
      this.expenseTotal = this.getExpenseTotal(this.bills);
      this.incomeTotal = this.getIncomeTotal(this.bills);
      this.reserveTotal = this.getReserveTotal(
        this.expenseTotal,
        this.incomeTotal
      );
      this.getSumAcc();
      this.getSumCat();
      this.clearSearch();
    },
    loadBill() {
      var totalBills = this.bills.length;
      var curPage = this.curPage;
      var perPage = this.filter.perPage;
      if (totalBills == 0) {
        this.curPageBills = [];
        return;
      }
      var lastPage = Math.ceil(totalBills / perPage);
      var skip = this.skipNumber();
      var paginatedBills = this.bills.slice(skip, skip + perPage);
      this.curPageBills = paginatedBills;
      this.prevPage = curPage - 1;
      this.nextPage = curPage == lastPage ? 0 : curPage + 1;
    },
    loadAccCat() {

    },
    goToPrev() {
      if (this.prevPage == 0) return;
      this.curPage--;
      this.loadBill();
    },
    goToNext() {
      if (this.nextPage == 0) return;
      this.curPage++;
      this.loadBill();
    },
    showBillDetail(idx) {
      this.showOverlay();
      this.isShowBill = true;
      if (idx != -1) {
        var bill = this.curPageBills[idx];
        this.isUpdateBill = true;
        this.billSelected = newBill(bill);
        this.billSelected.year = bill.DATE.substring(0, 4);
        this.billSelected.month = bill.DATE.substring(5, 7);
        this.billSelected.day = bill.DATE.substring(8, 10);
      } else {
        this.isUpdateBill = false;
        this.billSelected = newBill(emptyBill);
        let curDate = new Date();
        let tempMonth =
          curDate.getMonth() < 9
            ? "0" + (curDate.getMonth() + 1)
            : curDate.getMonth() + 1;
        let tempDay =
          curDate.getDate() < 9 ? "0" + curDate.getDate() : curDate.getDate();
        this.billSelected.year = curDate.getFullYear();
        this.billSelected.month = tempMonth;
        this.billSelected.day = tempDay;
        this.billSelected.DATE = [curDate.getFullYear(), tempMonth, tempDay].join(
          "-"
        );
      }
    },
    showAccDetail() {
      this.showOverlay();
      this.isShowAcc = true;
      this.accEditing = [];
      var accArr = this.accounts;
      for (let i = 0; i < accArr.length; i++) {
        this.accEditing.push(newAcc(accArr[i]));
      }
    },
    showCatDetail() {
      this.showOverlay();
      this.isShowCat = true;
      this.catEditing = [];
      var catArr = this.categories;
      for (let i = 1; i < catArr.length; i++) {
        this.catEditing.push(newCat(catArr[i]));
      }
    },
    showSumAcc() {
      this.showOverlay();
      this.isShowSumAcc = true;
      if (this.sumAcc.length) {
        this.setActiveSumAccType(this.sumAcc[0][0].TYPE);
      }
    },
    showSumCat() {
      this.showOverlay();
      this.isShowSumCat = true;
      if (this.sumCat.length) {
        this.setActiveSumCatType(this.sumCat[0][0].TYPE);
      }
    },
    showOverlay() {
      this.isShowOverlay = true;
    },
    hideOverlay() {
      this.isShowOverlay = false;
      this.isShowBill = false;
      this.isShowAcc = false;
      this.isShowCat = false;
      this.isShowSumAcc = false;
      this.isShowSumCat = false;
    },
    async updateBill() {
      var isOK_1 = !!this.billSelected.NAME && !!this.billSelected.AMOUNT;
      var isOK_2 = false;
      if (this.billSelected.NATURE == "转账") {
        isOK_2 = !!this.billSelected.ACC_OUT && !!this.billSelected.ACC_IN;
      } else {
        isOK_2 = !!this.billSelected.ACC_OUT || !!this.billSelected.ACC_IN;
      }
      var isOK_3 = !!this.billSelected.CATEGORY && !!this.billSelected.DATE;
      var isOK_4 = !!this.billSelected.NATURE;
      if (isOK_1 && isOK_2 && isOK_3 && isOK_4) {
        if (confirm("确认更新吗？")) {
          var bill = newBill(this.billSelected);
          bill.DATE = [
            this.billSelected.year,
            this.billSelected.month,
            this.billSelected.day
          ].join("-");

          await setDoc(doc(db, "BOOK/BOOK001/BILL", bill.id), bill);
          this.isShowOverlay = false;
          this.isShowBill = false;
          const querySnapshot3 = await getDocs(collection(db, "BOOK/BOOK001/BILL"));
          myBills = [];
          querySnapshot3.forEach((doc) => {
            let bill = doc.data();
            bill.id = doc.id;
            myBills.push(newBill(bill));
          });
          myBills.sort(custom_sort);
          this.loadNewBill(this.curPage);
          // var bills = this.bills;
          // for (let i = 0; i < bills.length; i++) {
          //   if (bills[i].id == bill.id) {
          //     this.bills[i] = bill;
          //     this.isShowOverlay = false;
          //     this.isShowBill = false;
          //     this.loadBill();
          //     return;
          //   }
          // }
        }
      } else {
        alert("请填写所有必填项");
      }
    },
    async addBill() {
      var isOK_1 = !!this.billSelected.NAME && !!this.billSelected.AMOUNT;
      var isOK_2 = false;
      if (this.billSelected.NATURE == "转账") {
        isOK_2 = !!this.billSelected.ACC_OUT && !!this.billSelected.ACC_IN;
      } else {
        isOK_2 = !!this.billSelected.ACC_OUT || !!this.billSelected.ACC_IN;
      }
      var isOK_3 = !!this.billSelected.CATEGORY && !!this.billSelected.DATE;
      var isOK_4 = !!this.billSelected.NATURE;
      if (isOK_1 && isOK_2 && isOK_3 && isOK_4) {
        if (confirm("确认新建吗？")) {
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          month = month<10?"0"+month:month;
          var day = date.getDate();
          day = day<10?"0"+day:day;
          var hour = date.getHours();
          hour = hour<10?"0"+hour:hour;
          var minute = date.getMinutes();
          minute = minute<10?"0"+minute:minute;
          var second = date.getSeconds();
          second = second<10?"0"+second:second;
          var newID = "BILL" + [year, month, day, hour, minute, second].join("");
          var bill = newBill(this.billSelected);
          bill.DATE = [
            this.billSelected.year,
            this.billSelected.month,
            this.billSelected.day
          ].join("-");
          bill.id = newID;
          //此处提交新账单
          // myBills.unshift(bill);     
          await setDoc(doc(db, "BOOK/BOOK001/BILL", bill.id), bill);
          //提交新账单
          this.isShowOverlay = false;
          this.isShowBill = false;
          const querySnapshot3 = await getDocs(collection(db, "BOOK/BOOK001/BILL"));
          myBills = [];
          querySnapshot3.forEach((doc) => {
            let bill = doc.data();
            bill.id = doc.id;
            myBills.push(newBill(bill));
          });
          myBills.sort(custom_sort);
          this.loadNewBill(1);
        }
      } else {
        alert("请填写所有必填项");
      }
    },
    async delBill(id) {
      if (confirm("确认删除吗？")) {
        //删除此id的账单
        // let idx = 0;
        // for (let i = 0; i < myBills.length; i++) {
        //   if (myBills[i].id == id) {
        //     idx = i;
        //     break;
        //   }
        // }
        // myBills.splice(this.skipNumber() + idx, 1);
        //删除之后重新载入
        await deleteDoc(doc(db, "BOOK/BOOK001/BILL", id));
        const querySnapshot3 = await getDocs(collection(db, "BOOK/BOOK001/BILL"));
        myBills = [];
        querySnapshot3.forEach((doc) => {
          let bill = doc.data();
          bill.id = doc.id;
          myBills.push(newBill(bill));
        });
        myBills.sort(custom_sort);
        this.loadNewBill(this.curPage);
      }
    },
    addAcc(len) {
      var idNum = len < 9 ? "00" + (len+1) : len < 99 ? "0" + (len+1) : (len+1);
      this.accEditing.push({
        id: "ACC" + idNum,
        NAME: "",
        TYPE: ""
      });
    },
    async updateAcc() {
      if (confirm("确认更新吗？")) {
        var accArr = this.accEditing;
        this.accounts = [];
        for (let i = 0; i < accArr.length; i++) {
          let idNum = i < 9 ? "00" + (i+1) : i < 99 ? "0" + (i+1) : i+1;
          if (accArr[i].NAME && accArr[i].TYPE) {
            this.accounts.push({
              id: "ACC" + idNum,
              NAME: accArr[i].NAME,
              TYPE: accArr[i].TYPE
            });
            await setDoc(doc(db, "BOOK/BOOK001/ACCOUNT", accArr[i].id),{
              id: "ACC" + idNum,
              NAME: accArr[i].NAME,
              TYPE: accArr[i].TYPE
            });
          } else {
            await deleteDoc(doc(db, "BOOK/BOOK001/ACCOUNT", accArr[i].id));
          }
        }
        this.hideOverlay();
        this.getSumAcc();
      }
    },
    addCat(len) {
      var idNum = len < 10 ? "00" + len : len < 100 ? "0" + len : len;
      this.catEditing.push({
        id: "CAT" + idNum,
        NAME: "",
        TYPE: ""
      });
    },
    async updateCat() {
      if (confirm("确认更新吗？")) {
        var catArr = this.catEditing;
        this.categories = [{ id: "CAT000", NAME: "转账", TYPE: "转账" }];
        for (let i = 0; i < catArr.length; i++) {
          if (catArr[i].NAME && catArr[i].TYPE) {
            let idNum = i < 9 ? "00" + (i+1) : i < 99 ? "0" + (i+1) : (i+1);
            this.categories.push({
              id: "CAT" + idNum,
              NAME: catArr[i].NAME,
              TYPE: catArr[i].TYPE
            });
            await setDoc(doc(db, "BOOK/BOOK001/CATEGORY", catArr[i].id),{
              id: "CAT" + idNum,
              NAME: catArr[i].NAME,
              TYPE: catArr[i].TYPE
            });
          } else {
            await deleteDoc(doc(db, "BOOK/BOOK001/CATEGORY", catArr[i].id));
          }
        }
        this.hideOverlay();
        this.getSumCat();
      }
    },
    loadCategory() {
      if (this.billSelected.NATURE == "支出") {
        this.billSelected.ACC_IN = "";
      }
      if (this.billSelected.NATURE == "收入") {
        this.billSelected.ACC_OUT = "";
      }
      if (this.billSelected.NATURE == "转账") {
        this.billSelected.CATEGORY = "转账";
      }
    },
    skipNumber() {
      var totalBills = this.bills.length;
      var perPage = this.filter.perPage;
      var curPage = this.curPage;
      var lastPage = Math.ceil(totalBills / perPage);
      var lastPageCount =
        totalBills % perPage == 0 ? perPage : totalBills % perPage;
      if (curPage === 1) {
        return 0;
      }
      if (curPage === lastPage) {
        return totalBills - lastPageCount;
      }
      return (curPage - 1) * perPage;
    },
    setActiveSumAccType(type) {
      this.activeSumAccType = type;
    },
    setActiveSumCatType(type) {
      this.activeSumCatType = type;
    },
    getExpenseTotal(bills, ACC_OUT) {
      var expenseTotal = bills.reduce(function (a, b) {
        if (b.NATURE == "支出") {
          let result = (a * 100 + b.AMOUNT * 100) / 100;
          return result.toFixed(2);
        } else {
          if (ACC_OUT && b.ACC_OUT == ACC_OUT) {
            let result = (a * 100 + b.AMOUNT * 100) / 100;
            return result.toFixed(2);
          } else {
            return (a * 1).toFixed(2);
          }
        }
      }, (0).toFixed(2));
      return expenseTotal;
    },
    getIncomeTotal(bills, ACC_IN) {
      let incomeTotal = bills.reduce(function (a, b) {
        if (b.NATURE == "收入") {
          let result = (a * 100 + b.AMOUNT * 100) / 100;
          return result.toFixed(2);
        } else {
          if (ACC_IN && b.ACC_IN == ACC_IN) {
            let result = (a * 100 + b.AMOUNT * 100) / 100;
            return result.toFixed(2);
          } else {
            return (a * 1).toFixed(2);
          }
        }
      }, (0).toFixed(2));
      return incomeTotal;
    },
    getReserveTotal(expenseTotal, incomeTotal) {
      let result = (incomeTotal * 100 - expenseTotal * 100) / 100;
      let reserveTotalTxt =
        result > 0 ? String(result.toFixed(2)) : String((result * -1).toFixed(2));
      return {
        val: result,
        text: reserveTotalTxt
      };
    },
    getSumAcc() {
      var that = this;
      var accounts = this.accounts;
      //获取所有账号名
      var accObj = {};
      for (let i = 0; i < accounts.length; i++) {
        accObj[accounts[i].NAME] = {
          TYPE: accounts[i].TYPE,
          bills: []
        };
      }
      //获取所有类型名
      var typeObj = {};
      for (let j = 0; j < accounts.length; j++) {
        if (typeObj[accounts[j].TYPE]) {
          typeObj[accounts[j].TYPE].push(accounts[j].NAME);
        } else {
          typeObj[accounts[j].TYPE] = [accounts[j].NAME];
        }
      }
      var accNames = Object.keys(accObj);
      var typeNames = Object.keys(typeObj);
      //给每个账号分配账单
      var bills = this.bills;
      for (let j = 0; j < bills.length; j++) {
        if (bills[j].NATURE == "支出") {
          if (accObj[bills[j].ACC_OUT]) {
            accObj[bills[j].ACC_OUT].bills.push(bills[j]);
          }
        } else if (bills[j].NATURE == "收入") {
          if (accObj[bills[j].ACC_IN]) {
            accObj[bills[j].ACC_IN].bills.push(bills[j]);
          }
        } else {
          accObj[bills[j].ACC_OUT].bills.push(bills[j]);
          accObj[bills[j].ACC_IN].bills.push(bills[j]);
        }
      }
      //计算每个账号的收入、支出、结余
      var getSumObj = function (NAME, TYPE, bills) {
        let expenseTotal = that.getExpenseTotal(bills, NAME);
        let incomeTotal = that.getIncomeTotal(bills, NAME);
        let reserveTotal = that.getReserveTotal(expenseTotal, incomeTotal);
        return {
          NAME,
          TYPE,
          expenseTotal,
          incomeTotal,
          reserveTotal
        };
      };
      var result = [];
      for (let k = 0; k < typeNames.length; k++) {
        let tempType = typeNames[k];
        let typeArr = [];
        for (let m = 0; m < typeObj[tempType].length; m++) {
          let accName = typeObj[tempType][m];
          let sumObj = getSumObj(accName, tempType, accObj[accName].bills);
          typeArr.push(sumObj);
        }
        result.push(typeArr);
      }
      this.sumAcc = result;
      this.setActiveSumAccType(result[0][0].TYPE);
    },
    getSumCat() {
      var that = this;
      var categories = this.categories;
      //获取所有分类名
      var catObj = {};
      for (let i = 0; i < categories.length; i++) {
        catObj[categories[i].NAME] = {
          TYPE: categories[i].TYPE,
          bills: []
        };
      }
      //获取所有类型名
      var typeObj = {
        支出: [],
        收入: [],
        转账: []
      };
      for (let j = 0; j < categories.length; j++) {
        typeObj[categories[j].TYPE].push(categories[j].NAME);
      }
      var catNames = Object.keys(catObj);
      var typeNames = ["支出", "收入", "转账"];
      //给每个分类分配账单
      var bills = this.bills;
      for (let j = 0; j < bills.length; j++) {
        if (catObj[bills[j].CATEGORY]) {
          catObj[bills[j].CATEGORY].bills.push(bills[j]);
        }
      }
      //计算每个分类的收入、支出或转账的总额
      var getSumObj = function (NAME, TYPE, bills) {
        var total = bills.reduce(function (a, b) {
          let result = (a * 100 + b.AMOUNT * 100) / 100;
          return result.toFixed(2);
        }, (0).toFixed(2));
        return {
          NAME,
          TYPE,
          total
        };
      };
      var result = [];
      for (let k = 0; k < typeNames.length; k++) {
        let tempType = typeNames[k];
        let typeArr = [];
        for (let m = 0; m < typeObj[tempType].length; m++) {
          let catName = typeObj[tempType][m];
          let sumObj = getSumObj(catName, tempType, catObj[catName].bills);
          typeArr.push(sumObj);
        }
        result.push(typeArr);
      }
      this.sumCat = result;
      this.setActiveSumCatType(result[0][0].TYPE);
    },
    getReserveClass(reserve) {
      let isDeficit = reserve < 0;
      return {
        "txt-green": !isDeficit,
        "txt-red": isDeficit
      };
    },
    getTypeClass(type) {
      let isExpense = type == "支出";
      let isIncome = type == "收入";
      return {
        "txt-green": isIncome,
        "txt-red": isExpense
      };
    },
    getTxtClass(type) {
      let isExpense = type == "支出";
      let isIncome = type == "收入";
      let isTrans = type == "转账";
      return {
        green: isIncome,
        red: isExpense,
        orange: isTrans
      };
    },
    getSumAccTypeClass(type) {
      let isShow = type == this.activeSumAccType;
      return {
        show: isShow,
        hide: !isShow
      };
    },
    getSumAccBtnClass(type) {
      let isDisabled = type == this.activeSumAccType;
      return {
        disabled: isDisabled
      };
    },
    getSumCatTypeClass(type) {
      let isShow = type == this.activeSumCatType;
      return {
        show: isShow,
        hide: !isShow
      };
    },
    getSumCatBtnClass(type) {
      let isDisabled = type == this.activeSumCatType;
      return {
        disabled: isDisabled
      };
    },
    getFilteredBills(bills, obj) {
      var startDate = [
        obj.startDate.year,
        obj.startDate.month,
        obj.startDate.day
      ].join("-");
      var endDate = [obj.endDate.year, obj.endDate.month, obj.endDate.day].join(
        "-"
      );
      var start = new Date(startDate);
      var end = new Date(endDate);
      var result = bills.filter(function (a) {
        var date = new Date(a.DATE);
        return date >= start && date <= end;
      });
      return result;
    },
    changeBillDate(obj) {
      this.billSelected.year = obj.year;
      this.billSelected.month = obj.month;
      this.billSelected.day = obj.day;
      this.billSelected.DATE = [obj.year, obj.month, obj.day].join("-");
    },
    changeFilterStartDate(obj) {
      this.filter.startDate.year = obj.year;
      this.filter.startDate.month = obj.month;
      this.filter.startDate.day = obj.day;
      this.filter.startDate.DATE = [obj.year, obj.month, obj.day].join("-");
    },
    changeFilterEndDate(obj) {
      this.filter.endDate.year = obj.year;
      this.filter.endDate.month = obj.month;
      this.filter.endDate.day = obj.day;
      this.filter.endDate.DATE = [obj.year, obj.month, obj.day].join("-");
    },
    searchWithinPage() {
      var searchKW = this.searchKW; //获取搜索关键字
      var curPageBills = this.curPageBills;
      var searchResultClass = [];
      for (let i = 0; i < curPageBills.length; i++) {
        let billTxt = [
          curPageBills[i].NAME,
          curPageBills[i].CATEGORY,
          curPageBills[i].ACC_IN,
          curPageBills[i].ACC_OUT
        ].join("");
        if (billTxt.indexOf(searchKW) != -1) {
          //找到关键字就不隐藏
          searchResultClass.push("");
        } else {
          //没找到就隐藏
          searchResultClass.push("hide");
        }
      }
      this.searchResultClass = searchResultClass;
    },
    clearSearch() {
      this.searchKW = "";
      var curPageBills = this.curPageBills;
      var searchResultClass = [];
      for (let i = 0; i < curPageBills.length; i++) {
        //清除已添加的隐藏class
        searchResultClass.push("");
      }
      this.searchResultClass = searchResultClass;
    },
    async getLoginInfo(myUser) {
      var email = myUser.email;
      var password = myUser.password;
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.isLoggedin = true;
        this.login_errMsg = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.login_errMsg = errorMessage;
      });
      const querySnapshot1 = await getDocs(collection(db, "BOOK/BOOK001/ACCOUNT"));
      const querySnapshot2 = await getDocs(collection(db, "BOOK/BOOK001/CATEGORY"));
      const querySnapshot3 = await getDocs(collection(db, "BOOK/BOOK001/BILL"));
      myAccounts = [];
      querySnapshot1.forEach((doc) => {
        let acc = doc.data();
        acc.id = doc.id;
        myAccounts.push(newAcc(acc))
      });
      myCategories = [];
      querySnapshot2.forEach((doc) => {
        let cat = doc.data();
        cat.id = doc.id;
        myCategories.push(newCat(cat));
      });;
      myBills = [];
      querySnapshot3.forEach((doc) => {
        let bill = doc.data();
        bill.id = doc.id;
        myBills.push(newBill(bill));
      });
      myBills.sort(custom_sort);
      this.init();
    },
    logout() {
      signOut(auth).then(() => {
        // Sign-out successful.
        this.isLoggedin = false;
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
    },
    init() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var lastMonthMonth = month==1?12:month-1;
      lastMonthMonth = lastMonthMonth < 10 ? "0" + lastMonthMonth : lastMonthMonth;
      var lastMonthYear = lastMonthMonth==12?year-1:year;
      var tempDate = new Date(lastMonthYear,lastMonthMonth-1,day);
      var tempDay = tempDate.getDate();
      var tempDate2 = tempDay<day?new Date(lastMonthYear,lastMonthMonth-1,day-tempDay):tempDate;
      var lastMonthDay = tempDate2.getDate();
      lastMonthDay = lastMonthDay < 10 ? "0" + lastMonthDay : lastMonthDay;
      this.filter.startDate = {
        year: lastMonthYear,
        month: lastMonthMonth,
        day: lastMonthDay
      };
      this.filter.endDate = {
        year,
        month,
        day
      };
      this.loadNewBill(1);
    }
  },
  mounted() {
    if(this.isLoggedin) {
      this.init();
    }
  },
};
</script>

<style type="text/css">
html,
body {
  margin: 0px;
  min-width: 320px;
}
#app {
  min-width: 320px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
button {
  background: none;
  border: solid 1px;
  border-radius: 20px;
  font: inherit;
  font-weight: bold;
  color: rgb(10, 10, 10);
  padding: 2px 20px;
  cursor: pointer;
}
button:hover {
  color: gray;
}
select {
  color: black;
  border-radius: 2px;
}
.main-container {
  margin: 0px auto;
  padding: 0px 10px;
  width: 800px;
  max-width: 100%;
}
.sum-up {
  line-height: 32px;
}
.bills {
  margin: 10px auto;
  max-width: auto;
  border: solid gray 1px;
}
.table {
  margin-bottom: 0;
  width: 100%;
  min-width: 540px;
}
.table th {
  width: 16.66%;
}
.table tr {
  height: 66px;
  vertical-align: middle;
}
.loadbill-setting {
  position: relative;
  margin: 10px auto;
}
.loadbill-set-unit {
  min-width: 300px;
  display: inline-block;
  margin-bottom: 10px;
}
.pagenation-container {
  margin-bottom: 10px;
  user-select: none;
}
.page-item {
  width: 40px;
  border: solid gray 1px;
  display: inline-block;
  cursor: pointer;
}
.disabled {
  border-color: rgb(192 192 192 / 48%);
  color: rgb(192 192 192 / 48%);
  cursor: not-allowed;
}
button.disabled {
  cursor: unset;
}
.act-btn {
  cursor: pointer;
}
.overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
}
.view-container {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  padding: 26px 10px 30px 10px;
  width: 300px;
  height: 580px;
  text-align: left;
  background: white;
  display: none;
  overflow-y: scroll;
}
.view-acc {
  margin-bottom: 10px;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.close-btn {
  position: absolute;
  top: -4px;
  right: 8px;
  cursor: pointer;
  font-size: 35px;
}
.txt-green {
  color: green;
}
.txt-green:before {
  content: "+";
}
.txt-red {
  color: red;
  display: inline-block;
}
.txt-red:before {
  margin-left: 2px;
  margin-right: 2px;
  content: "-";
}
.green {
  color: green;
}
.red {
  color: red;
}
.orange {
  color: orange;
}
@media all and (max-width: 450px) {
  .bills {
    overflow-x: scroll;
  }
  .view-container {
    max-height: 420px;
    overflow-y: scroll;
  }
}
</style>