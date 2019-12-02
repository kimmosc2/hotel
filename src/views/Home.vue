<template>
  <div class="home-bar">
    <h1><i class="el-icon-odometer"></i> 入住总占比</h1>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="TypeInDisplay"></el-progress>
    <br>
    <h1><i class="el-icon-pie-chart"></i> 入住分布情况</h1>
    <div id="myChart" :style="{width: '550px', height: '450px',}"></div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="el-icon-s-data"></i> 数据统计</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div class="text item"><b>房间总数</b>: <span class="font-num">{{TypeCount}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>入住数</b>: <span class="font-num">{{TypeInCount}}</span></div>
  <div class="text item"><b>总统房总数</b>: <span class="font-num">{{typeOne[0]}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>总统房入住数</b>: <span class="font-num">{{typeOne[1]}}</span></div>
  <div class="text item"><b>豪华房总数</b>: <span class="font-num">{{typeTwo[0]}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>豪华房入住数</b>: <span class="font-num">{{typeTwo[1]}}</span></div>
  <div class="text item"><b>标准房总数</b>: <span class="font-num">{{typeThree[0]}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>标准房入住数</b>: <span class="font-num">{{typeThree[1]}}</span></div>
  <div class="text item"><b>经济房总数</b>: <span class="font-num">{{typeFour[0]}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>经济房入住数</b>: <span class="font-num">{{typeFour[1]}}</span></div>
  <div class="text item"><b>小时房总数</b>: <span class="font-num">{{typeFive[0]}}</span>&emsp;&emsp;&emsp;&emsp;&emsp;<b>小时房入住数</b>: <span class="font-num">{{typeFive[1]}}</span></div>
</el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HeaderBar from '../components/HeaderBar'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      typeOne: [0, 0], // 总数 出租数
      typeTwo: [0, 0],
      typeThree: [0, 0],
      typeFour: [0, 0],
      typeFive: [0, 0],
      TypeCount: 0, // 房间总数
      TypeInCount: 0, // 房间出租数
      TypeInDisplay: 0 // 百分比
    }
  },
  mounted () {
    // this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let self = this
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        // title: { text: '入住量' },
        tooltip: {},
        // xAxis: {
        //   data: ['总统房', '豪华房', '标准房', '经济房', '小时房']
        // },
        // yAxis: {},
        // roseType: 'angle',
        series: [{
          name: '入住量',
          type: 'pie',
          data: [
            { name: '总统房', value: self.typeOne[1] },
            { name: '豪华房', value: self.typeTwo[1] },
            { name: '标准房', value: self.typeThree[1] },
            { name: '经济房', value: self.typeFour[1] },
            { name: '小时房', value: self.typeFive[1] }
          ]
        }]
      })
    }
  },
  created: function () {
    let self = this
    this.$axios.get('api/v1/manager-selectAllGuestroom')
      .then(function (response) {
        console.log(response.data)
        let arr = response.data.data
        let count = Object.keys(arr).length
        self.TypeCount = count
        for (let i = 0; i < count; i++) {
          // console.log(response.data.data[i].state)// 出租状态
          // console.log(response.data.data[i].type)// 房间类型
          if (response.data.data[i].type === 1) {
            self.typeOne[0]++
            if (response.data.data[i].state !== 3) {
              self.typeOne[1]++
              self.TypeInCount++
            }
          } else if (response.data.data[i].type === 2) {
            // console.log('类型2')
            self.typeTwo[0]++
            if (response.data.data[i].state !== 3) {
              self.typeTwo[1]++
              self.TypeInCount++
            }
          } else if (response.data.data[i].type === 3) {
            // console.log('类型3')
            self.typeThree[0]++
            if (response.data.data[i].state !== 3) {
              self.typeThree[1]++
              self.TypeInCount++
            }
          } else if (response.data.data[i].type === 4) {
            // console.log('类型4')
            self.typeFour[0]++
            if (response.data.data[i].state !== 3) {
              self.typeFour[1]++
              self.TypeInCount++
            }
          } else if (response.data.data[i].type === 5) {
            // console.log('类型5')
            self.typeFive[0]++
            if (response.data.data[i].state !== 3) {
              self.typeFive[1]++
              self.TypeInCount++
            }
          }
          // console.log(response.data.data[i])
        }
        console.log(self.typeOne)
        console.log(self.typeTwo)
        console.log(self.typeThree)
        console.log(self.typeFour)
        console.log(self.typeFive)
        self.TypeInDisplay = Math.floor((self.TypeInCount / self.TypeCount) * 100)// 入住百分比
        // self.series.data[0] = self.typeOne[1]
        // self.series.data[0] = 100
        // self.tableData = response.data.data
        self.drawLine()
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.home-bar{
  float: left;
  margin-left: 20px;
  width: 80%;
  height: 600px;
}
  .text {
    font-size: 14px;
  }
  .font-num{
    font-size: 24px;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 330px;
    position: relative;
    /* float: left; */
    top:-440px;
    left: 700px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  }
</style>
