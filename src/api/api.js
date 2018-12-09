/* eslint-disable */
import request from '@/plugin/axios'
import { dev, pro } from './url'
var baseurl = dev

export function GetDashboard (data) {
  return request({
    url: baseurl + 'dashboard',
    method: 'get',
    params: data
  })
}

export function CategTableList (data) {
  return request({
    url: baseurl + 'categorys/',
    method: 'get',
    params: data
  })
}

export function GoodTableList (data) {
    return request({
      url: baseurl + 'goods/',
      method: 'get',
      params: data
    })
  }

export function UpdateTag (data) {
  return request({
    url: baseurl + 'goods/',
    method: 'patch',
    data: data
  })
}

export function CompanyList (data) {
  return request({
    url: baseurl + 'company/',
    method: 'get',
    params: data
  })
}
  
export function ClassesList (data) {
  return request({
    url: baseurl + 'classes/',
    method: 'get',
    params: data
  })
}

export function CompanyRule (data) {
  return request({
    url: baseurl + 'rule/company/',
    method: 'post',
    data: data
  })
}


