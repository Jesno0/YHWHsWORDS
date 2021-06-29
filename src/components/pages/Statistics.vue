<template>
  <div>
    <el-card class="count">
      <div slot="header">周期统计</div>
      <DateCard user="1章" group="1章" iconText="今日"/>
      <DateCard user="1章" group="1章" iconText="本周"/>
      <DateCard user="1章" group="1章" iconText="本月"/>
      <DateCard user="1章" group="1章" iconText="本年"/>
    </el-card>

    <el-card class="weekTime">
      <div slot="header">本周打卡时间</div>
      <div class="timeChart" ref="timeChart"></div>
    </el-card>

    <el-card class="sortCount">
      <div slot="header">分类统计</div>
      <div class="sortChart" ref="sortChart"></div>
    </el-card>

    <el-card class="allCount">
      <div slot="header">全书统计</div>
      <div class="allChart" ref="allChart"></div>
    </el-card>

    <el-card class="question">
      <div slot="header">个人问题</div>
    </el-card>
  </div>
</template>

<script>
import DateCard from './element/statistics/DateCard'
import {ApiUserData} from '@/js/Api'
import * as Echarts from 'echarts'

export default {
  name: 'Statistics',
  components: {
    DateCard
  },
  data () {
    return {
    }
  },
  async mounted() {
    const {dakaTime,yiduOfAll,dakaDate,yiduzhanbi,sorts} = await ApiUserData();
    this.initCountCard();
    this.initWeekTimeChart(dakaTime,dakaDate);
    this.initSortChart(yiduzhanbi,sorts);
    this.initAllCount(yiduOfAll);
  },
  methods: {
    initCountCard () {
      
    },
    initWeekTimeChart (dakaTime,dakaDate) {
      const timeChart = Echarts.init(this.$refs.timeChart);
      timeChart.setOption({
        color: ["#7acfe9"],
        textStyle: {
          fontSize: 16
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
                backgroundColor: '#283b56'
            }
          }
        },
        series: [{
          type: "line",
          data: dakaTime || [0,0,0,0,0]
        }],
        xAxis: [{
          name: "日期",
          data: dakaDate,
          boundaryGap: true,
          nameLocation: "center",
          nameGap: 28,
          nameTextStyle: {
            color: "#9cb38e",
            fontWeight: 600
          }
        }],
        yAxis: [{
          name: "时间",
          max: 24,
          min: 0,
          interval: 6,
          nameTextStyle: {
            color: "#9cb38e",
            fontWeight: 600
          }
        }]
      });
    },
    initSortChart (yiduzhanbi,sorts) {
      const sortChart = Echarts.init(this.$refs.sortChart);
      const colors = ["#f3dd8f","#7acfe9"];
      sortChart.setOption({
        textStyle: {
          fontSize: 16
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
                backgroundColor: '#283b56'
            }
          }
        },
        series: [{
          type: "bar",
          data: yiduzhanbi || [0,0,0,0,0,0,0,0],
          itemStyle: {
            color: ({dataIndex}) => {
              return colors[parseInt(dataIndex%2)];
            }
          }
        }],
        xAxis: [{
          name: "分类",
          data: sorts,
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            color: "#9cb38e",
            fontWeight: 600
          },
          axisLabel: {
            rotate: 30
          }
        }],
        yAxis: [{
          name: "占比",
          max: 1,
          min: 0,
          nameTextStyle: {
            color: "#9cb38e",
            fontWeight: 600
          }
        }]
      });
    },
    initAllCount (yiduOfAll) {
      const allChart = Echarts.init(this.$refs.allChart);
      const colors = ["#f3dd8f","#a6d094"];
      allChart.setOption({
        textStyle: {
          fontSize: 16
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["未读", "已读"],
          textStyle: {
            color: "#86888f"
          }
        },
        series: [{
          type: "pie",
          data: [{
            value: yiduOfAll[0],
            name: "已读"
          },{
            value: yiduOfAll[1] - yiduOfAll[0],
            name: "未读"
          }],
          itemStyle: {
            normal:{ 
              color: ({dataIndex}) => {
                return colors[parseInt(dataIndex%2)];
              },
              label:{ 
                show: true, 
                formatter: "{b} ({c})", 
                labelLine :{show:true},
                color: "#86888f"
              } 
            }
          }
        }]
      });
    }
  }
}
</script>

<style scoped>
.el-card {
  border-radius: 5px; 
  margin-top: 10px;
}
.el-card /deep/ .el-card__header {
  padding: 5px;
  color:darksalmon;
  font-weight: 600;
}
.el-card /deep/ .el-card__body {
  padding: 5px 0 5px 5px;
  display: flex;
  justify-content: space-around;
}
.el-card /deep/ .el-card__body .el-card {
  margin-right: 5px;
  width: 100%;
}
/* 420px */
@media (max-width:620px) {
  .el-card /deep/ .el-card__body {
    flex-wrap: wrap;
  }
}
.timeChart {
  width: 100%;
  height: 320px;
}
.sortChart {
  width: 100%;
  height: 320px;
}
.allChart {
  width: 100%;
  height: 320px;
}
</style>
