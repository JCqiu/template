<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh');
</script>

<style lang="less">
html,
body,
p {
  margin: 0;
  background: none !important;
}

#app {
  width: 100%;
  height: 100%;

  .ant-pagination-item-active a {
    color: #fff !important;
  }

  .ant-table-tbody>tr.ant-table-row:hover {
    box-shadow: 0px 3px 10px 0px rgba(0, 95, 240, 0.1);
  }
}

// .ant-btn:hover {
//   background: #EBF3FF !important;
// }
</style>