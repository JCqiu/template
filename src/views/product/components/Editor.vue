<template>
    <div @click="visible = true">
        <slot></slot>
    </div>
    <a-drawer v-model:visible="visible" title="编辑类型" :width="1000" @ok="submit">
        <a-descriptions title="商品信息" bordered>
            <a-descriptions-item label="商品名称">{{ form.commodityName }}</a-descriptions-item>
            <a-descriptions-item label="商品单位">{{ form.unitName }}</a-descriptions-item>
            <a-descriptions-item label="所属分类">{{ form.commodityCategoryName }}</a-descriptions-item>
            <a-descriptions-item label="是否推荐">
                <a-tag color="success" v-if="form.recommendStatus == 1">是</a-tag>
                <a-tag color="error" v-if="form.recommendStatus == 0">否</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="销售渠道" :span="2">
                {{ saleChannel[form.saleChannels] }}
            </a-descriptions-item>
            <!-- <a-descriptions-item v-for="item in form.commoditySkuVOS" :label="'规格' + item.id" :span="3">{{
                item.immediatePrice
            }}</a-descriptions-item> -->
            <a-descriptions-item label="商品图片" :span=3>
                <a-image :width="200" v-for="item in form.commodityFiles" :src="item.resourceUrl" />
            </a-descriptions-item>
        </a-descriptions>
        <a-form :model="form" ref="formRef">
            <a-row style="margin-top: 20px;">
                <a-col :span="24">
                    <a-table :dataSource="data" :columns="columns" :pagination="false" :defaultExpandAllRows="true">
                        <template #bodyCell="{ column, text, record, index }">
                            <template v-if="column.dataIndex === 'immediatePrice'">
                                <template v-if="!record.children">￥{{ text }}</template>
                                <template v-else>{{ '' }}</template>
                            </template>
                            <template v-if="column.dataIndex === 'stock'">
                                <template v-if="!record.children">
                                    <a-input-number v-model:value="record.stock" :min="0" style="width: 100%;" />
                                </template>
                                <template v-else>{{ '' }}</template>
                            </template>
                        </template>
                    </a-table>
                </a-col>
            </a-row>
            <!-- <a-row style="margin-top: 20px;">
                <a-col :span="24">
                    <a-form-item label="备注" name="remarkTag">
                        <a-textarea v-model:value="form.remarkTag" :rows="4" placeholder="请输入商品备注" :maxlength="6" />
                    </a-form-item>
                </a-col>
            </a-row> -->
        </a-form>
        <template #footer>
            <a-row justify="end">
                <a-col>
                    <a-space>
                        <a-button @click="visible = false">取消</a-button>
                        <a-button type="primary" @click="submit">提交</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </template>
    </a-drawer>
</template>

