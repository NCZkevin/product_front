import request from '@/plugin/axios'
/* eslint-disable */
export function GetDashboard (data) {
  return request({
    url: 'http://localhost:8000/dashboard',
    method: 'get',
    params: data
  })
}

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
  
export function CompanyList (data) {
  return request({
    url: 'http://localhost:8000/company/',
    method: 'get',
    params: data
  })
}
  
export function ClassesList (data) {
  return request({
    url: 'http://localhost:8000/classes/',
    method: 'get',
    params: data
  })
}

export function CompanyRule (data) {
  return request({
    url: 'http://localhost:8000/rule/company/',
    method: 'post',
    data: data
  })
}


