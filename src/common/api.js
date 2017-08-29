const host = {
  production: 'http://www.hotelets.com/api/api',
  test: 'http://www.lianwuyun.cn/api/api',
  development: 'http://54.223.21.52/api/api',
  qiniu: 'http://7xo285.com1.z0.glb.clouddn.com/'
}

let realhost

let path = window.location.hostname
if (path.indexOf('hotelets.com') >= 0) {
  realhost = host.production
} else {
  realhost = host.test
}

if (process.env.NODE_ENV === 'development') {
  realhost = host.test
}

export default {
  products: realhost + '/CMS/CmsStore/storeCmss',
  hotelDetail: realhost + '/CMS/CmsStore/sendTime',
  productDetail: realhost + '/CMS/CmsStore/storeCmsInfo',
  productOrders: realhost + '/CMS/CmsStore/addStoreCmsOrder',
  orderInfo: realhost + '/CMS/CmsStore/storeCmsOrderInfo',
  orderList: realhost + '/CMS/CmsStore/storeCmsOrders'
}
