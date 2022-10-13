import request from '@/utils/request'
export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserdetailsAPI = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

/**
 * 保存用户信息
 * @param {Object} id
 * @returns Promise
 */
export const saveUserdetailsAPI = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
