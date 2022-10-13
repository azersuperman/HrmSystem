<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录账户设置" name="first" lazy>
            <el-form
              ref="accountform"
              label-width="80px"
              :model="accountInfo"
              :rules="accountInfoRules"
            >
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="accountInfo.password"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateEmployInfo"
                >更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second" lazy>
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third" lazy>
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserdetailsAPI, saveUserdetailsAPI } from '@/api/user'
import userInfo from '@/views/employees/components/user-info.vue'
import jobInfo from '@/views/employees/components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    userInfo,
    jobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserdetailsAPI()
  },
  methods: {
    async getUserdetailsAPI() {
      const res = await getUserdetailsAPI(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployInfo() {
      try {
        await this.$refs.accountform.validate()
        await saveUserdetailsAPI(this.accountInfo)
        console.log('校验成功')
      } catch (e) {
        console.log(e)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>
</style>
