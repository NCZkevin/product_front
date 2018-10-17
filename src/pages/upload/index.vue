<template>
  <d2-container>
    <el-card shadow="never" class="d2-card">
        <h2>上传产品数据</h2>
        <el-upload
        class="upload-demo"
        ref="upload"
        action="http://127.0.0.1:8000/upload/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforefileUpload"
        :on-success = 'handleSuccess'
        :limit="1"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传规定格式文件，且不超过500kb</div>
        </el-upload>
    </el-card>

    <el-card shadow="never" class="d2-card">
        <h2>上传分类数据(格式未定)</h2>
        <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforefileUpload"
        :on-success = 'handleSuccess'
        :limit="1"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传规定格式文件，且不超过500kb</div>
        </el-upload>
    </el-card>
  </d2-container>
</template>

<script>
/* eslint-disable */
import { GoodTableList,CategTableList,CompanyList,ClassesList } from '@/api/api.js'

  export default {
    name: 'upload',
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      beforefileUpload(file) {
        let Xls = file.name.split('.');
        if(Xls[1] === 'xls'||Xls[1] === 'xlsx'||Xls[1] === 'csv'){
          return file
        }else {
          this.$message.error('上传文件只能是 xls/xlsx/csv 格式!')
          return false
        } 
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(res,file,fileList){
        if(res.code==201){
          this.$message({
            message: res.msg,
            type: 'success'
          });
        }else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      }
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
.el-card {
  margin-top: 20px;
}
</style>
