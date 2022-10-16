<template>
  <div>
    <el-upload
      v-loading="loading"
      class="inputW"
      action="#"
      list-type="picture-card"
      :show-file-list="true"
      :on-preview="onpreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="uploadImg"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <img style="width:100%" :src="previewImg" />

    </el-dialog>

  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDTowrbBYifQyNbdTO4WhigU4SYXMxIRN5',
  SecretKey: 'VllW1GG1WaVDgW8XifR1NYXKwiLl173r'
})
export default {
  name: 'UploadImg',
  props: {
    emloyeesAvater: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      previewImg: '',
      loading: false
    }
  },
  watch: {
    emloyeesAvater() {
      this.fileList.push({ name: 'default', url: this.emloyeesAvater })
    }
  },
  methods: {
    onpreview(file) {
      this.dialogVisible = true
      this.previewImg = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    uploadImg(file, fileList) {
      this.fileList = fileList
    },
    httpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'superman-20221013-1314348455', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传失败')
        this.$emit('on-success', {
          imgURL: 'http://' + data.Location
        })
        this.$message.success('上传成功')
        this.loading = false
      })
    },
    beforeUpload(file) {
      const arr = ['image/jpeg', 'image/gif', 'image/png']
      if (!arr.includes(file.type)) {
        this.$message.error(`只允许上传${arr.join(',')}`)
        return false
      }
      const limit = 5 * 1024 * 1024
      if (file.size > limit) {
        this.$message.error('上传图片不能大于10Mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.inputW{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
