<template>
    <div>
        <select class="date-picker-select" v-model="yearVal" @change="getDateVal">
            <option v-for="(year, i) in yearOption" :key="i">{{ year }}</option>
        </select>
        年
        <select class="date-picker-select" v-model="monthVal" @change="getDateVal">
            <option v-for="(month, i) in monthOption" :key="i">{{ month }}</option>
        </select>
        月
        <select class="date-picker-select" v-model="dayVal" @change="getDateVal">
            <option v-for="(day, i) in dayOption" :key="i">{{ day }}</option>
        </select>
        日
    </div>
</template>

<script>
var monthOption = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12];
var _28dayOption = ["01", "02", "03", "04", "05", "06", "07", "08", "09",10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var _29dayOption = _28dayOption.concat([29]);
var _30dayOption = _29dayOption.concat([30]);
var _31dayOption = _30dayOption.concat([31]);
export default {
    name: "DatePickerUnit",
    props: ["startYear", "endYear", "year", "month", "day"],
    data() {
        return {
            monthOption,
            yearVal: this.year,
            monthVal: this.month,
            dayVal: this.day
        };
    },
    computed: {
        yearOption() {
            //初始年份为过去10年
            //如果有传参，则输出从开始年份到结束年份
            var date = new Date();
            var yearNow = date.getFullYear();
            var startYear = this.startYear ? this.startYear : yearNow - 10;
            var endYear = this.endYear ? this.endYear : yearNow;
            var result = [];
            for (let i = 0; i < endYear - startYear + 1; i++) {
                result.push(startYear + i);
            }
            return result;
        },
        dayOption() {
            var year = this.yearVal;
            var month = this.monthVal;
            var day = this.dayVal;
            var month31day = ["01", "03", "05", "07", "08", 10, 12];
            var month30day = ["04", "06", "09", 11];
            //1,3,5,7,8,10,12月
            for (let i = 0; i < month31day.length; i++) {
                if (month == month31day[i]) {
                    return _31dayOption;
                }
            }
            //4,6,9,11月
            for (let i = 0; i < month30day.length; i++) {
                if (month == month30day[i]) {
                    if (day == 31) {
                        //之前选了31日，本月没有，所以清空选择
                        this.dayVal = "";
                    }
                    return _30dayOption;
                }
            }
            //2月
            if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
                //闰年2月
                if (day > 29) {
                    //之前选的日子大于29，本月只有29天，所以清空选择
                    this.dayVal = "";
                }
                return _29dayOption;
            } else {
                //普通2月
                if (day > 28) {
                    //之前选的日子大于28，本月只有28天，所以清空选择
                    this.dayVal = "";
                }
                return _28dayOption;
            }
        }
    },
    methods: {
        getDateVal() {
            //定义事件名称和要传的值，后面可以在父组件进行调用
            this.$emit("dateChanged", {
                year: this.yearVal,
                month: this.monthVal,
                day: this.dayVal
            });
        }
    },
    watch: {
        //父组件再次给props传值时，如果没有watch，就不会接收第二次
        year(newYear) {
            this.yearVal = newYear;
        },
        month(newMonth) {
            this.monthVal = newMonth;
        },
        day(newDay) {
            this.dayVal = newDay;
        }
    }
};
</script>