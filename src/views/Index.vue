<template>
    <template v-if="wujie">
        <router-view />
    </template>
    <template v-else>
        <a-layout class="layout">
            <a-layout-header class="header"></a-layout-header>
            <a-layout>
                <a-layout-sider class="sider" width="200">
                    <a-menu class="menu" v-model:selectedKeys="menu" mode="inline">
                        <a-menu-item v-for="item in menuList" :key="item.name" @click="to(item.path)">
                            {{ item.meta.name }}
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout class="content-box">
                    <a-layout-content class="content">
                        <router-view />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </template>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import routes from '../router';

const wujie = ref(window.__POWERED_BY_WUJIE__)
const router = useRouter()
const menuList = routes[1].children.filter(item => item.name ? true : false)
let menu = ref([menuList[0].name]);

const to = (url) => router.push(url)

onMounted(() => window.$wujie?.bus.$on('route', (res) => router.push(res)))
</script>

<style lang="less">
.layout {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .sider {
        background-color: #fff;

        .menu {
            height: 100%;
            border-right: 0;
        }
    }

    .content-box {
        padding: 12px;

        .content {
            overflow-y: auto;
        }
    }
}
</style>