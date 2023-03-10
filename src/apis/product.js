import axios from '../axios/axios'

export const upOrDownGoods = (params, message = false) => axios({
    url: `/hfb-commodity/shop/commodity/set/sale/status`,
    method: 'post',
    params,
    message
})

export const setGoodsSotck = (data, message = false) => axios({
    url: `/hfb-commodity/shop/commodity/set/sotck`,
    method: 'post',
    data,
    message
})

export const getGoodsList = (params) => axios({
    url: `/hfb-commodity/shop/commodity/list`,
    method: 'get',
    params,
})

export const getGoodsDetail = (merchantShopCommodityId) => axios({
    url: `/hfb-commodity/shop/commodity/detail`,
    method: 'get',
    params: { merchantShopCommodityId },
})