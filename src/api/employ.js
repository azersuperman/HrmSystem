import request from '@/utils/request'
export const employAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 新增员工
 * @param {*} data
 * @returns
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 批量导入员工
 * @param {*} data
 * @returns
 */
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/**
 *
 * @param {*} id
 * @returns
 */
export function getbasicInformation(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 * 保存员工基本信息
 * @param {Object} data
 * @returns Promise
 */
export function saveEmloyeesInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/**
 * 获得员工岗位信息
 * @param {String} id
 * @returns
 */
export function getWorkInfo(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存员工岗位信息
 * @param {String} id
 * @returns
 */
export function saveWorkInfo(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
