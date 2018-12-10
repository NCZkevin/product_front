<template>
  <d2-container>
    <div class="filter-container">
      <el-input placeholder="产品名" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
    </div>

      <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
     <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="条码"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gtin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.classes.length!=0">{{ scope.row.classes[0].name}}</span>
          <span v-else>无</span>
        </template>
      </el-table-column> -->
      <el-table-column label="规格" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.spec }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
              <el-select v-model="scope.row.classes[0]" clearable placeholder="未分类"  class="inline-input">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-success"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-error" @click="handleModifyStatus(scope.row)">
          </el-button>
          <el-button v-if="scope.row.status=='click'" size="mini" type="success" icon="el-icon-check" circle></el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

  </d2-container>
</template>

<script>
import { GoodTableList, ClassesList, UpdateTag } from '@/api/api.js'
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
/* eslint-disable */
import axios from '@/plugin/axios'



export default {
  name: 'prolist',
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      options: [],
      pageurl: 'null',
      total: null,
      listLoading: false,
      state1: '',
      categs: [],
      listQuery: {
        page: 1,
        limit: 50,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '未审核',
        click: 0
      },
      sortOptions: [{ label: '全部', key: '2' },{ label: '已审核', key: '1' }, { label: '未审核', key: '0' }],
      showReviewer: false,
      temp: {},
      classes: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    ClassesList().then(response => {
        this.categs = response
        for (const categ of this.categs) {
            var opt = {
            value: categ.name,
            label: categ.name
            }
            this.options.push(opt)
        }
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      GoodTableList({page: this.listQuery.page,search:this.listQuery.title,is_class:0,is_click:this.listQuery.click}).then(response => {
        this.list = response.results
        this.total = response.count
        // console.log(this.listQuery)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleFilter() {
      if (this.listQuery.sort == 0) {
        this.listQuery.click = 0
        this.listQuery.page = 1
        this.getList()
      } else if (this.listQuery.sort == 1) {
        this.listQuery.click = 1
        this.listQuery.page = 1
        this.getList()
      } else {
        this.listQuery.click = undefined
        this.getList()
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleRefresh() {
        this.getList()
    },
    querySearch(queryString, cb) {
        var category = this.categs;
        var results = queryString ? category.filter(this.createFilter(queryString)) : category;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    handleModifyStatus(row) {
      this.temp = Object.assign({}, row) // copy obj
      UpdateTag(this.temp.id,{
          'is_click': 1
      }).then(res => {
          console.log(res)
      })        
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = 'click'
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '创建成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleSelect(item) {
        this.state1 = item.name
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      if(this.temp.classes[0] == undefined){
        this.$message({
          message: '失败,请选择类别',
          type: 'warning'
        })
      } else {
      UpdateTag(this.temp.id,{
          'classes': [{"name":this.temp.classes[0]}]
      }).then(res => {
          console.log(res)
      })            
      row.status = 'click'
      }
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
  }
}
</script>

<style scoped>
.filter-container {
  padding-bottom: 10px
}
.filter-container .filter-item {
    display: inline-block;
    margin-bottom: 10px;
    vertical-align: middle;
    margin-left: 10px;
}
.pagination-container {
    margin-top: 30px;
}
.inline-input {
    width: 50%;
    margin-right: 10px; 
}
</style>
