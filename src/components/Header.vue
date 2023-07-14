<template>
  <div id="header">
    <template>
      <div class="header">
        <slot name="left" class="left"></slot>
        <slot name="center" class="center"></slot>
        <slot name="right" class="right"></slot>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      goBack() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
  .header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 44px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    background-color: #eb4450;
    z-index: 99;
  }
  .left,
  .right {
    flex: 1;
  }
  .center {
    flex: 6;
    text-align: center;
    line-height: 44px;
    font-weight: 800;
    color: #fff;
  }

  /* 返回按钮 */
  .left {
    text-align: center;
    line-height: 44px;
  }
  .left i {
    font-size: 26px;
    color: #fff;
  }
</style>