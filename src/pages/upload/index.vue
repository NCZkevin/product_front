<template>
  <d2-container>
    <el-card shadow="never" class="d2-card">
        <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
</style>
