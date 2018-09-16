import request from '@/plugin/axios'
/* eslint-disable */

export function CategTableList (data) {
  return request({
    url: 'http://localhost:8000/categorys/',
    method: 'get',
    params: data
  })
}

export function GoodTableList (data) {
    return request({
      url: 'http://localhost:8000/goods/',
      method: 'get',
      params: data
    })
  }
  
  