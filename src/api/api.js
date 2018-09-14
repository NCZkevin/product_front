import request from '@/plugin/axios'

export function CategTableList (data) {
  return request({
    url: 'http://localhost:8000/categorys/',
    method: 'get',
    data
  })
}
