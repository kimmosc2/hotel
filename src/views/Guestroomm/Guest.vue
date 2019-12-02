<template>
  <!--  开退房管理  -->
  <el-col :span="19">
    <el-dialog title="换房" :visible.sync="dialogFormVisible">
      <el-form :inline="true" >
        <el-form-item label="原房间号" :label-width="formLabelWidth">
          <el-input v-model="gid" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="换房" :label-width="formLabelWidth">
          <el-input v-model="ggid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-show="accept" @click="change">确 定</el-button>
      </div>
    </el-dialog>
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
        <el-table-column
          label="房间号"
          prop="gid"
          align="center">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
          :formatter="formatState"
          align="center">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          :formatter="formatType"
          align="center">
        </el-table-column>
        <el-table-column
          label="开出时间"
          prop="chenkin"
          width="170px"
          :formatter="dateFormatter"
          align="center">
        </el-table-column>
        <el-table-column
          label="到期时间"
          prop="departure"
          width="170px"
          :formatter="dateFormatter"
          align="center">
        </el-table-column>
<!--        <el-table-column-->
<!--          label="实收"-->
<!--          prop="received"-->
<!--          align="center">-->
<!--        </el-table-column>-->
        <el-table-column
          label="价格"
          prop="price"
          align="center">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="tname"
          align="center">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          align="center">
        </el-table-column>
        <el-table-column
          label="证件号"
          prop="identity"
          align="center">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240"
        >
          <template slot-scope="scope">
            <el-button :disabled="scope.row.state == 1"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">开房</el-button>
            <el-button :disabled="scope.row.state == 3"
              size="mini"
              type="danger"
              @click="handleExit(scope.$index, scope.row)">退房</el-button>
            <el-button :disabled="scope.row.state == 3"
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)">换房</el-button>
          </template>
        </el-table-column>
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
      dialogFormVisible: false,
      gid: 0,
      ggid: 0,
      accept: false,
      formLabelWidth: '120px'
    }
  },
  created: function () {
    let self = this
    this.$axios.get('api/v1/manager-selectAllGuestroom')
      .then(function (response) {
        console.log(response.data)
        self.tableData = response.data.data
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  watch: {
    ggid: function (val) {
      let self = this
      let s = self.tableData[val - 1].state
      console.log(s)
      if (s === 3) {
        self.accept = true
        self.$message.success('该房间可以进行更换')
      } else {
        this.$message.error('该房间已有人居住')
        self.accept = false
      }
    },
    dialogFormVisible: function (val) {
      if (val === false) {
        this.accept = false
      }
    }
  },
  methods: {
    dateFormatter (row, column) {
      // console.log(row)
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
      this.$router.push({ path: '/openGuestroom/' + row.gid, params: {} })
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
    exitRoom (fid) {
      this.$confirm('确定要退房吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(fid)
        this.exitAjax(fid)
        this.$message({
          type: 'success',
          message: '退房成功! 即将跳转至房间列表'
        })
        let newPage = '_empty' + '?time=' + new Date().getTime() / 2000
        this.$router.push(newPage)
        this.$router.go(-1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退房'
        })
      })
    },
    delete (fid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(fid)
        this.deleteAjax(fid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    },
    deleteAjax (fid) {
      console.log(fid)
      this.$axios.delete('/api/v1/factory/delete', {
        data: { Fid: fid }
      })
        .then(function (response) {
          console.log(response.data)
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
</style>
