<template>
  <div id="app">
    <nav>
      <el-form
        :model="fromData"
        :rules="rules"
        inline
        label-position="left"
        label-width="100px"
        ref="loginForm"
      >
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="fromData.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="fromData.password"></el-input>
        </el-form-item>
      </el-form>
    </nav>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
// 手机号码必填，手机号码 格式 /^[1][3,4,5,7,8][0-9]{9}$/
// 密码必填，密码格式长度限制为6-16
export default {
  data() {
    const phoneValid = (rules, value, callback) => {
      if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        // console.log({ rules })
        // console.log({ value })
        // console.log(callback())
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    return {
      fromData: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          {
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确'
            trigger: 'blur',
            validator: phoneValid
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'password 不正确' },
          { min: 6, max: 16, trigger: 'blur', message: 'password格式不正确' }
        ]
      }
    }
  },
  methods: {
    async submit() {
      try {
        const res = await this.$refs.loginForm.validate()
        console.log({ res })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less"></style>
