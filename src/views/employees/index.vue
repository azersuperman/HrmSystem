<template>
  <div class="app-container">
    <PageTools type="success">
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import')"
        >导入</el-button>
        <el-button
          size="small"
          type="danger"
          @click="exportExcel"
        >导出</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleEmploy"
        >新增员工</el-button>
      </template>
    </PageTools>
    <addEmployee :dialogVisible.sync="dialogVisible"></addEmployee>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="list" :loading="loading">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatterfn"
        >
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="employDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="del(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next, sizes, total"
          :page-size.sync="page.size"
          :current-page.sync="page.page"
          :page-sizes="[2, 5, 10, 15]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Eumpot from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employ'
import addEmployee from '@/views/employees/components/add-employee.vue'
// import PageTools from '@/components/PageTools'
export default {
  components: {
    // PageTools
    addEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      Eumpot: Eumpot.hireType,
      dialogVisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterfn(row, column, cellValue) {
      const res = this.Eumpot.find((ele) => ele.id === cellValue)
      return (res && res.value) || '非正式'
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除？', '提示', {
          type: 'warning'
        })
        await delEmployee(id)
        this.$message('删除成功')
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    async exportExcel() {
      // 文件懒加载
      // import('@/vendor/Export2Excel').then((res) => {
      //   console.log(res)
      // })
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')

      // 实现数据处理
      const exportExcelMapPath = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((ele) => {
          if (ele === '聘用形式') {
            const find = this.Eumpot.find((hire) => {
              return hire.id === item[exportExcelMapPath[ele]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[ele]]
        })
      })

      export_json_to_excel({
        header, // 表头 必填
        multiHeader: [['手机号', '主要信息', '', '', '', '核心', '']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2'],
        data, // 具体数据 必填
        filename: '黑马员工-第九小组', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    employDetail(row) {
      this.$router.push('/employees/Detail/' + row.id)
    }
  }
}
</script>

<style>
</style>
