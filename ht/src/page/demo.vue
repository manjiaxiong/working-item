<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://up-z0.qiniup.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadRequest"
      :data="uptoken"
    >
      <img v-if="form.url" :src="form.url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { upload } from "@/util/qiniu.js";
import api from "@/api/imgUp";
export default {
  data() {
    return {
      form: "",
      uptoken: {
        token: "",
        key: ""
      }
    };
  },
  methods: {
    uploadRequest: function(request) {
      fetch("http://192.168.0.110:12306/getToken", {
        mode: "cors",
        method: "get"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {

          let token = res.name;
          let host = "keleziyouxing";
          upload(
            token,
            request,
            next => {
              let total = next.total;
              console.log(next);
            },
            error => {
              console.log(error,"我是错误信息");
            },
            complete => {//
              let hash = complete.hash;
              let key = complete.key;
              // this.form.url = host + "/" + key;
              
              console.log(complete);
              console.log(key);
            }
          );
        });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>