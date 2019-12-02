<template>
  <!--  历史记录  -->
  <el-col :span="19">
    <div class="factories-list">
      <el-table
        border
        resizable
        show-overflow-tooltip="true"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
<!--        <el-table-column-->
<!--          label="编号"-->
<!--          prop="gid"-->
<!--          width="50"-->
<!--          align="center">-->
<!--        </el-table-column>-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="流水号">
                <span><b>{{ props.row.hid }}</b></span>
              </el-form-item>
              <el-form-item label="房间号">
                <span><b>{{ props.row.gid }}</b></span>
              </el-form-item>
              <el-form-item label="类型">
                <span v-if="props.row.type === 1"><b>总统套房</b></span>
                <span v-if="props.row.type === 2"><b>豪华套房</b></span>
                <span v-if="props.row.type === 3"><b>标准房</b></span>
                <span v-if="props.row.type === 4"><b>经济房</b></span>
                <span v-if="props.row.type === 5"><b>小时房</b></span>
              </el-form-item>
              <el-form-item label="入住人">
                <span><b>{{ props.row.tname }}</b></span>
              </el-form-item>
              <el-form-item label="开房时间" >
                <span><b>{{ new Date(props.row.chenkin).getFullYear()+'-'+(new Date(props.row.chenkin).getMonth()+1)+'-' + new Date(props.row.chenkin).getDate()+' '+new Date(props.row.chenkin).getHours()+':'+new Date(props.row.chenkin).getMinutes()}}</b></span>
              </el-form-item>
              <el-form-item label="离开时间">
                <span>
                  <b>{{ new Date(props.row.departure).getFullYear()+'-'+(new Date(props.row.departure).getMonth()+1)+'-' + new Date(props.row.departure).getDate()+' '+new Date(props.row.departure).getHours()+':'+new Date(props.row.departure).getMinutes()}}</b>
                </span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span><b>{{ props.row.identity }}</b></span>
              </el-form-item>
              <el-form-item label="手机号">
                <span><b>{{ props.row.mobile }}</b></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="流水号"
          prop="hid"
          align="center">
        </el-table-column>
        <el-table-column
          label="房间号"
          prop="gid"
          align="center">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          :formatter="formatType"
          align="center">
        </el-table-column>
        <el-table-column
          label="入住时间"
          prop="chenkin"
          :formatter="dateFormatter"
          width="170px"
          align="center">
        </el-table-column>
        <el-table-column
          label="离开时间"
          :formatter="dateFormatter"
          width="200px"
          prop="departure"
          align="center">
        </el-table-column>
<!--        <el-table-column-->
<!--          label="实收"-->
<!--          prop="received"-->
<!--          align="center">-->
<!--        </el-table-column>-->
        <!-- <el-table-column
          label="价格"
          prop="received"
          align="center">
        </el-table-column> -->
        <el-table-column
          label="姓名"
          prop="tname"
          align="center">
        </el-table-column>
        <!-- <el-table-column
          label="手机号"
          prop="mobile"
          align="center">
        </el-table-column> -->
        <el-table-column
          label="证件号"
          prop="identity"
          align="center">
        </el-table-column>
        <!-- <el-table-column
          align="center">

        </el-table-column> -->
<!--        <el-table-column-->
<!--          label="操作"-->
<!--          align="center"-->
<!--        >-->
<!--          <template slot-scope="scope">-->
<!--            <el-button :disabled="scope.row.state == 1"-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">详情</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <div class="block">
        <el-pagination
          background
          @current-change='testFunc'
          layout="prev, pager, next"
          :page-size=pageSize
          :total="tableData.length">
        </el-pagination>
<!--        <el-link icon="el-icon-edit" class="add-class" @click="addFac">添加企业</el-link>-->
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'guest',
  data () {
    return {
      currentPage: 1, // 当前页(初始页)
      pageSize: 10, // 每页的数据
      tableData: [],
      accept: false,
      formLabelWidth: '120px'
    }
  },
  created: function () {
    let self = this
    this.$axios.get('api/v1/manager-selectAllHistory')
      .then(function (response) {
        console.log(response.data)
        self.tableData = response.data.data
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    dateFormatter (row, column) {
      console.log(row)
      let Year = (new Date(row.chenkin)).getFullYear()
      let month = (new Date(row.chenkin)).getMonth() + 1
      let day = (new Date(row.chenkin)).getDate()
      let hours = (new Date(row.chenkin)).getHours()
      let minutes = (new Date(row.chenkin)).getMinutes()
      // console.log(Year + '-' + month + '-' + day + ' ' + hours + ':' + minutes)
      return Year + '-' + month + '-' + day + '  ' + hours + ':' + minutes
    },
    change () {
      let self = this
      self.dialogFormVisible = false
      this.$axios.post('/api/v1/manager-cleanGuestroom', {
        gid: self.gid
      })
        .then(function (response) {
          console.log(self.tableData[self.gid - 1])
          self.openGuest(self.ggid, self.tableData[self.gid - 1])
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    formatState (row, column, cellValue) {
      if (cellValue === 1) {
        return '已入住'
      } else if (cellValue === 2) {
        return '已预订'
      } else if (cellValue === 3) {
        return '未预定'
      }
    },
    formatType (row, column, cellValue) {
      if (cellValue === 1) {
        return '总统套房'
      } else if (cellValue === 2) {
        return '豪华套房'
      } else if (cellValue === 3) {
        return '标准房'
      } else if (cellValue === 4) {
        return '经济房'
      } else if (cellValue === 5) {
        return '小时房'
      }
    },
    addFac () {
      this.$router.push({ path: '/addFactory', params: {} })
    },
    handleEdit (index, row) {
      console.log(index, row.gid)
      this.$router.push({ path: '/history/' + row.hid, params: {} })
    },
    handleExit (index, row) {
      console.log(index, row.Fid)
      this.exitRoom(row.gid)
    },
    handleDelete (index, row) {
      console.log(row.gid)
      this.dialogFormVisible = true
      this.gid = row.gid
    },
    openGuest (gid, guest) {
      let self = this
      this.$axios.post('/api/v1/manager-updateGuestroom', {
        'gid': gid,
        'type': guest.type,
        'state': 1,
        'chenkin': guest.chenkin,
        'departure': guest.departure,
        'remark': guest.remark,
        'tname': guest.tname,
        'identity': guest.identity,
        'phone': guest.phone
      })
        .then(function (response) {
          if (response.data.status === 0) {
            self.$message.success('换房成功')
          } else {
            console.log(response.data)
            self.$message.error('换房失败')
          }
        })
        .catch(function (err) {
          console.log(err)
          // self.$message.warning('修改失败,请检查您的网络连接')
        })
      let newPage = '_empty' + '?time=' + new Date().getTime() / 5000
      this.$router.push(newPage)
      this.$router.go(-1)
    },
    testFunc (page) {
      this.currentPage = page
    },
    exitAjax (fid) {
      console.log(fid)
      // manager-addHistory
      this.$axios.post('/api/v1/manager-cleanGuestroom', {
        gid: fid
      })
        .then(function (response) {
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '退房成功!'
          })
          let newPage = '_empty' + '?time=' + new Date().getTime() / 500
          this.$router.push(newPage)
          this.$router.go(-1)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .factories-list{
    float: left;
    width: 100%;
    border: 0px solid #e6e6e6;
    /*margin: 30px 10%;*/
  }
  .block{
    text-align: center;

  }
  .add-class{
    margin-top: -20px;
    margin-right: 20px;
    float: right;
    color: #409EFF;
    border: 1.5px dashed #C0C0C0;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
