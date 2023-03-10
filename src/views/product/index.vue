<template>
    <Filter @search="search" />
    <div class="list">
        <!-- <a-space style="padding-left: 20px;margin-bottom: 10px;">
            <a-button type="primary" @click="asyncGoods">
                <template #icon>
                    <Icon type="add" />
                </template>上架
            </a-button>
            <a-button @click="asyncGoods">
                <template #icon>
                    <Icon type="rest" />
                </template>下架
            </a-button>
        </a-space> -->
        <a-table :loading="loading" :dataSource="data" :columns="columns" :row-selection="rowSelection"
            :pagination="pagination" @change="changePage">
            <template #bodyCell="{ column, text, record, index }">
                <template v-if="column.dataIndex === 'index'">{{ index + 1 }}</template>
                <template v-if="column.dataIndex === 'majorImage'">
                    <a-image :width="100" :src="text" />
                </template>
                <template v-if="column.dataIndex === 'recommendStatus'">{{ text === 0 ? '否' : '是' }}</template>
                <template v-if="column.dataIndex === 'salesMethods'">{{ salesMethods[text] }}</template>
                <template v-if="column.dataIndex === 'immediatePrice'">
                    {{ text }}{{ !record.multiplePrice ? '' : '起' }}
                </template>
                <template v-if="column.dataIndex === 'onlinePrice'">
                    {{ text }}{{ !record.multiplePrice ? '' : '起' }}
                </template>
                <template v-if="column.dataIndex === 'editor'">
                    <a-space style="padding-left: 20px;margin-bottom: 10px;">
                        <Editor :id="record.id" @refresh="getData">
                            <a-button type="link">
                                <template #icon>
                                    <Icon type="editor" />
                                </template>
                                库存设置
                            </a-button>
                        </Editor>
                        <a-button type="link" v-if="!record.salesStatus" @click="upOrDown(record.id, 1)">
                            <template #icon>
                                <Icon type="add" />
                            </template>上架
                        </a-button>
                        <a-button danger type="link" v-else @click="upOrDown(record.id, 0)">
                            <template #icon>
                                <Icon type="add" />
                            </template>下架
                        </a-button>
                    </a-space>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { message, Modal } from 'ant-design-vue'
import Filter from './components/filter.vue';
import Editor from './components/Editor.vue'
import { getGoodsList, upOrDownGoods } from '@/apis/product';

const salesMethods = {
    0: '堂食',
    1: '外卖',
    2: '堂食、外卖'
}
let data = ref([])
let checkArray = ref([])
let loading = ref(false)
const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
    size: 10,
    showTotal: (total) => `总共${total}条`,
    showLessItems: true,
    showQuickJumper: true,
    showSizeChanger: true,
})

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        checkArray.value = selectedRows
    },
};

const columns = [
    {
        title: '商品编号',
        dataIndex: 'index',
        key: 'index',
        id: 'index',
    },
    {
        title: '商品图片',
        dataIndex: 'majorImage',
        key: 'majorImage',
        id: 'majorImage',
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        key: 'commodityName',
        id: 'commodityName',
    },
    {
        title: '所属类别',
        dataIndex: 'commodityCategoryName',
        key: 'commodityCategoryName',
        id: 'commodityCategoryName',
    },
    {
        title: '售卖渠道',
        dataIndex: 'salesMethods',
        key: 'salesMethods',
        id: 'salesMethods',
    },
    {
        title: '堂食价格',
        dataIndex: 'immediatePrice',
        key: 'immediatePrice',
        id: 'immediatePrice',
    },
    {
        title: '外卖价格',
        dataIndex: 'onlinePrice',
        key: 'onlinePrice',
        id: 'onlinePrice',
    },
    {
        title: '推荐',
        dataIndex: 'recommendStatus',
        key: 'recommendStatus',
        id: 'recommendStatus',
    },
    {
        title: '操作',
        dataIndex: 'editor',
        key: 'editor',
    },
];

const changePage = (page) => {
    pagination.value = { ...pagination.value, ...page }
    getData()
}

const search = (e) => {
    pagination.value = { ...pagination.value, ...e };
    getData()
}

const upOrDown = async (id, type) => {
    Modal.confirm({
        title: `确定${type ? '上架' : '下架'}该商品?`,
        onOk: async () => {
            await upOrDownGoods({ shopCommodityIds: id, salesStatus: type }, true)
            getData()
        }
    });
}

const getData = async () => {
    loading.value = true
    pagination.value.size = pagination.value.pageSize
    const { records, total } = await getGoodsList(pagination.value)
    loading.value = false
    pagination.value.total = total
    records.forEach((item, index) => item.key = index);
    data.value = records
}

getData()
</script>

<style lang="less">
.list {
    background-color: #fff;
    padding: 16px 0;
    border-radius: 10px;
}
</style>