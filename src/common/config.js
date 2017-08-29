let result = {}

let path = window.location.hostname
if (path.indexOf('hotelets.com') >= 0) {
  // 正式环境
  result = {
    pay_appid: 'wxe163c2e7ba565707',
    ru: 'http://www.hotelets.com/cmsfont/uniPay/',
    inedxRu: 'http://www.hotelets.com/cmsfont/entrance/',
    rout: ''
  }
} else {
  // 测试环境
  result = {
    pay_appid: 'wxa23dba92f8ff815f',
    ru: 'http://www.lianwuyun.cn/cmsfont/uniPay/',
    indexRu: 'http://www.lianwuyun.cn/cmsfont/entrance/',
    rout: ''
  }
}

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  result = {
    pay_appid: 'wxa23dba92f8ff815f',
    ru: 'http://www.lianwuyun.cn/cmsfont/uniPay/',
    indexRu: 'http://www.lianwuyun.cn/cmsfont/entrance/',
    rout: ''
    /*
    *
    pay_appid: 'wxe163c2e7ba565707',
    ru: 'http://54.223.21.52/cmsfont/uniPay/'
    *
    */
  }
}

export default result
