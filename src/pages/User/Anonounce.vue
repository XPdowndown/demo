<template>
  <div class="notice-page">
    <el-card class="notice-card">
      <div slot="header" class="notice-header">
        <h2>最新公告</h2>
      </div>
      <div class="notice-table">
        <el-table :data="noticeList" style="width: 100%">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="publish_date" label="时间"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import * as moment from 'moment'
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
export default {
  data() {
    return {
      noticeList: [
        { title: '关于系统升级的通知', time: '2021-11-01' },
        { title: '中秋节放假通知', time: '2021-09-10' },
        { title: '寒假放假安排通知', time: '2022-01-01' }
      ]
    }
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    async getNoticeList() {
      const { data: res } = await axios.get('http://192.168.43.118:8888/api/getNotice')
      console.log(res);
      if (res.status !== 0) {
        return this.$message.error('获取公告失败！')
      }
      this.noticeList = res.data;
      this.noticeList.forEach(item => {
        item.publish_date = dayjs(item.publish_date).format("YYYY-MM-DD")
      })
      console.log(res.data);
    },
  }
}
</script>

<style>
.notice-page {
  padding: 20px;
}
.notice-card {
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
}
.notice-header {
  font-size: 20px;
  text-align: center;
}
.notice-table {
  margin-top: 20px;
}
</style>