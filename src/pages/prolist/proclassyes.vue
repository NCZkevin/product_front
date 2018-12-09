<template>
  <d2-container>
    <div class="filter-container">
      <el-input placeholder="产品名" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!-- <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select> -->
      <!-- <el-select v-model="listQuery.type" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select> -->

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> -->
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox> -->
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
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.spec }}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.classes.length!=0">{{ scope.row.classes[0].name}}</span>
          <span v-else>无</span>
        </template>
      </el-table-column> -->
      <el-table-column label="公司" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
          <!-- <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
        <!-- <el-autocomplete
        class="inline-input"
        v-model="scope.row.classes[0]"
        :fetch-suggestions="querySearch"
        placeholder="未分类"
        @select="handleSelect"
        >
        <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
        </template>
        </el-autocomplete> -->
              <el-select v-model="scope.row.classes[0].name" clearable placeholder="未分类"  class="inline-input">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)" icon="el-icon-success"></el-button>
          <!-- <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'已分类')">发布
          </el-button> -->
          <!-- <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button> -->
          <!-- <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'删除')">删除
          </el-button> -->
          <el-button size="mini" type="danger" icon="el-icon-error" @click="handleModifyStatus(scope.row)"></el-button>
          <el-button v-if="scope.row.status=='click'" size="mini" type="success" icon="el-icon-check" circle></el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!-- <el-form-item :label="$t('table.type')" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item> -->
        <el-form-item label="条码" prop="gtin">
          <el-input v-model="temp.gtin"/>
        </el-form-item>
        <el-form-item label="产品名" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="temp.company"/>
        </el-form-item>
        <el-form-item label="分类" prop="classname">
          <el-input v-model="temp.classname"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('table.remark')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
        <el-button v-else type="primary" @click="updateData">确认</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>

<script>
import { GoodTableList, ClassesList } from '@/api/api.js'
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
/* eslint-disable */
import axios from '@/plugin/axios'

const calendarTypeOptions = [
  { key: '0', display_name: '已分类' },
  { key: '1', display_name: '未分类' },
  { key: '2', display_name: '多分类' },
]


// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'prolist',
  filters: {
    statusFilter(status) {
      // const statusMap = {
      //   published: 'success',
      //   draft: 'info',
      //   deleted: 'danger'
      // }
      const statusMap = ['danger','success']
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      pageurl: 'null',
      total: null,
      options: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 50,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '未审核',
        click: 0
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: '全部', key: '2' },{ label: '已审核', key: '1' }, { label: '未审核', key: '0' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      // temp: {
      //   id: undefined,
      //   importance: 1,
      //   remark: '',
      //   timestamp: new Date(),
      //   title: '',
      //   type: '',
      //   status: 'published',
        
      // },
      temp: {},
      classes: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
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
            value: categ.id,
            label: categ.name
            }
            this.options.push(opt)
        }
        // console.log(this.options)
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      GoodTableList({page: this.listQuery.page,search:this.listQuery.title,is_class:1,is_click:this.listQuery.click}).then(response => {
        this.list = response.results
        this.total = response.count
        // console.log(this.listQuery)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })

      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
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
    handleModifyStatus(row) {
      this.temp = Object.assign({}, row) // copy obj
      axios.patch('http://localhost:8000/goods/' + this.temp.id + '/',{
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      axios.patch('http://localhost:8000/goods/' + this.temp.id + '/',{
          'classes': [{"name":this.temp.classes[0].name}]
      }).then(res => {
          console.log(res)
      })
      row.status = 'click'
    //   UpdateTag(
          
    //   ).then(response => {

    //   })

    //   if(this.temp.is_class != 0){
    //     this.temp.classname = this.temp.classes[0].name
    //   }
    //   else {
    //     this.temp.classname = ''
    //   }
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })

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
    handleFetchPv(pv) {
      // fetchPv(pv).then(response => {
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
    },
    handleDownload() {
      this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal, this.list)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    }
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // }
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
