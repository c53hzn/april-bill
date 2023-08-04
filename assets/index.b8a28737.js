import{o as e,c as t,a as l,w as i,v as a,b as s,t as n,d as o,F as r,r as d,e as c,f as h,g as u,h as p}from"./vendor.ef21aba8.js";import{initializeApp as g}from"https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";import{getFirestore as m,getDocs as b,collection as T,query as A,where as y,orderBy as C,setDoc as v,doc as E,deleteDoc as O}from"https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";import{getAuth as S,signInWithEmailAndPassword as N,signOut as f}from"https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(l){const i=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((l,s)=>{const n=new URL(e,i);if(self[t].moduleMap[n])return l(self[t].moduleMap[n]);const o=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){s(new Error(`Failed to import: ${e}`)),a(r)},onload(){l(self[t].moduleMap[n]),a(r)}});document.head.appendChild(r)})),self[t].moduleMap={}}}("/april-bill/assets/");const w={},U={id:"forkongithub"},x=l("a",{target:"_blank",href:"https://github.com/c53hzn/april-bill"},"Fork me on GitHub",-1);w.render=function(l,i){return e(),t("span",U,[x])};const M={props:["errorMsg"],data(){return{email:"",password:"",message:this.errorMsg}},methods:{login(){this.$emit("login",{email:this.email,password:this.password})}},watch:{errorMsg(e){this.message=e}}},B={id:"login"},D=l("h1",null,"四方账单",-1),Y={class:"login-container"},k=l("div",{style:{padding:"10px 20px",background:"rgb(249, 251, 254)","border-bottom":"solid silver 1px"}}," 邮箱密码登录 ",-1),P={style:{padding:"20px"}},R={style:{color:"red"}};M.render=function(o,r,d,c,h,u){return e(),t("div",B,[D,l("div",Y,[k,l("div",P,[l("p",null,[i(l("input",{placeholder:"输入邮箱",style:{width:"200px",height:"28px","padding-left":"10px",border:"solid silver 1px","border-radius":"4px"},type:"email","onUpdate:modelValue":r[1]||(r[1]=e=>h.email=e),onKeyup:r[2]||(r[2]=s(((...e)=>u.login&&u.login(...e)),["enter"]))},null,544),[[a,h.email]])]),l("p",null,[i(l("input",{placeholder:"输入密码",style:{width:"200px",height:"28px","padding-left":"10px",border:"solid silver 1px","border-radius":"4px"},type:"password","onUpdate:modelValue":r[3]||(r[3]=e=>h.password=e),onKeyup:r[4]||(r[4]=s(((...e)=>u.login&&u.login(...e)),["enter"]))},null,544),[[a,h.password]])]),l("p",null,[l("input",{style:{width:"200px",height:"34px",color:"white",background:"rgb(0, 153, 255)",border:"none","border-radius":"4px",cursor:"pointer"},type:"submit",value:"登录",onClick:r[5]||(r[5]=(...e)=>u.login&&u.login(...e))})])])]),l("p",R,n(h.message),1)])};var _=["01","02","03","04","05","06","07","08","09",10,11,12],V=["01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],I=V.concat([29]),L=I.concat([30]),K=L.concat([31]);const F={name:"DatePickerUnit",props:["startYear","endYear","year","month","day"],data(){return{monthOption:_,yearVal:this.year,monthVal:this.month,dayVal:this.day}},computed:{yearOption(){var e=(new Date).getFullYear(),t=this.startYear?this.startYear:e-10,l=this.endYear?this.endYear:e,i=[];for(let a=0;a<l-t+1;a++)i.push(t+a);return i},dayOption(){var e=this.yearVal,t=this.monthVal,l=this.dayVal,i=["01","03","05","07","08",10,12],a=["04","06","09",11];for(let s=0;s<i.length;s++)if(t==i[s])return K;for(let s=0;s<a.length;s++)if(t==a[s])return 31==l&&(this.dayVal=""),L;return e%4==0&&e%100!=0||e%400==0?(l>29&&(this.dayVal=""),I):(l>28&&(this.dayVal=""),V)}},methods:{getDateVal(){this.$emit("dateChanged",{year:this.yearVal,month:this.monthVal,day:this.dayVal})}},watch:{year(e){this.yearVal=e},month(e){this.monthVal=e},day(e){this.dayVal=e}}},j=c(" 年 "),G=c(" 月 "),W=c(" 日 ");F.render=function(a,s,c,h,u,p){return e(),t("div",null,[i(l("select",{class:"date-picker-select","onUpdate:modelValue":s[1]||(s[1]=e=>u.yearVal=e),onChange:s[2]||(s[2]=(...e)=>p.getDateVal&&p.getDateVal(...e))},[(e(!0),t(r,null,d(p.yearOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,u.yearVal]]),j,i(l("select",{class:"date-picker-select","onUpdate:modelValue":s[3]||(s[3]=e=>u.monthVal=e),onChange:s[4]||(s[4]=(...e)=>p.getDateVal&&p.getDateVal(...e))},[(e(!0),t(r,null,d(u.monthOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,u.monthVal]]),G,i(l("select",{class:"date-picker-select","onUpdate:modelValue":s[5]||(s[5]=e=>u.dayVal=e),onChange:s[6]||(s[6]=(...e)=>p.getDateVal&&p.getDateVal(...e))},[(e(!0),t(r,null,d(p.dayOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,u.dayVal]]),W])};const z=m(g({apiKey:"AIzaSyBzxFOF7P9rM5UvpKyUxHqlghUNJeuZzK8",authDomain:"april-bill.firebaseapp.com",projectId:"april-bill",storageBucket:"april-bill.appspot.com",messagingSenderId:"359825891077",appId:"1:359825891077:web:f421390c6f59d71f5ea16c"})),$=S();var H=!1,q=localStorage.getItem("uid");q?H=!0:q="";var J=function(e){return{NAME:e.NAME,ACC_IN:e.ACC_IN,ACC_OUT:e.ACC_OUT,AMOUNT:e.AMOUNT,CATEGORY:e.CATEGORY,DATE:e.DATE,NATURE:e.NATURE,NOTES:e.NOTES,REMARK:e.REMARK,id:e.id}},Z=function(e){return{id:e.id,NAME:e.NAME,TYPE:e.TYPE,initialBalance:e.initialBalance,balance:e.balance}},Q=function(e){return{id:e.id,NAME:e.NAME,TYPE:e.TYPE}},X={NAME:"",ACC_IN:"",ACC_OUT:"",AMOUNT:"",CATEGORY:"",DATE:"",NATURE:"",NOTES:"",REMARK:"",id:""};const ee={components:{ForkOnGithub:w,Login:M,DatePickerUnit:F},name:"April-Bill",data:()=>({perPageSelected:10,curPage:99,prevPage:0,nextPage:0,startYear:2020,endYear:2030,natureOption:["支出","收入","转账"],perPageOption:[10,20,50,100],pageNumOption:[],billTemplateOption:[],curPageBills:[],bills:[],accounts:[],categories:[],isShowOverlay:!1,isShowBill:!1,isShowAcc:!1,isShowCat:!1,isShowSumAcc:!1,isShowSumCat:!1,isUpdateBill:!0,billSelected:{},billSelectedCopy:{},billTemplateName:"",billTemplates:[],accEditing:[],catEditing:[],sumAcc:[],activeSumAccType:"",sumCat:[],activeSumCatType:"",expenseTotal:0,incomeTotal:0,reserveTotal:{val:0,text:"0.00"},filter:{startDate:{year:"",month:"",day:""},endDate:{year:"",month:"",day:""},perPage:10},searchKW:"",searchResultClass:[],isLoggedin:H,isGuestMode:!1,login_errMsg:"",uid:q}),computed:{prevNext(){return{prevStyle:this.prevPage?"":"disabled",nextStyle:this.nextPage?"":"disabled"}},categoryOption(){var e=this.billSelected.NATURE,t=[];for(let l=0;l<this.categories.length;l++)this.categories[l].TYPE==e&&t.push(this.categories[l].NAME);return t}},methods:{async loadNewBill(e){var t=this.uid;const l=await b(T(z,"BOOK/"+t+"/ACCOUNT")),i=await b(T(z,"BOOK/"+t+"/CATEGORY")),a=T(z,"BOOK/"+t+"/BILL");var s=[this.filter.startDate.year,this.filter.startDate.month,this.filter.startDate.day].join("-"),n=[this.filter.endDate.year,this.filter.endDate.month,this.filter.endDate.day].join("-");const o=A(a,y("DATE",">=",s),y("DATE","<=",n),C("DATE","desc")),r=await b(o),d=await b(T(z,"BOOK/"+t+"/BILL_template"));this.accounts=[],l.forEach((e=>{let t=e.data();t.id=e.id,this.accounts.push(Z(t))})),this.categories=[],i.forEach((e=>{let t=e.data();t.id=e.id,this.categories.push(Q(t))})),this.bills=[],r.forEach((e=>{let t=e.data();t.id=e.id,this.bills.push(J(t))})),this.billTemplateOption=[],this.billTemplates=[],d.forEach((e=>{let t=e.data();t.id=e.id,this.billTemplateOption.push(t.NAME),this.billTemplates.push(J(t))}));var c=this.bills.length,h=this.perPageSelected,u=Math.ceil(c/h),p=[];for(let g=1;g<u+1;g++)p.push(g);this.pageNumOption=p,this.filter.perPage=h,this.curPage=e,this.loadBill(),this.expenseTotal=this.getExpenseTotal(this.bills),this.incomeTotal=this.getIncomeTotal(this.bills),this.reserveTotal=this.getReserveTotal(this.expenseTotal,this.incomeTotal),this.getSumAcc(),this.getSumCat(),this.clearSearch()},loadBill(){var e=this.bills.length,t=this.curPage,l=this.filter.perPage;if(0!=e){var i=Math.ceil(e/l),a=this.skipNumber(),s=this.bills.slice(a,a+l);s[0].DATE_display=s[0].DATE;for(let e=1;e<s.length;e++)s[e].DATE!=s[e-1].DATE?s[e].DATE_display=s[e].DATE:s[e].DATE_display="";this.curPageBills=s,this.prevPage=t-1,this.nextPage=t==i?0:t+1}else this.curPageBills=[]},goToPrev(){0!=this.prevPage&&(this.curPage--,this.loadBill())},goToNext(){0!=this.nextPage&&(this.curPage++,this.loadBill())},showBillDetail(e){if(this.showOverlay(),this.isShowBill=!0,this.billTemplateName="",-1!=e){var t=this.curPageBills[e];this.isUpdateBill=!0,this.billSelected=J(t),this.billSelectedCopy=J(t),this.billSelected.year=t.DATE.substring(0,4),this.billSelected.month=t.DATE.substring(5,7),this.billSelected.day=t.DATE.substring(8,10)}else{this.isUpdateBill=!1,this.billSelected=J(X);let e=new Date,t=e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,l=e.getDate()<9?"0"+e.getDate():e.getDate();this.billSelected.year=e.getFullYear(),this.billSelected.month=t,this.billSelected.day=l,this.billSelected.DATE=[e.getFullYear(),t,l].join("-")}},showAccDetail(){this.showOverlay(),this.isShowAcc=!0,this.accEditing=[];var e=this.accounts;for(let t=0;t<e.length;t++)this.accEditing.push(Z(e[t]))},showCatDetail(){this.showOverlay(),this.isShowCat=!0,this.catEditing=[];var e=this.categories;for(let t=1;t<e.length;t++)this.catEditing.push(Q(e[t]))},showSumAcc(){this.showOverlay(),this.isShowSumAcc=!0,this.sumAcc.length&&this.setActiveSumAccType(this.sumAcc[0][0].TYPE)},showSumCat(){this.showOverlay(),this.isShowSumCat=!0,this.sumCat.length&&this.setActiveSumCatType(this.sumCat[0][0].TYPE)},showOverlay(){this.isShowOverlay=!0},hideOverlay(){this.isShowOverlay=!1,this.isShowBill=!1,this.isShowAcc=!1,this.isShowCat=!1,this.isShowSumAcc=!1,this.isShowSumCat=!1},async updateBill(){var e=!!this.billSelected.NAME&&!!this.billSelected.AMOUNT,t=!1;t="转账"==this.billSelected.NATURE?!!this.billSelected.ACC_OUT&&!!this.billSelected.ACC_IN:!!this.billSelected.ACC_OUT||!!this.billSelected.ACC_IN;var l=!!this.billSelected.CATEGORY&&!!this.billSelected.DATE,i=!!this.billSelected.NATURE,a=this.uid;if(e&&t&&l&&i){if(confirm("确认更新吗？")){var s=J(this.billSelected);s.DATE=[this.billSelected.year,this.billSelected.month,this.billSelected.day].join("-");var n=this.billSelectedCopy,o=n.ACC_IN,r=n.ACC_OUT,d=n.AMOUNT,c=this.accounts;for(let e=0;e<c.length;e++){if(c[e].NAME==o){let t=100*c[e].balance-100*d;c[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",c[e].id),c[e])}if(c[e].NAME==r){let t=100*c[e].balance+100*d;c[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",c[e].id),c[e])}if(c[e].NAME==s.ACC_OUT){let t=100*c[e].balance-100*s.AMOUNT;c[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",c[e].id),c[e])}if(c[e].NAME==s.ACC_IN){let t=100*c[e].balance+100*s.AMOUNT;c[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",c[e].id),c[e])}}await v(E(z,"BOOK/"+a+"/BILL",s.id),s),this.isShowOverlay=!1,this.isShowBill=!1,this.loadNewBill(this.curPage)}}else alert("请填写所有必填项")},async addBill(){var e=!!this.billSelected.NAME&&!!this.billSelected.AMOUNT,t=!1;t="转账"==this.billSelected.NATURE?!!this.billSelected.ACC_OUT&&!!this.billSelected.ACC_IN:!!this.billSelected.ACC_OUT||!!this.billSelected.ACC_IN;var l=!!this.billSelected.CATEGORY&&!!this.billSelected.DATE,i=!!this.billSelected.NATURE,a=this.uid;if(e&&t&&l&&i){if(confirm("确认新建吗？")){var s=new Date,n=s.getFullYear(),o=s.getMonth()+1;o=o<10?"0"+o:o;var r=s.getDate();r=r<10?"0"+r:r;var d=s.getHours();d=d<10?"0"+d:d;var c=s.getMinutes();c=c<10?"0"+c:c;var h=s.getSeconds(),u="BILL"+[n,o,r,d,c,h=h<10?"0"+h:h].join(""),p=J(this.billSelected);p.DATE=[this.billSelected.year,this.billSelected.month,this.billSelected.day].join("-"),p.id=u;var g=this.accounts;for(let e=0;e<g.length;e++){if(g[e].NAME==p.ACC_OUT){let t=100*g[e].balance-100*p.AMOUNT;g[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",g[e].id),g[e])}if(g[e].NAME==p.ACC_IN){let t=100*g[e].balance+100*p.AMOUNT;g[e].balance=(t/100).toFixed(2),await v(E(z,"BOOK/"+a+"/ACCOUNT",g[e].id),g[e])}}await v(E(z,"BOOK/"+a+"/BILL",p.id),p),this.isShowOverlay=!1,this.isShowBill=!1,this.loadNewBill(1)}}else alert("请填写所有必填项")},async delBill(e){if(confirm("确认删除吗？")){var t=this.uid,l=e.ACC_IN,i=e.ACC_OUT,a=e.AMOUNT,s=this.accounts;for(let e=0;e<s.length;e++){if(s[e].NAME==l){let l=100*s[e].balance-100*a;s[e].balance=(l/100).toFixed(2),await v(E(z,"BOOK/"+t+"/ACCOUNT",s[e].id),s[e])}if(s[e].NAME==i){let l=100*s[e].balance+100*a;s[e].balance=(l/100).toFixed(2),await v(E(z,"BOOK/"+t+"/ACCOUNT",s[e].id),s[e])}}await O(E(z,"BOOK/"+t+"/BILL",e.id)),this.loadNewBill(this.curPage)}},addAcc(e){var t=e<9?"00"+(e+1):e<99?"0"+(e+1):e+1;this.accEditing.push({id:"ACC"+t,NAME:"",TYPE:""})},async updateAcc(){if(confirm("确认更新吗？")){var e=this.accEditing,t=this.uid;this.accounts=[];for(let l=0;l<e.length;l++){let i=l<9?"00"+(l+1):l<99?"0"+(l+1):l+1;e[l].NAME&&e[l].TYPE?(this.accounts.push({id:"ACC"+i,NAME:e[l].NAME,TYPE:e[l].TYPE,initialBalance:e[l].initialBalance,balance:e[l].balance}),await v(E(z,"BOOK/"+t+"/ACCOUNT","ACC"+i),{id:"ACC"+i,NAME:e[l].NAME,TYPE:e[l].TYPE,initialBalance:e[l].initialBalance,balance:e[l].balance})):await O(E(z,"BOOK/"+t+"/ACCOUNT","ACC"+i))}this.hideOverlay(),this.getSumAcc()}},addCat(e){var t=e<10?"00"+e:e<100?"0"+e:e;this.catEditing.push({id:"CAT"+t,NAME:"",TYPE:""})},async updateCat(){if(confirm("确认更新吗？")){var e=this.uid,t=this.catEditing;this.categories=[{id:"CAT000",NAME:"转账",TYPE:"转账"}];for(let l=0;l<t.length;l++){let i=l<9?"00"+(l+1):l<99?"0"+(l+1):l+1;t[l].NAME&&t[l].TYPE?(this.categories.push({id:"CAT"+i,NAME:t[l].NAME,TYPE:t[l].TYPE}),await v(E(z,"BOOK/"+e+"/CATEGORY","CAT"+i),{id:"CAT"+i,NAME:t[l].NAME,TYPE:t[l].TYPE})):await O(E(z,"BOOK/"+e+"/CATEGORY","CAT"+i))}this.hideOverlay(),this.getSumCat()}},loadCategory(){"支出"==this.billSelected.NATURE&&(this.billSelected.ACC_IN=""),"收入"==this.billSelected.NATURE&&(this.billSelected.ACC_OUT=""),"转账"==this.billSelected.NATURE&&(this.billSelected.CATEGORY="转账")},skipNumber(){var e=this.bills.length,t=this.filter.perPage,l=this.curPage,i=Math.ceil(e/t);return 1===l?0:l===i?e-(e%t==0?t:e%t):(l-1)*t},setActiveSumAccType(e){this.activeSumAccType=e},setActiveSumCatType(e){this.activeSumCatType=e},getExpenseTotal:(e,t)=>e.reduce((function(e,l){if("支出"==l.NATURE){return((100*e+100*l.AMOUNT)/100).toFixed(2)}if(t&&l.ACC_OUT==t){return((100*e+100*l.AMOUNT)/100).toFixed(2)}return(1*e).toFixed(2)}),(0).toFixed(2)),getIncomeTotal:(e,t)=>e.reduce((function(e,l){if("收入"==l.NATURE){return((100*e+100*l.AMOUNT)/100).toFixed(2)}if(t&&l.ACC_IN==t){return((100*e+100*l.AMOUNT)/100).toFixed(2)}return(1*e).toFixed(2)}),(0).toFixed(2)),getReserveTotal(e,t){let l=(100*t-100*e)/100,i=String(l>0?l.toFixed(2):(-1*l).toFixed(2));return{val:l,text:i}},getSumAcc(){var e=this,t=this.accounts,l={};for(let r=0;r<t.length;r++)l[t[r].NAME]={TYPE:t[r].TYPE,initialBalance:t[r].initialBalance,balance:t[r].balance,bills:[]};var i={};for(let r=0;r<t.length;r++)i[t[r].TYPE]?i[t[r].TYPE].push(t[r].NAME):i[t[r].TYPE]=[t[r].NAME];var a=Object.keys(i),s=this.bills;for(let r=0;r<s.length;r++)"支出"==s[r].NATURE?l[s[r].ACC_OUT]&&l[s[r].ACC_OUT].bills.push(s[r]):"收入"==s[r].NATURE?l[s[r].ACC_IN]&&l[s[r].ACC_IN].bills.push(s[r]):(l[s[r].ACC_OUT].bills.push(s[r]),l[s[r].ACC_IN].bills.push(s[r]));var n=function(t,l,i){let a=e.getExpenseTotal(i.bills,t),s=e.getIncomeTotal(i.bills,t);return{NAME:t,TYPE:l,expenseTotal:a,incomeTotal:s,reserveTotal:e.getReserveTotal(a,s),balance:i.balance}},o=[];for(let r=0;r<a.length;r++){let e=a[r],t=[];for(let a=0;a<i[e].length;a++){let s=i[e][a],o=n(s,e,l[s]);t.push(o)}o.push(t)}this.sumAcc=o,this.setActiveSumAccType(o[0][0].TYPE)},getSumCat(){var e=this.categories,t={};for(let d=0;d<e.length;d++)t[e[d].NAME]={TYPE:e[d].TYPE,bills:[]};var l={"支出":[],"收入":[],"转账":[]};for(let d=0;d<e.length;d++)l[e[d].TYPE].push(e[d].NAME);var i=["支出","收入","转账"],a=this.bills;for(let d=0;d<a.length;d++)t[a[d].CATEGORY]&&t[a[d].CATEGORY].bills.push(a[d]);var s,n,o,r=[];for(let d=0;d<i.length;d++){let e=i[d],a=[];for(let i=0;i<l[e].length;i++){let r=l[e][i],d=(s=r,n=e,o=t[r].bills,{NAME:s,TYPE:n,total:o.reduce((function(e,t){return((100*e+100*t.AMOUNT)/100).toFixed(2)}),(0).toFixed(2))});a.push(d)}r.push(a)}this.sumCat=r,this.setActiveSumCatType(r[0][0].TYPE)},getReserveClass(e){let t=e<0;return{"txt-green":!t,"txt-red":t}},getTypeClass:e=>({"txt-green":"收入"==e,"txt-red":"支出"==e}),getTxtClass:e=>({green:"收入"==e,red:"支出"==e,orange:"转账"==e}),getSumAccTypeClass(e){let t=e==this.activeSumAccType;return{show:t,hide:!t}},getSumAccBtnClass(e){return{disabled:e==this.activeSumAccType}},getSumCatTypeClass(e){let t=e==this.activeSumCatType;return{show:t,hide:!t}},getSumCatBtnClass(e){return{disabled:e==this.activeSumCatType}},changeBillDate(e){this.billSelected.year=e.year,this.billSelected.month=e.month,this.billSelected.day=e.day,this.billSelected.DATE=[e.year,e.month,e.day].join("-")},changeFilterStartDate(e){this.filter.startDate.year=e.year,this.filter.startDate.month=e.month,this.filter.startDate.day=e.day,this.filter.startDate.DATE=[e.year,e.month,e.day].join("-")},changeFilterEndDate(e){this.filter.endDate.year=e.year,this.filter.endDate.month=e.month,this.filter.endDate.day=e.day,this.filter.endDate.DATE=[e.year,e.month,e.day].join("-")},searchWithinPage(){var e=this.searchKW,t=this.curPageBills,l=[];for(let i=0;i<t.length;i++){-1!=[t[i].NAME,t[i].CATEGORY,t[i].ACC_IN,t[i].ACC_OUT].join("").indexOf(e)?l.push(""):l.push("hide")}this.searchResultClass=l},clearSearch(){this.searchKW="";var e=this.curPageBills,t=[];for(let l=0;l<e.length;l++)t.push("");this.searchResultClass=t},getLoginInfo(e){var t=e.email,l=e.password;N($,t,l).then((e=>{this.uid=e.user.uid,localStorage.setItem("uid",e.user.uid),this.isLoggedin=!0,this.login_errMsg="",this.init()})).catch((e=>{e.code;const t=e.message;localStorage.removeItem("uid"),this.login_errMsg=t}))},logout(){f($).then((()=>{this.uid="",localStorage.removeItem("uid"),this.isLoggedin=!1})).catch((e=>{console.log(e)}))},getLastMonth(){var e=new Date,t=e.getFullYear(),l=e.getMonth()+1,i=e.getDate();i=i<10?"0"+i:i;var a=1==(l=l<10?"0"+l:l)?12:l-1,s=12==(a=a<10?"0"+a:a)?t-1:t,n=new Date(s,a-1,i),o=n.getDate(),r=(o<i?new Date(s,a-1,i-o):n).getDate();return{startDate:{year:s,month:a,day:r=r<10?"0"+r:r},endDate:{year:t,month:l,day:i}}},init(){var e=this.getLastMonth();this.filter.startDate=e.startDate,this.filter.endDate=e.endDate,this.loadNewBill(1)},loadToday(){var e=new Date,t=e.getFullYear(),l=e.getMonth()+1;l=l<10?"0"+l:l;var i=e.getDate();i=i<10?"0"+i:i,this.billSelected.year=t,this.billSelected.month=l,this.billSelected.day=i,this.billSelected.DATE=[t,l,i].join("-")},loadBillTemplate(){var e=this.billTemplateName,t=this.billTemplates;for(let l=0;l<t.length;l++)if(e==t[l].NAME){let e=this.billSelected.year,i=this.billSelected.month,a=this.billSelected.day;return this.billSelected=J(t[l]),this.billSelected.year=e,this.billSelected.month=i,this.billSelected.day=a,void(this.billSelected.DATE=[e,i,a].join("-"))}},async saveBillTemplate(){if(confirm("确定保存模板吗？")){var e=this.billSelected.NAME,t=this.billTemplates,l=t.length,i=J(this.billSelected);i.DATE="";var a="",s=this.uid;for(let o=0;o<l;o++)if(e==t[o].NAME){a=t[o].id,i.id=a,await v(E(z,"BOOK/"+s+"/BILL_template",a),i);const e=await b(T(z,"BOOK/"+s+"/BILL_template"));return this.billTemplates=[],this.billTemplateOption=[],void e.forEach((e=>{let t=e.data();t.id=e.id,this.billTemplateOption.push(t.NAME),this.billTemplates.push(J(t))}))}a=l<9?"template00"+(l+1):l<99?"template0"+(l+1):"template"+(l+1),i.id=a,await v(E(z,"BOOK/"+s+"/BILL_template",a),i);const n=await b(T(z,"BOOK/"+s+"/BILL_template"));this.billTemplates=[],this.billTemplateOption=[],n.forEach((e=>{let t=e.data();t.id=e.id,this.billTemplateOption.push(t.NAME),this.billTemplates.push(J(t))}))}},async delBillTemplate(){var e=this.billSelected.NAME,t=this.billTemplates,l=this.uid,i=t.length;for(let s=0;s<i;s++)if(e==t[s].NAME){var a=t[s].id;if(confirm("确定删除模板吗？")){await O(E(z,"BOOK/"+l+"/BILL_template",a));const e=await b(T(z,"BOOK/"+l+"/BILL_template"));return this.billTemplates=[],this.billTemplateOption=[],void e.forEach((e=>{let t=e.data();t.id=e.id,this.billTemplateOption.push(t.NAME),this.billTemplates.push(J(t))}))}}alert("没有这个模板")}},created(){this.isLoggedin&&this.init()}},te={id:"app"},le={key:0,class:"main-container"},ie={class:"loadbill-setting"},ae=l("h3",null,"筛选条件",-1),se={class:"loadbill-set-unit"},ne=c(" 开始时间 "),oe=c(" 结束时间 "),re={class:"loadbill-set-unit"},de=c(" 每页条数 "),ce=l("span",null," ",-1),he=l("hr",null,null,-1),ue={style:{"margin-bottom":"10px"}},pe={style:{position:"relative","text-align":"left"}},ge={class:"sum-up"},me=c(" 支出:   "),be={class:"txt-red"},Te=l("br",null,null,-1),Ae={class:"sum-up"},ye=c(" 收入:   "),Ce={class:"txt-green"},ve=l("br",null,null,-1),Ee={class:"sum-up"},Oe=c(" 结余:   "),Se={style:{position:"absolute",right:"0px",bottom:"2px","text-align":"right"}},Ne=l("br",null,null,-1),fe=l("br",null,null,-1),we={style:{"margin-bottom":"10px"}},Ue={class:"pagenation-container"},xe={style:{position:"relative",margin:"10px auto",width:"230px"}},Me=c(" 在此页搜索 "),Be={class:"bills"},De={class:"table"},Ye={key:0,class:"text-start date"},ke={class:"act-btn-container"},Pe=l("i",{class:"fa-solid fa-eye"},null,-1),Re=l("i",{class:"fa-solid fa-trash-can"},null,-1),_e={class:"bill-data-container"},Ve={class:"bill-data"},Ie={class:"bill-data"},Le={key:0,class:"fa-solid fa-arrow-up green"},Ke={key:1,class:"fa-solid fa-arrow-down red"},Fe={key:2,class:"fa-solid fa-repeat orange"},je={class:"gray"},Ge={key:0,class:"bill-data"},We={key:1,class:"bill-data"},ze=l("i",{style:{color:"red"},class:"fa-solid fa-arrow-down"},null,-1),$e={key:2,class:"bill-data"},He=l("i",{style:{color:"green"},class:"fa-solid fa-arrow-up"},null,-1),qe={style:{display:"block","margin-bottom":"10px"}},Je=c("日期: "),Ze={style:{display:"block","margin-bottom":"10px"}},Qe=c("模板: "),Xe=c(" 事项: "),et=c(" 性质: "),tt=l("br",null,null,-1),lt=c(" 分类: "),it=c(" 支出账户: "),at=c(" 收入账户: "),st=c(" 金额: "),nt=c(" 备注: "),ot=c(" 详细描述: "),rt={style:{"text-align":"center"}},dt=l("br",null,null,-1),ct=l("br",null,null,-1),ht=c(" 账户名: "),ut=l("br",null,null,-1),pt=c(" 类型名: "),gt=l("br",null,null,-1),mt=c(" 初始值: "),bt=l("br",null,null,-1),Tt=c(" 现余额: "),At={style:{"text-align":"center"}},yt=l("br",null,null,-1),Ct=c(" 分类: "),vt=l("br",null,null,-1),Et=c(" 性质: "),Ot=l("option",null,"收入",-1),St=l("option",null,"支出",-1),Nt={style:{"text-align":"center"}},ft=l("br",null,null,-1),wt={key:0},Ut=l("hr",null,null,-1),xt={style:{"font-size":"16px"}},Mt={class:"sum-up"},Bt=c(" 支出:   "),Dt={class:"txt-red"},Yt=l("br",null,null,-1),kt={class:"sum-up"},Pt=c(" 收入:   "),Rt={class:"txt-green"},_t=l("br",null,null,-1),Vt={class:"sum-up"},It=c(" 结余:   "),Lt={style:{"text-align":"center"}},Kt={key:0},Ft=l("hr",null,null,-1),jt={class:"sum-up"},Gt=c(" 金额:   "),Wt={style:{"text-align":"center"}};ee.render=function(s,p,g,m,b,T){const A=h("DatePickerUnit"),y=h("Login"),C=h("ForkOnGithub");return e(),t("div",te,[b.isLoggedin?(e(),t("div",le,[l("div",ie,[ae,l("div",se,[ne,l(A,{onDateChanged:T.changeFilterStartDate,startYear:b.startYear,endYear:b.endYear,year:b.filter.startDate.year,month:b.filter.startDate.month,day:b.filter.startDate.day},null,8,["onDateChanged","startYear","endYear","year","month","day"]),oe,l(A,{onDateChanged:T.changeFilterEndDate,startYear:b.startYear,endYear:b.endYear,year:b.filter.endDate.year,month:b.filter.endDate.month,day:b.filter.endDate.day},null,8,["onDateChanged","startYear","endYear","year","month","day"])]),l("div",re,[de,i(l("select",{"onUpdate:modelValue":p[1]||(p[1]=e=>b.perPageSelected=e)},[(e(!0),t(r,null,d(b.perPageOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],512),[[o,b.perPageSelected,void 0,{number:!0}]]),ce,l("button",{onClick:p[2]||(p[2]=e=>T.loadNewBill(1))},"加载账单")]),l("button",{onClick:p[3]||(p[3]=(...e)=>T.logout&&T.logout(...e)),style:{position:"absolute",top:"10px",right:"10px"}},"登出")]),he,l("div",ue,[l("button",{onClick:p[4]||(p[4]=(...e)=>T.showSumAcc&&T.showSumAcc(...e))},"查看账户汇总"),l("button",{onClick:p[5]||(p[5]=(...e)=>T.showSumCat&&T.showSumCat(...e))},"查看分类汇总")]),l("div",pe,[l("span",ge,[me,l("span",be,n(b.expenseTotal),1)]),Te,l("span",Ae,[ye,l("span",Ce,n(b.incomeTotal),1)]),ve,l("span",Ee,[Oe,l("span",{class:T.getReserveClass(b.reserveTotal.val)},n(b.reserveTotal.text),3)]),l("div",Se,[l("button",{onClick:p[6]||(p[6]=(...e)=>T.showAccDetail&&T.showAccDetail(...e))},"编辑账户"),Ne,l("button",{onClick:p[7]||(p[7]=(...e)=>T.showCatDetail&&T.showCatDetail(...e))},"编辑分类"),fe,l("button",{onClick:p[8]||(p[8]=e=>T.showBillDetail(-1))},"新增账单")])]),l("div",we," 共"+n(b.pageNumOption[b.pageNumOption.length-1])+"页, 共"+n(b.bills.length)+"条记录 ",1),l("div",Ue,[l("div",null,[l("span",{class:["page-item",T.prevNext.prevStyle],onClick:p[9]||(p[9]=(...e)=>T.goToPrev&&T.goToPrev(...e))}," « ",2),i(l("select",{style:{"margin-top":"-1","min-width":"50px",height:"24px","text-align":"center"},onChange:p[10]||(p[10]=(...e)=>T.loadBill&&T.loadBill(...e)),"onUpdate:modelValue":p[11]||(p[11]=e=>b.curPage=e)},[(e(!0),t(r,null,d(b.pageNumOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,b.curPage,void 0,{number:!0}]]),l("span",{class:["page-item",T.prevNext.nextStyle],onClick:p[12]||(p[12]=(...e)=>T.goToNext&&T.goToNext(...e))}," » ",2)])]),l("div",xe,[Me,i(l("input",{placeholder:"输入关键字...",style:{width:"134px",height:"34px","font-size":"16px","border-radius":"6px"},onInput:p[13]||(p[13]=(...e)=>T.searchWithinPage&&T.searchWithinPage(...e)),"onUpdate:modelValue":p[14]||(p[14]=e=>b.searchKW=e),type:"text"},null,544),[[a,b.searchKW]]),l("div",{class:["close-btn",{hide:!b.searchKW}],onClick:p[15]||(p[15]=(...e)=>T.clearSearch&&T.clearSearch(...e)),style:{top:"-7px","font-size":"30px",right:"10px"}}," × ",2)]),l("div",Be,[l("table",De,[l("tbody",null,[(e(!0),t(r,null,d(b.curPageBills,((i,a)=>(e(),t("tr",{class:b.searchResultClass[a],key:i.id},[l("td",{class:{"date-decor":i.DATE_display&&a}},[i.DATE_display?(e(),t("div",Ye,n(i.DATE_display),1)):u("",!0),l("div",null,[l("div",ke,[l("div",{class:"act-btn",title:"查看详情",onClick:e=>T.showBillDetail(a)},[Pe],8,["onClick"]),l("div",{class:"act-btn",title:"删除",onClick:e=>T.delBill(i)},[Re],8,["onClick"])]),l("div",_e,[l("div",null,[l("div",Ve,n(i.NAME),1),l("div",Ie,["收入"==i.NATURE?(e(),t("i",Le)):u("",!0),"支出"==i.NATURE?(e(),t("i",Ke)):u("",!0),"转账"==i.NATURE?(e(),t("i",Fe)):u("",!0),c(" "+n(i.AMOUNT),1)])]),l("div",je,["转账"!=i.NATURE?(e(),t("div",Ge,n(i.CATEGORY),1)):u("",!0),i.ACC_OUT?(e(),t("div",We,[ze,c(" "+n(i.ACC_OUT),1)])):u("",!0),i.ACC_IN?(e(),t("div",$e,[He,c(" "+n(i.ACC_IN),1)])):u("",!0)])])])],2)],2)))),128))])])]),l("div",{class:["overlay",{show:b.isShowOverlay}],onClick:p[16]||(p[16]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},null,2),l("div",{class:["view-container",{show:b.isShowBill}]},[l("p",null,[l("span",qe,[Je,l("button",{onClick:p[17]||(p[17]=(...e)=>T.loadToday&&T.loadToday(...e))},"今天")]),l(A,{style:{display:"block","margin-bottom":"10px"},onDateChanged:T.changeBillDate,startYear:b.startYear,endYear:b.endYear,year:b.billSelected.year,month:b.billSelected.month,day:b.billSelected.day},null,8,["onDateChanged","startYear","endYear","year","month","day"]),l("span",Ze,[Qe,i(l("select",{style:{"margin-top":"-1","min-width":"50px",height:"24px"},onChange:p[18]||(p[18]=(...e)=>T.loadBillTemplate&&T.loadBillTemplate(...e)),"onUpdate:modelValue":p[19]||(p[19]=e=>b.billTemplateName=e)},[(e(!0),t(r,null,d(b.billTemplateOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,b.billTemplateName]])])]),l("p",null,[Xe,i(l("input",{"onUpdate:modelValue":p[20]||(p[20]=e=>b.billSelected.NAME=e),type:"text"},null,512),[[a,b.billSelected.NAME]])]),l("p",null,[et,i(l("select",{"onUpdate:modelValue":p[21]||(p[21]=e=>b.billSelected.NATURE=e),onChange:p[22]||(p[22]=(...e)=>T.loadCategory&&T.loadCategory(...e))},[(e(!0),t(r,null,d(b.natureOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],544),[[o,b.billSelected.NATURE]]),tt,l("span",{class:{hide:"转账"==b.billSelected.NATURE||""==b.billSelected.NATURE}},[lt,i(l("select",{"onUpdate:modelValue":p[23]||(p[23]=e=>b.billSelected.CATEGORY=e)},[(e(!0),t(r,null,d(T.categoryOption,((l,i)=>(e(),t("option",{key:i},n(l),1)))),128))],512),[[o,b.billSelected.CATEGORY]])],2)]),l("p",null,[l("span",{class:{hide:"收入"==b.billSelected.NATURE}},[it,i(l("select",{"onUpdate:modelValue":p[24]||(p[24]=e=>b.billSelected.ACC_OUT=e)},[(e(!0),t(r,null,d(b.accounts,((l,i)=>(e(),t("option",{key:i},n(l.NAME),1)))),128))],512),[[o,b.billSelected.ACC_OUT]])],2),l("br",{class:{hide:"收入"==b.billSelected.NATURE}},null,2),l("span",{class:{hide:"支出"==b.billSelected.NATURE}},[at,i(l("select",{"onUpdate:modelValue":p[25]||(p[25]=e=>b.billSelected.ACC_IN=e),title:b.billSelected.ACC_OUT},[(e(!0),t(r,null,d(b.accounts,((l,i)=>(e(),t("option",{key:i},n(l.NAME),1)))),128))],8,["title"]),[[o,b.billSelected.ACC_IN]])],2)]),l("p",null,[st,i(l("input",{"onUpdate:modelValue":p[26]||(p[26]=e=>b.billSelected.AMOUNT=e),type:"number"},null,512),[[a,b.billSelected.AMOUNT]])]),l("p",null,[nt,i(l("input",{placeholder:"选填","onUpdate:modelValue":p[27]||(p[27]=e=>b.billSelected.REMARK=e),type:"text"},null,512),[[a,b.billSelected.REMARK]])]),l("p",null,[ot,i(l("textarea",{placeholder:"选填",style:{width:"100%",height:"100px"},"onUpdate:modelValue":p[28]||(p[28]=e=>b.billSelected.NOTES=e)},null,512),[[a,b.billSelected.NOTES]])]),l("div",rt,[b.isUpdateBill?(e(),t("button",{key:0,onClick:p[29]||(p[29]=(...e)=>T.updateBill&&T.updateBill(...e))},"更新")):u("",!0),l("button",{onClick:p[30]||(p[30]=(...e)=>T.addBill&&T.addBill(...e))},"另存"),l("button",{onClick:p[31]||(p[31]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"取消"),dt,ct,l("button",{onClick:p[32]||(p[32]=(...e)=>T.saveBillTemplate&&T.saveBillTemplate(...e))},"存为模板"),l("button",{onClick:p[33]||(p[33]=(...e)=>T.delBillTemplate&&T.delBillTemplate(...e))},"删除模板")]),l("div",{class:"close-btn",onClick:p[34]||(p[34]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"×")],2),l("div",{class:["view-container",{show:b.isShowAcc}]},[(e(!0),t(r,null,d(b.accEditing,((s,n)=>(e(),t("div",{class:"view-acc",key:n},[ht,i(l("input",{"onUpdate:modelValue":e=>s.NAME=e,style:{width:"170px"}},null,8,["onUpdate:modelValue"]),[[a,s.NAME]]),ut,pt,i(l("input",{"onUpdate:modelValue":e=>s.TYPE=e,style:{width:"170px"}},null,8,["onUpdate:modelValue"]),[[a,s.TYPE]]),gt,mt,i(l("input",{"onUpdate:modelValue":e=>s.initialBalance=e,type:"number",style:{width:"170px"}},null,8,["onUpdate:modelValue"]),[[a,s.initialBalance]]),bt,Tt,i(l("input",{"onUpdate:modelValue":e=>s.balance=e,disabled:"",type:"number",style:{width:"170px"}},null,8,["onUpdate:modelValue"]),[[a,s.balance]])])))),128)),l("div",At,[l("button",{onClick:p[35]||(p[35]=e=>T.addAcc(b.accEditing.length))},"新增账户"),yt,l("button",{onClick:p[36]||(p[36]=(...e)=>T.updateAcc&&T.updateAcc(...e))},"更新"),l("button",{onClick:p[37]||(p[37]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"取消")]),l("div",{class:"close-btn",onClick:p[38]||(p[38]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"×")],2),l("div",{class:["view-container",{show:b.isShowCat}]},[(e(!0),t(r,null,d(b.catEditing,((s,n)=>(e(),t("div",{class:"view-acc",key:n},[Ct,i(l("input",{"onUpdate:modelValue":e=>s.NAME=e},null,8,["onUpdate:modelValue"]),[[a,s.NAME]]),vt,Et,i(l("select",{"onUpdate:modelValue":e=>s.TYPE=e,class:T.getTypeClass(s.TYPE)},[Ot,St],10,["onUpdate:modelValue"]),[[o,s.TYPE]])])))),128)),l("div",Nt,[l("button",{onClick:p[39]||(p[39]=e=>T.addCat(b.catEditing.length))},"新增分类"),ft,l("button",{onClick:p[40]||(p[40]=(...e)=>T.updateCat&&T.updateCat(...e))},"更新"),l("button",{onClick:p[41]||(p[41]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"取消")]),l("div",{class:"close-btn",onClick:p[42]||(p[42]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"×")],2),l("div",{class:["view-container",{show:b.isShowSumAcc}]},[b.sumAcc.length?(e(),t("div",wt,[(e(!0),t(r,null,d(b.sumAcc,((l,i)=>(e(),t("button",{key:"opt"+i,class:T.getSumAccBtnClass(l[0].TYPE),onClick:e=>T.setActiveSumAccType(l[0].TYPE)},n(l[0].TYPE),11,["onClick"])))),128))])):u("",!0),Ut,(e(!0),t(r,null,d(b.sumAcc,((i,a)=>(e(),t("div",{key:a,class:T.getSumAccTypeClass(i[0].TYPE)},[(e(!0),t(r,null,d(i,((i,s)=>(e(),t("div",{class:"view-acc",key:a+"-"+s},[l("h3",null,[c(n(i.NAME)+" ",1),l("span",xt,"余额: "+n(i.balance),1)]),l("span",Mt,[Bt,l("span",Dt,n(i.expenseTotal),1)]),Yt,l("span",kt,[Pt,l("span",Rt,n(i.incomeTotal),1)]),_t,l("span",Vt,[It,l("span",{class:T.getReserveClass(i.reserveTotal.val)},n(i.reserveTotal.text),3)])])))),128))],2)))),128)),l("div",Lt,[l("button",{onClick:p[43]||(p[43]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"关闭")]),l("div",{class:"close-btn",onClick:p[44]||(p[44]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"×")],2),l("div",{class:["view-container",{show:b.isShowSumCat}]},[b.sumCat.length?(e(),t("div",Kt,[(e(!0),t(r,null,d(b.sumCat,((l,i)=>(e(),t("button",{key:"opt"+i,class:T.getSumCatBtnClass(l[0].TYPE),onClick:e=>T.setActiveSumCatType(l[0].TYPE)},n(l[0].TYPE),11,["onClick"])))),128))])):u("",!0),Ft,(e(!0),t(r,null,d(b.sumCat,((i,a)=>(e(),t("div",{key:a},[(e(!0),t(r,null,d(i,((s,o)=>(e(),t("div",{class:["view-acc",T.getSumCatTypeClass(i[0].TYPE)],key:a+"-"+o},[l("h3",null,n(s.NAME),1),l("span",jt,[Gt,l("span",{class:T.getTxtClass(s.TYPE)},n(s.total),3)])],2)))),128))])))),128)),l("div",Wt,[l("button",{onClick:p[45]||(p[45]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"关闭")]),l("div",{class:"close-btn",onClick:p[46]||(p[46]=(...e)=>T.hideOverlay&&T.hideOverlay(...e))},"×")],2)])):u("",!0),b.isLoggedin?u("",!0):(e(),t(y,{key:1,errorMsg:b.login_errMsg,onLogin:T.getLoginInfo},null,8,["errorMsg","onLogin"])),b.isLoggedin?u("",!0):(e(),t(C,{key:2}))])},p(ee).mount("#app");
