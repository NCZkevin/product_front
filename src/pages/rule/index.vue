<template>
  <d2-container>
      <el-card shadow="never" class="d2-card">
        <template slot="header">根据公司分类</template>
        <el-row class="my-autocomplete">
            <el-col :span="8">
                <div class="sub-title">输入公司名称</div>
                <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch2"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect2"
                >
                <template slot-scope="{ item }">
                    <div class="name">{{ item.company }}</div>
                </template>
                </el-autocomplete>
            </el-col>
            <el-col :span="8">
                <div class="sub-title">输入默认类别</div>
                <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                >
                <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                </template>
                </el-autocomplete>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" class="card-button" @click="baseCpRule">确认</el-button>
            </el-col>
        </el-row>
      </el-card>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { GoodTableList,CategTableList,CompanyList,ClassesList,CompanyRule } from '@/api/api.js'

export default {
  name: 'rule',
  data() {
    return {
      list: null,
      company: [],
      categs: [],
      category: [],
      state1: '',
      state2: ''
    }
  },
  created() {
    this.loadGoods()
  },
  methods: {
    querySearch(queryString, cb) {
        var category = this.categs;
        var results = queryString ? category.filter(this.createFilter(queryString)) : category;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    querySearch2(queryString, cb) {
        var category = this.company;
        var results = queryString ? category.filter(this.createFilter2(queryString)) : category;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (categ) => {
            return (categ.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    createFilter2(queryString) {
        return (categ) => {
            return (categ.company.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    loadGoods() {
      CompanyList().then(response => {
        this.company = response
        // console.log(this.company)
      })
     ClassesList().then(response => {
        // response.forEach(item => {
        //     this.categs.push(item.name)
        // });
        this.categs = response
        // console.log(typeof(this.categs))
        // console.log(this.categs)
      })
    },
    handleSelect(item) {
        this.state1 = item.name
        console.log(item);
    },
    handleSelect2(item) {
        this.state2 = item.company
        console.log(item);
    },
    baseCpRule() {
      CompanyRule({comy: this.state2,categ:this.state1}).then(res => {
        this.$message({
            message: res.num+"条产品被分类",
            type: 'success'
        });
      })
    }
},
  mounted() {
    // this.category = this.categs;
}
}
</script>

<style lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #8492a6;
}
.inline-input {
    width: 70%;
}
.card-button {
    margin-top: 30px;
}
</style>
