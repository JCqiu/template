<template>
    <div class="filter">
        <a-form :model="form" ref="formRef" layout="inline">
            <a-row justify="space-between">
                <a-col>
                    <a-space>
                        <a-form-item label="商品名称" name="commodityName">
                            <a-input v-model:value="form.commodityName" placeholder="搜索关键词" />
                        </a-form-item>

                        <a-form-item label="商品分类" name="categoryIds">
                            <a-select v-model:value="form.categoryIds" :options="classifyList" style="width: 180px"
                                :fieldNames="{ label: 'categoryName', value: 'categoryId' }" placeholder="请选择商品分类">
                            </a-select>
                        </a-form-item>
                        <a-form-item label="推荐状态" name="recommendStatus">
                            <a-select v-model:value="form.recommendStatus"
                                :options="[{ label: '是', value: 1 }, { label: '否', value: 0 }]" style="width: 180px"
                                placeholder="请选择推荐状态">
                            </a-select>
                        </a-form-item>
                        <!-- <a-form-item label="门店" name="shopId">
                            <a-select v-model:value="form.shopId" :options="shopList" style="width: 180px"
                                :fieldNames="{ label: 'shopName', value: 'shopId' }" placeholder="请选择门店">
                            </a-select>
                        </a-form-item> -->
                        <a-form-item>
                            <a-space>
                                <a-button @click="rest">
                                    <template #icon>
                                        <!-- <Icon type="rest" /> -->
                                    </template>重置
                                </a-button>
                                <a-button type="primary" @click="search">
                                    <template #icon>
                                        <!-- <Icon type="search" /> -->
                                    </template>查询
                                </a-button>
                            </a-space>
                        </a-form-item>
                    </a-space>
                </a-col>
                <a-col>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
// import { getStoreList } from '@/apis/store'
import { getClassifySelect } from '@/apis/classify'

const emit = defineEmits()
const formRef = ref(null)
const form = ref({
    commodityName: null,
    categoryIds: null,
    recommendStatus: null,
    shopId: null
})
let shopList = ref([])
let classifyList = ref([])

const getData = async () => {
    // shopList.value = await getStoreList()
    classifyList.value = await getClassifySelect()
}
const rest = () => {
    formRef.value.resetFields()
    emit('search', form.value)
}

const search = () => emit('search', form.value)

getData()
</script>

<style lang="less">
.filter {
    background-color: #fff;
    padding: 16px 20px;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>