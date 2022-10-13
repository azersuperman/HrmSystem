<template>
  <UploadExcel :on-success="handleSuccess" />
</template>

<script>
import { importEmployee } from '@/api/employ'
export default {
  data() {
    return {

    }
  },
  methods: {
    // handleSuccess(data) {
    //   console.log(data)
    // }
    async handleSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const userinfo = {}
      const arr = []
      results.forEach(ele => {
        Object.keys(ele).forEach(item => {
          userinfo[userRelations[item]] = ele[item]
        })
        arr.push(userinfo)
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('操作成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
