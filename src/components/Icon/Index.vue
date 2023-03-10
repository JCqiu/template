<template>
    <icon-font :type="'icon-' + type" />
</template>

<script setup>
import { defineProps } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue';

const props = defineProps({ type: String })
const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/c/font_3890444_4r28xd1ltuq.js' });
</script>

<style scoped>

</style>