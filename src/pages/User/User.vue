<template>
  <div class="personal-center">
    <el-row class="profile-container">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="title">我的资料</div>
          <div class="avatar">
            <el-avatar :size="120" :src="avatarUrl"></el-avatar>
          </div>
          <div class="username">{{userInfo.nickName}}</div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="info-container" shadow="hover">
          <div slot="header" class="title">详细信息</div>
          <el-form :model="userInfo" label-width="80px" ref="userInfoForm" :rules="rules">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="userInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="userInfo.realName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitUserInfo">提交信息</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      avatarUrl: "https://picsum.photos/200/200",
      username: "小明",
      userInfo: {
        nickName: "",
        realName: "",
        email: "",
        phone: "",
      },
      rules: {
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitUserInfo() {
      this.$refs.userInfoForm.validate((valid) => {
        if (valid) {
          // TODO: 提交表单数据
          this.$message.success("提交成功");
        } else {
          this.$message.error("提交失败");
          return false;
        }
      });
    },
    getUserInfo() {
      this.userInfo.nickName = this.userInfos.nickName;
      this.userInfo.realName = this.userInfos.name;
      this.userInfo.phone = this.userInfos.phoneNum;
      this.userInfo.email = this.userInfos.email;
      //   this.avatarUrl = this.userInfos.headImg;


    }
  },
  mounted() {

    console.log(this.userInfos);
    this.getUserInfo();

  },
  computed: {
    ...mapState({ userInfos: (state) => state.user.userInfo }),
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  background-color: #f5f7fa;
}
.avatar {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.username {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
.profile-container {
  margin-bottom: 20px;
}
.info-container {
  border: none;
}
</style>