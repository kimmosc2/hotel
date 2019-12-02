<template>
  <el-col :span="19">
    <h2>录入房间信息</h2>
    <div class="factory-info">
      <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="150px">
        <el-form-item label="房间号">
          <el-input v-model="form.gid" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间类型" >
          <el-input v-model="displayType" disabled></el-input>
<!--          <el-input v-model="form.type" hidden></el-input>-->
        </el-form-item>
        <el-form-item label="姓名" prop="tname">
          <el-input v-model="form.tname" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" type="form.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identity">
          <el-input v-model="form.identity"  type="form.identity" style="width:570px" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="开出时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="form.chenkin" style="width: 210px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="form.departure" style="width: 210px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="房费">
          <el-input v-model="form.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" :rows="3" style="width: 570px"></el-input>
        </el-form-item>
        <br>
        <center>
        <el-form-item >
          <el-button :v-show="saveFlag" type="primary" @click="onSubmit123">保存</el-button>
          <el-button @click="exit">取消</el-button>
        </el-form-item>
        </center>
      </el-form>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'openGuestroom',
  data () {
    return {
      openGuestURL: '/api/v1/manager-selectByIdGuestroom',
      updateGuestURL: '/api/v1/manager-updateGuestroom',
      addHistory: '/api/v1/manager-addHistory',
      displayType: '',
      saveFlag:false,
      form: {
        gid: 0, // 房间号
        type: 0, // 房间类型
        state: '', // 房间状态 1已出租  2预定 3未出租
        chenkin: '', // 入住时间
        departure: '', // 离开时间
        received: '', // 结算费用(实收)
        price: '', // 租住价格
        remark: '', // 备注
        tname: '', // 租客姓名
        identity: '', // 身份证号
        phone: '' //  手机号
      },
      rules: {
          tname: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, message: '至少输入2个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11位', trigger: 'blur' }
          ],
          identity: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { min: 18, max: 18, message: '长度为18位', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.onSubmit123()
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false;
          }
        });
    },
    addHistoryFunc () {
      let self = this
      self.$axios.post(self.addHistory, {
        'gid': self.form.gid,
        'type': self.form.type,
        'state': 1,
        'chenkin': self.form.chenkin,
        'departure': self.form.departure,
        'remark': self.form.remark,
        'tname': self.form.tname,
        'identity': self.form.identity,
        'phone': self.form.phone
      })
    },
    onSubmit123 () {
      let self = this
      self.$axios.post(self.updateGuestURL, {
        'gid': self.form.gid,
        'type': self.form.type,
        'state': 1,
        'chenkin': self.form.chenkin,
        'departure': self.form.departure,
        'remark': self.form.remark,
        'tname': self.form.tname,
        'identity': self.form.identity,
        'phone': self.form.phone
      })
        .then(function (response) {
          if (response.data.status === 0) {
            self.addHistoryFunc()
            self.$message.success('成功')
            self.$router.push({ path: '/guest', query: {} })
          } else {
            console.log(response.data)
            self.$message.error('失败')
          }
        })
        .catch(function (err) {
          console.log(err)
          self.$message.warning('修改失败,请检查您的网络连接')
        })
    },
    formatType (cellValue) {
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
    exit () {
      this.$router.push({ path: '/guest', query: {} })
    },
    getInfoAjax (gid) {
      let self = this
      this.$axios.post(self.openGuestURL, {
        gid: gid
      })
        .then(function (response) {
          console.log(response)
          self.bindData(response.data.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    bindData (guest) {
      let self = this
      self.form.gid = guest.gid
      self.form.type = guest.type
      self.form.state = guest.state
      self.form.chenkin = new Date()
      self.form.departure = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)).toISOString().slice(0, 10)
      self.form.received = guest.received
      self.form.price = guest.price
      self.form.remark = guest.remark
      self.form.tname = guest.tname
      self.form.identity = guest.identity
      self.form.phone = guest.phone
      self.displayType = self.formatType(guest.type)
    }
  },
  created () {
    let gid = this.$route.params.gid
    this.getInfoAjax(gid)
  }
}
</script>

<style scoped>
  .avatar-uploader {
    border: 3px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
  }
  .uploader-size{
    height: 200px;
    width: 300px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .factory-info{
    float: left;
    margin-top: 30px;
    border: 0px solid black;
    width: 80%
  }
</style>
