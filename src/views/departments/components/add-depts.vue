<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="dialogVisible" @close="handleAdd">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref='addDeptForm' label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="employ">
          <el-option v-for="item in employs" :key='item.id' :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading='loading' type="primary" size="small" @click='submit'>确定</el-button>
        <el-button size="small" @click="handleAdd">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, submitAPI, updateDepartments } from '@/api/departments'
import { employAPI } from '@/api/employ'
export default {
  name: 'HrsaasAddDept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const gbca = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      if (this.formData.id) {
        isRepeat = depts.some(ele => ele.code === value && ele.id !== this.formData.id)
      } else {
        isRepeat = depts.some(ele => ele.code === value)
      }
      isRepeat ? callback(new Error(`模块下已存在${value}`)) : callback()
    }
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      if (this.formData.id) {
        const deptstj1 = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
        isRepeat = deptstj1.some(ele => ele.name === value)
        console.log(deptstj1)
      } else {
        const deptstj = depts.filter(item => item.pid === this.treeNode.id)
        isRepeat = deptstj.some(ele => ele.name === value)
      }
      isRepeat ? callback(new Error(`当前部门下方已存在该子部门`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [{ required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: gbca, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人必填' }
        ],
        introduce: [{ required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门名称1-50个字符', trigger: 'blur' }
        ]
      },
      employs: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑模式' : '新增模式'
    }
  },
  methods: {
    handleAdd() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async employ() {
      this.employs = await employAPI()
    },
    async submit() {
      try {
        await this.$refs.addDeptForm.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartments(this.formData)
          this.$message.success('编辑成功')
        } else {
          await submitAPI({ ...this.formData, pid: this.treeNode.id })
          this.$message.success('新增成功')
        }
        console.log(this.formData)
        this.$parent.getDepartments()
        this.handleAdd()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
