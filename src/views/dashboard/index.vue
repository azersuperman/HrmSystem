<template>
  <div class="dashboard-container">
    <!-- <UploadExcel :before-upload="beforeUpload" :on-success="handleSuccess" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 102400) {
        this.$message.error('to Big')
      }
      return true
    }
  }
  // async created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   res.username = 12345
  //   console.log(res)
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
