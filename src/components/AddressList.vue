<template>
  <div class="addressList">
    <div class="addressBox" @click="addressShow = !addressShow">
      <van-icon name="location-o" />
      <div class="addressDetail">{{ addressDetails }}</div>
    </div>
    <!-- 收货地址弹出框 -->
    <van-popup
      v-model="addressShow"
      round
      position="bottom"
      :style="{ 'max-height': '70%' }"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-popup>
    <!-- 编辑地址弹出框 -->
    <van-popup
      van-popup
      v-model="changeShow"
      round
      position="bottom"
      :style="{ 'max-height': '70%' }"
    >
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :address-info="addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
  import { areaList } from '@vant/area-data';
  import { nanoid } from 'nanoid';

  export default {
    name: 'AddressList',
    data() {
      return {
        list: JSON.parse(localStorage.getItem('address')) ? JSON.parse(localStorage.getItem('address')) : [],
        addressShow: false,
        changeShow: false,
        chosenAddressId: '',
        addressInfo: {},
        addressIndex: null,
        addressIsDefault: null,
        areaList,
      }
    },
    computed: {
      addressDetails() {
        if (!this.list.length == 0) {
          let value = ''
          if (this.list.some(item => item.id == this.chosenAddressId))
            value = this.list.filter(val => val.id == this.chosenAddressId)[0].address
          else
            value = this.list[0].address
          return value
        }
        else
          return '还没有收货地址哦,赶紧添加一个吧!'
      }
    },
    methods: {
      //   点击新增地址
      onAdd() {
        this.addressInfo = {}
        this.addressIndex = this.list.length
        this.op_cl()
      },

      //点击编辑地址
      onEdit(item, index) {
        this.addressInfo = item
        this.addressIndex = index
        this.addressIsDefault = item.isDefault
        this.op_cl()
      },

      //保存  ||  更新的地址信息
      onSave(content) {
        content.address = content.province + content.city + content.county + content.addressDetail
        if (this.list.length == 0) {  //添加第一个地址
          content.id = nanoid() //给新地址添加id标识
          this.list.push(content)
          this.chosenAddressId = content.id
        }
        //点编辑进入
        else if (this.list.some(val => val.id == content.id)) {
          //判断isDefault选中情况
          if (content.isDefault) { //如果isDefault为真，则让其成为默认地址
            this.list.forEach(val => {
              if (val.id == content.id) {
                val.isDefault = true
                this.chosenAddressId = content.id  //获得默认选中的地址id
                this.list.splice(this.addressIndex, 1)  //删除该地址
                this.list.unshift(content)  //重新将该地址放置第一位
              } else {
                val.isDefault = false
              }
            })
            this.list.splice(0, 1, content)  //将该数据放到数组第一位后，对修改的信息进行保存 
          }
          /**判断用户是否进行isDefault的修改
          现在的isDefalut与传进来的isDefault进行对比
          如果为真，则代表用户没有进行修改
          **/
          else if (!this.addressIsDefault == content.isDefault) {
            content.isDefault = true  //让这个地址重新变成默认地址
            this.list.splice(this.addressIndex, 1, content)  //对修改的信息进行保存
            this.chosenAddressId = content.id   //获得默认选中的地址id
          }
          else
            this.list.splice(this.addressIndex, 1, content)  //对修改的信息进行保存
        }
        //点新增进入
        else {
          content.id = nanoid() //给新地址添加id标识
          if (content.isDefault) { //新地址选择了默认地址选项
            this.list.forEach(val => val.isDefault = false) //把数组里所有地址的isDefault全部改为 false
            content.isDefault = true  //让新地址变成默认地址
            this.chosenAddressId = content.id   //获得默认选中的地址id
            this.list.unshift(content)
          } else {
            this.list.push(content)
          }
        }
        localStorage.setItem('address', JSON.stringify(this.list))
        this.op_cl()
      },

      //删除收货地址
      onDelete() {
        this.list.splice(this.addressIndex, 1)
        localStorage.setItem('address', JSON.stringify(this.list))
        this.op_cl()
      },

      //关闭地址选择栏,打开地址修改栏
      op_cl() {
        this.changeShow = !this.changeShow
        this.addressShow = !this.addressShow
      }
    },
    created() {
      this.chosenAddressId = this.list.length ? this.list[0].id : null
    },
  }
</script>

<style scoped>
  .addressBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    margin-bottom: 8px;
    border-radius: 0 0 10px 10px;
    font-size: 13px;
    background-color: #fafafa;
  }

  /* 组件样式 */
  .addressList {
    margin-top: 44px;
  }
  .addressList /deep/.van-address-edit__buttons {
    padding: 32px 4px 0px;
  }
</style>