<script setup>
import { ref, watch, nextTick, defineEmits, defineProps } from 'vue';
import { PlusOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
import { setGoodsSotck, getGoodsDetail } from '@/apis/product'
import { getSystemDictionary } from '@/apis/goods'
import { getClassifySelect } from '@/apis/classify'
import { getSpecsSelect } from '@/apis/spec'
import { message } from 'ant-design-vue';

const props = defineProps({ id: String })
const emit = defineEmits(['refresh'])
const saleChannel = {
    0: '堂食',
    1: '外卖',
    2: '堂食和外卖'
}
const formRef = ref(null)
let visible = ref(false)
let classifyList = ref([])
let unitList = ref([])
let specsList = ref([])
let form = ref({
    commodityName: null,
    categoryId: null,
    salesMethods: 0,
    commodityUnit: null,
    recommendStatus: 0,
    specsStatus: null,
    remarkTag: null,
    commodityImageUrls: [],
    commoditySkuList: [],
    commoditySku: [{ value: null }]
})

let data = ref([])
const columns = ref([
    {
        title: '规格',
        dataIndex: 'specs',
        key: 'specs',
    },
    {
        title: '店内价格',
        dataIndex: 'immediatePrice',
        key: 'immediatePrice',
        width: '40%'
    },
    {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        width: '40%'
    },
])

const getClassifyList = async () => classifyList.value = await getClassifySelect()
const getSpecsList = async () => specsList.value = await getSpecsSelect()
const getUnitList = async () => unitList.value = await getSystemDictionary('commodity_unit')

const submit = async () => {
    let newArray = [];
    data.value.forEach(item => {
        if (item.children) {
            item.children.forEach(current => {
                console.log(current);
                if (current.immediatePrice === null) {
                    message.error('价格不能为空')
                    throw new Error('价格不能为空')
                }
                if (current.stock === null) {
                    message.error('库存不能为空')
                    throw new Error('库存不能为空')
                }
                newArray.push({
                    firstSpecsValueId: item.specId,
                    secondSpecsValueId: current.specId,
                    immediatePrice: current.immediatePrice,
                    stock: current.stock
                })
            });
        } else {
            if (item.immediatePrice === null) {
                message.error('价格不能为空')
                throw new Error('价格不能为空')
            }
            if (item.stock === null) {
                message.error('库存不能为空')
                throw new Error('库存不能为空')
            }
            newArray.push({
                firstSpecsValueId: item.specId,
                immediatePrice: item.immediatePrice,
                stock: item.stock,
            })
        }
    });
    for (let i = 0; i < form.value.commoditySkuVOS.length; i++) {
        if (form.value.commoditySkuVOS[i].firstSpecsValueId !== -1 && form.value.commoditySkuVOS[i].secondSpecsValueId !== -1) {
            for (let j = 0; j < newArray.length; j++) {
                if (form.value.commoditySkuVOS[i].firstSpecsValueId === newArray[j].firstSpecsValueId && form.value.commoditySkuVOS[i].secondSpecsValueId === newArray[j].secondSpecsValueId) {
                    newArray[j].id = form.value.commoditySkuVOS[i].id
                }
            }
        }
        if (form.value.commoditySkuVOS[i].firstSpecsValueId !== -1 && form.value.commoditySkuVOS[i].secondSpecsValueId === -1) {
            for (let j = 0; j < newArray.length; j++) {
                if (form.value.commoditySkuVOS[i].firstSpecsValueId === newArray[j].firstSpecsValueId) {
                    newArray[j].id = form.value.commoditySkuVOS[i].id
                }
            }
        }
    }
    newArray = newArray.map(({ id, stock }) => ({ shopCommoditySkuId: id, stock: stock }))
    try {
        await setGoodsSotck(newArray, true)
        emit('refresh')
        visible.value = false
    } catch (error) {
        console.log(error);
    }
}

watch(visible, async (val) => {
    nextTick(() => formRef.value.resetFields())
    if (val) {
        getClassifyList()
        getUnitList()
        getSpecsList()
        if (props.id) {
            form.value = await getGoodsDetail(props.id)
            form.value.commoditySku = JSON.parse(form.value.commoditySku)
            data.value = JSON.parse(form.value.commoditySkuTable)
            for (let i = 0; i < form.value.commoditySkuVOS.length; i++) {
                if (form.value.commoditySkuVOS[i].firstSpecsValueId !== -1 && form.value.commoditySkuVOS[i].secondSpecsValueId !== -1) {
                    for (let j = 0; j < data.value.length; j++) {
                        if (form.value.commoditySkuVOS[i].firstSpecsValueId === data.value[j].specId && form.value.commoditySkuVOS[i].secondSpecsValueId === data.value[j].specId) {
                            data.value[j].stock = form.value.commoditySkuVOS[i].stock
                        }
                    }
                }
                if (form.value.commoditySkuVOS[i].firstSpecsValueId !== -1 && form.value.commoditySkuVOS[i].secondSpecsValueId === -1) {
                    for (let j = 0; j < data.value.length; j++) {
                        if (form.value.commoditySkuVOS[i].firstSpecsValueId === data.value[j].specId) {
                            data.value[j].stock = form.value.commoditySkuVOS[i].stock
                        }
                    }
                }
            }
        }
    }
})
</script>

<style lang="less"></style>
