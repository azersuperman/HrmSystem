import request from '@/utils/request'
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 新增部门
 * @param {*} data
 * @returns
 */
export function submitAPI(data) {
  console.log(data)
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * 编辑接口
 * @param {Obect} data
 * @returns
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除部门
 * @param {Number} id
 * @returns
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
