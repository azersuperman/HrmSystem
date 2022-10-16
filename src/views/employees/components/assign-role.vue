<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="50%"
    @close="shutDown"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    shutDown() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>

</style>
