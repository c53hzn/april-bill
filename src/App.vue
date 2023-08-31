<template>
  <div>
    <ForkOnGithub v-if="!isLoggedin"></ForkOnGithub>
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
          ></DatePickerUnit><br class="hide-on-mobile">
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
          <button @click="init">过去一月</button>
          <button @click="loadBillThisMonth">本月至今</button><br>
          <button @click="loadBillToday">只看今天</button><br><br>
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
      <div style="position: relative; padding: 0px 10px; text-align: left">
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
        <div style="position: absolute; right: 10px; bottom: 2px; text-align: right">
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
          style="padding: 1px 2px; width: 134px; height: 34px; border-radius: 6px"
          @input="searchWithinPage"
          v-model="searchKW"
          type="text"
        />
        <div
          :class="{ hide: !searchKW, inline: searchKW.length>0 }"
          @click="clearSearch"
          style="position: absolute;right: 8px;cursor: pointer;font-size: 35px;height: 40px;line-height: 40px;"
        >
          ×
        </div>
      </div>
      <div class="bills">
        <div
          v-for="(bill, idx) in curPageBills"
          :key="bill.id"
        >
          <div class="date" v-if="bill.DATE_display"
           :class="{'date-decor':bill.DATE_display&&idx}">
            {{ bill.DATE_display }} &nbsp;
            <i class="fa-solid fa-arrow-down red"></i>{{bill.sum_out}}&nbsp;
            <i class="fa-solid fa-arrow-up green"></i>{{bill.sum_in}}&nbsp;
            <i class="fa-solid fa-repeat orange"></i>{{bill.sum_trans}}
          </div>
          <div :class="searchResultClass[idx]" class="bill-unit">
            <div class="act-btn-container">
              <div class="act-btn" title="查看详情" @click="showBillDetail(idx)">
                <i class="fa-solid fa-eye"></i>
              </div>
              <div class="act-btn" title="删除" @click="delBill(bill)">
                <i class="fa-solid fa-trash-can"></i>
              </div>
            </div>
            <div class="bill-data-container">
              <div>
                <div class="bill-data">
                  {{ bill.NAME }}
                </div>
                <div class="bill-data">
                  <i
                    v-if="bill.NATURE == '收入'"
                    class="fa-solid fa-arrow-up green"
                  ></i>
                  <i
                    v-if="bill.NATURE == '支出'"
                    class="fa-solid fa-arrow-down red"
                  ></i>
                  <i
                    v-if="bill.NATURE == '转账'"
                    class="fa-solid fa-repeat orange"
                  ></i>
                  {{ bill.AMOUNT }}
                </div>
              </div>
              <div class=gray>
                <div v-if="bill.NATURE!='转账'" class="bill-data">{{ bill.CATEGORY }}</div>
                <div v-if="bill.ACC_OUT" class="bill-data">
                  <i class="fa-solid fa-arrow-down red"
                ></i>
                {{ bill.ACC_OUT }}
                </div>
                <div v-if="bill.ACC_IN" class="bill-data">
                  <i class="fa-solid fa-arrow-up green"
                  ></i>
                  {{ bill.ACC_IN }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="overlay"
        :class="{ show: isShowOverlay }"
        @click="hideOverlay"
      ></div>
      <div class="view-container" :class="{ show: isShowBill }">
        <p>
          <span style="display:block;margin-bottom:10px;">日期:
            <button @click="loadToday">今天</button>
          </span>  
          <DatePickerUnit style="display:block;margin-bottom:10px;"
            @dateChanged="changeBillDate"
            :startYear="startYear"
            :endYear="endYear"
            :year="billSelected.year"
            :month="billSelected.month"
            :day="billSelected.day"
          ></DatePickerUnit>
          <span style="display:block;margin-bottom:10px;">模板:
            <select
              style="margin-top: -1; min-width: 50px; height: 24px;"
              @change="loadBillTemplate"
              v-model="billTemplateName"
            >
              <option v-for="(option, i) in billTemplateOption" :key="i">
                {{ option }}
              </option>
            </select>
          </span>
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
            style="width: 285px; height: 100px"
            v-model="billSelected.NOTES"
          ></textarea>
        </p>
        <div style="text-align: center">
          <button v-if="isUpdateBill" @click="updateBill">更新</button>
          <button @click="addBill">另存</button>
          <button @click="hideOverlay">取消</button>
          <br/>
          <br/>
          <button @click="saveBillTemplate">存为模板</button>
          <button @click="delBillTemplate">删除模板</button>
        </div>
        <div class="close-btn" @click="hideOverlay">×</div>
      </div>
      <div class="view-container" :class="{ show: isShowAcc }">
        <p><strong>* 初次填写时，“初始值”和“现余额”应填相同数字，之后每当有账单的新增/修改/删除，“现余额”就会有相应变动。</strong></p>
        <div class="view-acc" v-for="(acc, i) in accEditing" :key="i">
          账户名:
          <input v-model="acc.NAME" style="width:170px;"/>
          <br />
          类型名:
          <input v-model="acc.TYPE" style="width:170px;"/>
          <br />
          初始值:
          <input v-model="acc.initialBalance" type="number" style="width:170px;"/>
          <br />
         现余额: 
           <input v-model="acc.balance" type="number" style="width:170px;"/>
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
            <h3>{{ acc.NAME }} <span style="font-size:16px;">余额: {{ acc.balance }}</span></h3>
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
      <div style="margin-bottom: 10px">
        共{{ pageNumOption[pageNumOption.length - 1] }}页, 共{{
          bills.length
        }}条记录
      </div>
    </div>
    <Login v-if="!isLoggedin" :errorMsg="login_errMsg" @login="getLoginInfo"></Login>
    <p>&nbsp;</p>
    <Footer></Footer>
  </div>
</template>

<script>
import ForkOnGithub from "./components/Fork-On-Github.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue";
import DatePickerUnit from "./components/DatePickerUnit.vue";
//firebase config start
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore,doc,getDoc,getDocs,query, where, orderBy, setDoc,deleteDoc,collection  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
var isLoggedin = false;
var uid = localStorage.getItem("uid");
if (uid) {
  isLoggedin = true;
} else {
  uid = "";
}
//firebase config end
var newBill = function (bill) {
  return {
    NAME: bill.NAME,
    ACC_IN: bill.ACC_IN,
    ACC_OUT: bill.ACC_OUT,
    AMOUNT: bill.AMOUNT,
    CATEGORY: bill.CATEGORY,
    DATE: bill.DATE,
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
    TYPE: acc.TYPE,
    initialBalance: acc.initialBalance,
    balance: acc.balance
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
export default {
  components: {
    ForkOnGithub,
    Login,
    DatePickerUnit,
    Footer
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
      perPageOption: [10, 20, 50, 100],
      pageNumOption: [],
      billTemplateOption: [],
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
      billSelectedCopy: {},
      billTemplateName: "",
      billTemplates: [],
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
      uid,
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
    async loadNewBill(pageNum) {
      var uid = this.uid;
      const querySnapshot1 = await getDocs(collection(db, "BOOK/"+uid+"/ACCOUNT"));
      const querySnapshot2 = await getDocs(collection(db, "BOOK/"+uid+"/CATEGORY"));
      const billsRef = collection(db, "BOOK/"+uid+"/BILL");
      var queryStartDate = [
        this.filter.startDate.year,
        this.filter.startDate.month,
        this.filter.startDate.day
      ].join("-");
      var queryEndDate = [
        this.filter.endDate.year,
        this.filter.endDate.month,
        this.filter.endDate.day
      ].join("-");
      const q = query(billsRef, where("DATE", ">=", queryStartDate), where("DATE", "<=", queryEndDate), orderBy("DATE", "desc"));
      const querySnapshot3 = await getDocs(q);
      const querySnapshot4 = await getDocs(collection(db, "BOOK/"+uid+"/BILL_template"));
      this.accounts = [];
      querySnapshot1.forEach((doc) => {
        let acc = doc.data();
        acc.id = doc.id;
        this.accounts.push(newAcc(acc))
      });
      this.categories = [];
      querySnapshot2.forEach((doc) => {
        let cat = doc.data();
        cat.id = doc.id;
        this.categories.push(newCat(cat));
      });;
      this.bills = [];
      querySnapshot3.forEach((doc) => {
        let bill = doc.data();
        bill.id = doc.id;
        this.bills.push(newBill(bill));
      });
      this.billTemplateOption = [];
      this.billTemplates = [];
      querySnapshot4.forEach((doc) => {
        let temp = doc.data();
        temp.id = doc.id;
        this.billTemplateOption.push(temp.NAME);
        this.billTemplates.push(newBill(temp));
      });
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
      paginatedBills[0].DATE_display = paginatedBills[0].DATE;
      for (let i = 1; i < paginatedBills.length; i++) {
        if (paginatedBills[i].DATE!=paginatedBills[i-1].DATE) {
          paginatedBills[i].DATE_display = paginatedBills[i].DATE;
        } else {
          paginatedBills[i].DATE_display = "";
        }
      }
      for (let j = paginatedBills.length-1; j >= 0; j--) {
        if (j == paginatedBills.length-1) {
          if (paginatedBills[j].NATURE=="支出") {
            paginatedBills[j].sum_out = paginatedBills[j].AMOUNT;
            paginatedBills[j].sum_in = "0.00";
            paginatedBills[j].sum_trans = "0.00";
          }
          if (paginatedBills[j].NATURE=="收入") {
            paginatedBills[j].sum_out = "0.00";
            paginatedBills[j].sum_in = paginatedBills[j].AMOUNT;
            paginatedBills[j].sum_trans = "0.00";
          }
          if (paginatedBills[j].NATURE=="转账") {
            paginatedBills[j].sum_out = "0.00";
            paginatedBills[j].sum_in = "0.00";
            paginatedBills[j].sum_trans = paginatedBills[j].AMOUNT;
          }
        } else {
          if (paginatedBills[j].DATE==paginatedBills[j+1].DATE) {
            if (paginatedBills[j].NATURE=="支出") {
              paginatedBills[j].sum_out = (paginatedBills[j+1].sum_out*1 + paginatedBills[j].AMOUNT*1).toFixed(2);
              paginatedBills[j].sum_in = paginatedBills[j+1].sum_in;
              paginatedBills[j].sum_trans = paginatedBills[j+1].sum_trans;
            }
            if (paginatedBills[j].NATURE=="收入") {
              paginatedBills[j].sum_out = paginatedBills[j+1].sum_out;
              paginatedBills[j].sum_in = (paginatedBills[j+1].sum_in*1 + paginatedBills[j].AMOUNT*1).toFixed(2);
              paginatedBills[j].sum_trans = paginatedBills[j+1].sum_trans;
            }
            if (paginatedBills[j].NATURE=="转账") {
              paginatedBills[j].sum_out = paginatedBills[j+1].sum_out;
              paginatedBills[j].sum_in = paginatedBills[j+1].sum_in;
              paginatedBills[j].sum_trans = (paginatedBills[j+1].sum_trans*1 + paginatedBills[j].AMOUNT*1).toFixed(2);
            }
          } else {
            if (paginatedBills[j].NATURE=="支出") {
              paginatedBills[j].sum_out = paginatedBills[j].AMOUNT;
              paginatedBills[j].sum_in = "0.00";
              paginatedBills[j].sum_trans = "0.00";
            }
            if (paginatedBills[j].NATURE=="收入") {
              paginatedBills[j].sum_out = "0.00";
              paginatedBills[j].sum_in = paginatedBills[j].AMOUNT;
              paginatedBills[j].sum_trans = "0.00";
            }
            if (paginatedBills[j].NATURE=="转账") {
              paginatedBills[j].sum_out = "0.00";
              paginatedBills[j].sum_in = "0.00";
              paginatedBills[j].sum_trans = paginatedBills[j].AMOUNT;
            }
          }
        }
      }
      this.curPageBills = paginatedBills;
      this.prevPage = curPage - 1;
      this.nextPage = curPage == lastPage ? 0 : curPage + 1;
    },
    loadBillThisMonth() {
      var dateObj = this.getThisMonth();
      this.filter.startDate = dateObj.startDate;
      this.filter.endDate = dateObj.endDate;
      this.loadNewBill(1);
    },
    loadBillToday() {
      var dateObj = this.getToday();
      this.filter.startDate = dateObj.startDate;
      this.filter.endDate = dateObj.endDate;
      this.loadNewBill(1);
    },
    goToPrev() {
      if (this.prevPage == 0) return;
      this.curPage--;
      this.loadBill();
      this.searchWithinPage();
    },
    goToNext() {
      if (this.nextPage == 0) return;
      this.curPage++;
      this.loadBill();
      this.searchWithinPage();
    },
    showBillDetail(idx) {
      this.showOverlay();
      this.isShowBill = true;
      this.billTemplateName = "";
      if (idx != -1) {
        var bill = this.curPageBills[idx];
        this.isUpdateBill = true;
        this.billSelected = newBill(bill);
        this.billSelectedCopy = newBill(bill);
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
          curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate.getDate();
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
      var uid = this.uid;
      if (isOK_1 && isOK_2 && isOK_3 && isOK_4) {
        if (confirm("确认更新吗？")) {
          var bill = newBill(this.billSelected);
          bill.DATE = [
            this.billSelected.year,
            this.billSelected.month,
            this.billSelected.day
          ].join("-");

          //update account balance
          var oldBill = this.billSelectedCopy;
          var reverseACC_IN = oldBill.ACC_IN;
          var reverseACC_OUT = oldBill.ACC_OUT;
          var reverseAmount = oldBill.AMOUNT;
          var accArr = this.accounts;
          for (let i = 0; i < accArr.length; i++) {
            if (accArr[i].NAME==reverseACC_IN) {
              let num = accArr[i].balance*100 - reverseAmount*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
            if (accArr[i].NAME==reverseACC_OUT) {
              let num = accArr[i].balance*100 + reverseAmount*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
            if (accArr[i].NAME==bill.ACC_OUT) {
              let num = accArr[i].balance*100 - bill.AMOUNT*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
            if (accArr[i].NAME==bill.ACC_IN) {
              let num = accArr[i].balance*100 + bill.AMOUNT*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
          }

          //update bill
          await setDoc(doc(db, "BOOK/"+uid+"/BILL", bill.id), bill);
          this.isShowOverlay = false;
          this.isShowBill = false;
          this.loadNewBill(this.curPage);
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
      var uid = this.uid;
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

          //update account balance
          var accArr = this.accounts;
          for (let i = 0; i < accArr.length; i++) {
            if (accArr[i].NAME==bill.ACC_OUT) {
              let num = accArr[i].balance*100 - bill.AMOUNT*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
            if (accArr[i].NAME==bill.ACC_IN) {
              let num = accArr[i].balance*100 + bill.AMOUNT*100;
              accArr[i].balance = (num/100).toFixed(2);
              await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
            }
          }

          //此处提交新账单   
          await setDoc(doc(db, "BOOK/"+uid+"/BILL", bill.id), bill);
          //提交新账单
          this.isShowOverlay = false;
          this.isShowBill = false;
          this.loadNewBill(1);
        }
      } else {
        alert("请填写所有必填项");
      }
    },
    async delBill(bill) {
      if (confirm("确认删除吗？")) {
        var uid = this.uid;

        //update account balance
        var reverseACC_IN = bill.ACC_IN;
        var reverseACC_OUT = bill.ACC_OUT;
        var reverseAmount = bill.AMOUNT;
        var accArr = this.accounts;
        for (let i = 0; i < accArr.length; i++) {
          if (accArr[i].NAME==reverseACC_IN) {
            let num = accArr[i].balance*100 - reverseAmount*100;
            accArr[i].balance = (num/100).toFixed(2);
            await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
          }
          if (accArr[i].NAME==reverseACC_OUT) {
            let num = accArr[i].balance*100 + reverseAmount*100;
            accArr[i].balance = (num/100).toFixed(2);
            await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", accArr[i].id), accArr[i]);
          }
        }

        //删除之后重新载入
        await deleteDoc(doc(db, "BOOK/"+uid+"/BILL", bill.id));
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
        var uid = this.uid;
        this.accounts = [];
        for (let i = 0; i < accArr.length; i++) {
          let idNum = i < 9 ? "00" + (i+1) : i < 99 ? "0" + (i+1) : i+1;
          if (accArr[i].NAME && accArr[i].TYPE) {
            this.accounts.push({
              id: "ACC" + idNum,
              NAME: accArr[i].NAME,
              TYPE: accArr[i].TYPE,
              initialBalance: accArr[i].initialBalance,
              balance: accArr[i].balance
            });
            await setDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", "ACC"+idNum),{
              id: "ACC" + idNum,
              NAME: accArr[i].NAME,
              TYPE: accArr[i].TYPE,
              initialBalance: accArr[i].initialBalance,
              balance: accArr[i].balance
            });
          } else {
            await deleteDoc(doc(db, "BOOK/"+uid+"/ACCOUNT", "ACC"+idNum));
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
        var uid = this.uid;
        var catArr = this.catEditing;
        this.categories = [{ id: "CAT000", NAME: "转账", TYPE: "转账" }];
        for (let i = 0; i < catArr.length; i++) {
          let idNum = i < 9 ? "00" + (i+1) : i < 99 ? "0" + (i+1) : (i+1);
          if (catArr[i].NAME && catArr[i].TYPE) { 
            this.categories.push({
              id: "CAT" + idNum,
              NAME: catArr[i].NAME,
              TYPE: catArr[i].TYPE
            });
            await setDoc(doc(db, "BOOK/"+uid+"/CATEGORY", "CAT"+idNum),{
              id: "CAT" + idNum,
              NAME: catArr[i].NAME,
              TYPE: catArr[i].TYPE
            });
          } else {
            await deleteDoc(doc(db, "BOOK/"+uid+"/CATEGORY", "CAT"+idNum));
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
          initialBalance: accounts[i].initialBalance,
          balance: accounts[i].balance,
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
      var getSumObj = function (NAME, TYPE, acc) {
        let expenseTotal = that.getExpenseTotal(acc.bills, NAME);
        let incomeTotal = that.getIncomeTotal(acc.bills, NAME);
        let reserveTotal = that.getReserveTotal(expenseTotal, incomeTotal);
        let balance = acc.balance;
        return {
          NAME,
          TYPE,
          expenseTotal,
          incomeTotal,
          reserveTotal,
          balance
        };
      };
      var result = [];
      for (let k = 0; k < typeNames.length; k++) {
        let tempType = typeNames[k];
        let typeArr = [];
        for (let m = 0; m < typeObj[tempType].length; m++) {
          let accName = typeObj[tempType][m];
          let sumObj = getSumObj(accName, tempType, accObj[accName]);
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
    getLoginInfo(myUser) {
      var email = myUser.email;
      var password = myUser.password;
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.uid = userCredential.user.uid;
        localStorage.setItem("uid",userCredential.user.uid);
        this.isLoggedin = true;
        this.login_errMsg = "";
        this.init();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        localStorage.removeItem("uid");
        this.login_errMsg = errorMessage;
      });
    },
    logout() {
      signOut(auth).then(() => {
        // Sign-out successful.
        this.uid = "";
        localStorage.removeItem("uid");
        this.isLoggedin = false;
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
    },
    getLastMonth() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var lastMonthMonth = month==1?12:month-1;
      var lastMonthYear = lastMonthMonth==12?year-1:year;
      var tempDate = new Date(lastMonthYear,lastMonthMonth-1,day);
      var tempDay = tempDate.getDate();
      var tempDate2 = tempDay<day?new Date(lastMonthYear,lastMonthMonth-1,day-tempDay):tempDate;
      var lastMonthDay = tempDate2.getDate()+1;
      lastMonthDay = lastMonthDay < 10 ? "0" + lastMonthDay : lastMonthDay;
      var lastMonthFull = new Date(lastMonthYear,lastMonthMonth,lastMonthDay);
      var laMonth = lastMonthFull.getMonth();
      laMonth = laMonth < 10 ? "0" + laMonth : laMonth;
      var laDay = lastMonthFull.getDate();
      laDay = laDay < 10 ? "0" + laDay : laDay;
      return {
        startDate: {
          year: lastMonthYear,
          month: laMonth,
          day: laDay
        },
        endDate: {
          year,
          month,
          day
        }
      }
    },
    getThisMonth() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return {
        startDate: {
          year: year,
          month: month,
          day: "01"
        },
        endDate: {
          year,
          month,
          day
        }
      }
    },
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return {
        startDate: {
          year: year,
          month: month,
          day: day
        },
        endDate: {
          year,
          month,
          day
        }
      }
    },
    init() {
      var dateObj = this.getLastMonth();
      this.filter.startDate = dateObj.startDate;
      this.filter.endDate = dateObj.endDate;
      this.loadNewBill(1);
    },
    loadToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      month = month<10?"0"+month:month;
      var day = date.getDate();
      day = day<10?"0"+day:day;
      this.billSelected.year = year;
      this.billSelected.month = month;
      this.billSelected.day = day;
      this.billSelected.DATE = [year, month, day].join("-");
    },
    loadBillTemplate() {
      var billTemplateName = this.billTemplateName;
      var billTemplates = this.billTemplates;
      for (let i = 0; i < billTemplates.length; i++) {
        if (billTemplateName==billTemplates[i].NAME) {
          let year = this.billSelected.year;
          let month = this.billSelected.month;
          let day = this.billSelected.day;
          this.billSelected = newBill(billTemplates[i]);
          this.billSelected.year = year;
          this.billSelected.month = month;
          this.billSelected.day = day;
          this.billSelected.DATE = [year, month, day].join("-");
          return;
        }
      }
    },
    async saveBillTemplate() {
      if(confirm("确定保存模板吗？")) {
        var billName = this.billSelected.NAME;
        var billTemplates = this.billTemplates;
        var len = billTemplates.length;
        var bill = newBill(this.billSelected);
        bill.DATE = "";
        var id = "";
        var uid = this.uid;
        for (let i = 0; i < len; i++) {
          if (billName==billTemplates[i].NAME) {
            id = billTemplates[i].id;
            bill.id = id;
            await setDoc(doc(db, "BOOK/"+uid+"/BILL_template", id), bill);
            const querySnapshot4 = await getDocs(collection(db, "BOOK/"+uid+"/BILL_template"));
            this.billTemplates = [];
            this.billTemplateOption = [];
            querySnapshot4.forEach((doc) => {
              let temp = doc.data();
              temp.id = doc.id;
              this.billTemplateOption.push(temp.NAME);
              this.billTemplates.push(newBill(temp));
            });
            return;
          }
        }
        id = len<9?"template00"+(len+1):len<99?"template0"+(len+1):"template"+(len+1);
        bill.id = id;
        await setDoc(doc(db, "BOOK/"+uid+"/BILL_template", id), bill);
        const querySnapshot4 = await getDocs(collection(db, "BOOK/"+uid+"/BILL_template"));
        this.billTemplates = [];
        this.billTemplateOption = [];
        querySnapshot4.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          this.billTemplateOption.push(temp.NAME);
          this.billTemplates.push(newBill(temp));
        });
      }
    },
    async delBillTemplate() {
      var billName = this.billSelected.NAME;
      var billTemplates = this.billTemplates;
      var uid = this.uid;
      var len = billTemplates.length;
      for (let i = 0; i < len; i++) {
        if (billName==billTemplates[i].NAME) {
          var id = billTemplates[i].id;
          if(confirm("确定删除模板吗？")) {
            await deleteDoc(doc(db, "BOOK/"+uid+"/BILL_template", id));
            const querySnapshot4 = await getDocs(collection(db, "BOOK/"+uid+"/BILL_template"));
            this.billTemplates = [];
            this.billTemplateOption = [];
            querySnapshot4.forEach((doc) => {
              let temp = doc.data();
              temp.id = doc.id;
              this.billTemplateOption.push(temp.NAME);
              this.billTemplates.push(newBill(temp));
            });
            return;
          }
        }
      }
      alert("没有这个模板");
    }
  },
  created() {
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
select, input, textarea {
  font-size: 16px;
}
.no-decor-link {
  color: inherit;
  text-decoration: none;
}
.no-decor-link:visited {
  color: inherit;
}
.main-container {
  margin: 0px auto;
  width: 800px;
  max-width: 100%;
}
.sum-up {
  line-height: 32px;
}
.bills {
  margin: 10px auto;
  max-width: 800px;
  text-align: left;
  border: solid gray 1px;
}
.bill-unit {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid silver;
}
.act-btn-container {
  width: 20%;
  text-align: center;
  display: inline-block;
}
.bill-data-container {
  width: 80%;
  display: inline-block;
}
.bill-data {
  width: 50%;
  display: inline-block;
}
.loadbill-setting {
  position: relative;
  margin: 10px auto;
  padding: 0px 10px;
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
}
.view-acc {
  margin-bottom: 10px;
}
.show {
  display: block;
}
.inline {
  display: inline-block;
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
.gray {
  color: gray;
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
.date {
  padding-top: 10px;
  padding-left: 10px;
}
.date-decor {
  border-top: 2px solid silver;
}
@media all and (max-width: 450px) {
  .hide-on-mobile {
    display: none;
  }
  .bills {
    width: 100%;
    border-left: none;
    border-right: none;
  }
  .view-container {
    max-height: 400px;
    overflow-y: scroll;
  }
}
</style>
