<template>
  <d2-container class="page">
    <!-- <d2-page-cover
      title="I AM D2ADMIN"
      sub-title="追求简约美感的后台管理系统集成方案">
      <d2-icon-svg style="width: 120px;" name="d2-admin"/>
      <template slot="footer">
        <div class="page__btn-group">
          <span @click="$open('https://github.com/d2-projects')">项目组</span> |
          <span @click="$open('https://d2-projects.github.io/d2-admin-doc/zh/')">使用文档</span> |
          <span @click="$open('https://github.com/d2-projects/d2-admin-start-kit')">简化版脚手架</span> |
          <span @click="$open('https://alibaba.github.io/ice/scaffold?type=vue')">飞冰物料</span> |
          <span @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金专栏</span> |
          <el-popover
            :width="172"
            trigger="hover">
            <p class="d2-mt-0 d2-mb-10">D2Projects</p>
            <img src="./image/qr@2x.png" style="width: 172px;">
            <span slot="reference">微信公众号</span>
            <p
              style="
                font-size: 12px;
                margin-top: 0px;
                margin-bottom: 0px;
              ">
              官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息
            </p>
          </el-popover>
        </div>
        <d2-help-btn class="d2-mt"/>
      </template>
    </d2-page-cover> -->
    <panel-group :goods="goods" @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <ve-histogram :data="chartData"></ve-histogram>
    </el-row>

    <el-card shadow="never" class="d2-card">
      <template slot="header">执行分类</template>
      <el-row class="startclass">
          <el-button disabled type="primary" class="card-button" @click="baseCpRule">开始分类</el-button>
      </el-row>
    </el-card>
  </d2-container>
</template>

<script>
import D2HelpBtn from './components/d2-help-btn'
import PanelGroup from './components/PanelGroup'
import { GetDashboard } from '@/api/api.js'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    D2HelpBtn,
    PanelGroup
  },
  data () {
    return {
      goods: {
        total: 0,
        is_class: 0,
        no_class: 0,
        percent: 0
      },
      lineChartData: lineChartData.newVisitis,
      chartData: {
        columns: ['品牌', '销量'],
        rows: [
          { '品牌': '农夫山泉', '销量': 193 },
          { '品牌': '恒大冰泉', '销量': 130 },
          { '品牌': '百岁山', '销量': 123 },
          { '品牌': '昆仑山', '销量': 83 },
          { '品牌': '依云', '销量': 42 },
          { '品牌': '巴黎水', '销量': 35 }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    },
    getData () {
      GetDashboard().then(res => {
        console.log(res)
        this.goods.total = res.total
        this.goods.is_class = res.is_class
        this.goods.no_class = res.no_class
        this.goods.percent = res.percent
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
