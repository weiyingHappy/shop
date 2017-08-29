<template>
  <div class="detail_page">
    <div class="title">订单状态</div>
    <div class="order_state">
      <div class="state">{{state}}</div>
      <!-- <div class="more">
        更多
        <i class="iconfont icon-you"></i>
      </div> -->
    </div>
    <div class="cancel_info" v-if="orderInfo.state === '0'"><span>30分钟自动取消订单</span></div>
    <div class="panel">
      <div class="p_title">
        商品信息
      </div>
      <div class="body">
        <div class="product_panel">
          <div class="images" @click="productList">
            <div class="img_item" v-for ="(img,index) in imgs" :key ="index" v-if="index <= 3 ">
              <div class="wrap">
                <img :src="img" alt="">
              </div>
            </div>
            <div class="img_item" v-if="moreImg">
              <div class="wrap" >
                <img src="../assets/img/blank.png" alt="">
              </div>
            </div>
          </div>
          <div class="text">
            <div class="name">{{title}}等</div>
            <div class="count">共{{num}}件商品</div>
            <div class="nav_control">
              <i class="iconfont icon-you"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="price_panel">
          <div class="line product_price">
            <div class="label">商品金额</div>
            <div class="value">{{total}}</div>
          </div>
          <div class="line pay_price">
            <div class="label">订单金额</div>
            <div class="value">{{total}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="p_title">配送信息</div>
      <div class="body m-padding">
        <div class="form_line">
          <div class="label">房间号:</div>
          <div class="value">{{orderInfo.room_no}}</div>
        </div>
        <div class="form_line">
          <div class="label">入住人:</div>
          <div class="value">{{orderInfo.user_name}}</div>
        </div>
        <div class="form_line">
          <div class="label">联系电话:</div>
          <div class="value">{{orderInfo.phone}}</div>
        </div>
        <div class="form_line">
          <div class="label">备注:</div>
          <div class="value">{{orderInfo.note}}</div>
        </div>
      </div>
    </div>

    <div class="panel order_info">
      <div class="p_title">订单信息</div>
      <div class="body m-padding">
        <div class="form_line">
          <div class="label">订单编号:</div>
          <div class="value">{{orderInfo.order_no}}</div>
        </div>
        <div class="form_line">
          <div class="label">下单时间:</div>
          <div class="value">{{orderInfo.create_time}}</div>
        </div>
        <div class="form_line">
          <div class="label">订单金额:</div>
          <div class="value">{{orderInfo.product_price}}</div>
        </div>
      </div>
    </div>

    <div class="fix_bottom">
      <div class="buy">
        <button v-if="this.orderInfo.state === '0'" @click.stop="buyNow">立即支付</button>
        <button v-else @click.stop="backIndex">再次购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import api from '../common/api'
import config from '../common/config'

export default {
  data () {
    return {
      orderInfo: [],
      imgs: [],
      total: 0,
      payUrl: '',
      state: '未支付',
      title: '等',
      num: 0,
      moreImg: false
    }
  },
  created () {
    let orderNo = this.$route.params.id
    axios.get(`${api.orderInfo}/${orderNo}`)
      .then((data) => {
        console.log(data)
        this.orderInfo = data
        this.productTitle()
        console.log(this.orderInfo.order_no)
        this.productTotal()
        this.getImgs()
        this.dealState()
        console.log(this.imgs)
      })

    // 这是支付的连接，判断支付后就立即跳转
    const payUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.pay_appid}&redirect_uri=${config.ru}${orderNo}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    this.payUrl = payUrl
    console.log(payUrl)
  },
  methods: {
    productTotal () {
      let count = 0
      let num = 0
      this.orderInfo.product_snapshot.forEach((item) => {
        count += item.total
        num += item.num
      })
      this.total = count.toFixed(2)
      this.num = num
    },
    getImgs () {
      this.imgs = this.orderInfo.product_snapshot.map(item => item.product_img)
      if (this.imgs.length > 4) {
        this.moreImg = true
      }
    },
    buyNow () {
      this.clearCart()
      location.href = this.payUrl
    },
    backIndex () {
      this.$router.push(`${config.rout}/`)
    },
    ...mapActions({
      clearCart: 'cart/clearCart'
    }),
    productTitle () {
      if (this.orderInfo.product_snapshot.length > 0) {
        this.title = this.orderInfo.product_snapshot[0].product_name
      }
    },
    dealState () {
      if (this.orderInfo.state === '0') {
        this.state = '未支付'
      }
      if (this.orderInfo.state === '1') {
        this.state = '已支付'
      }
      if (this.orderInfo.state === '2') {
        this.state = '已确认'
      }
      if (this.orderInfo.state === '10') {
        this.state = '已完成'
      }
      if (this.orderInfo.state === '11') {
        this.state = '已取消'
      }
    },
    productList () {
      let infos = this.orderInfo
      this.$router.push(`${config.rout}/order_img_list/${infos.order_no}`)
    }
  }
}

</script>

<style lang="scss" scoped>
.detail_page {
  background-color: #f4f4f4;

  .title {
    box-sizing: border-box;
    padding: 10px;
    border-bottom: solid 1px #dcdcdc;
    font-size: 14px;
    color: #333;
    background-color: #fff;
  }
  .cancel_info {
    padding-left:10px;padding-top:10px;font-size:12px;color:#666;
  }
  .order_state {
    color: #666;
    padding: 10px;
    font-size: 0;
    background-color: #fff;
    .state, .more {
      width: 50%;
      font-size: 12px;
      display: inline-block;
    }
    .more {
      text-align: right;
      color: #bababa;
    }
  }

  .panel {
    margin-top: 10px;
    background-color: #fff;
    &.order_info{
      padding-bottom: 50px;
      }
    .p_title {
      color: #333;
      font-size: 15px;
      padding: 10px;
      border-bottom: solid 1px #dcdcdc;
    }
    .body {
      border-bottom: solid 1px #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .product_panel {
    padding: 10px;
    background-color: #fff;
    .images {
      font-size: 0;
      .img_item {
        display: inline-block;
        width: 20%;
        box-sizing: border-box;
        .wrap {
          padding-top: 100%;
          position: relative;
        }
        img {
          position: absolute;
          top: 0;
          width: 90%;
          height: 90%;
        }
      }
    }
    .text {
      font-size: 0;
      .name, .count, .nav_control {
        display: inline-block;
        font-size: 14px;
      }
      .name {
        color: #919191;
      }
      .count {
        color: #666;
      }
      .name {
        width: 30%;
      }
      .count {
        width: 30%;
      }
      .nav_control {
        width: 40%;
        text-align: right;
        color: #bababa;
      }
    }
  }

  .price_panel {
    padding: 10px;
    background-color: #fff;
    .line {
      font-size: 0;
      &.product_price {
        >div{
          font-size: 12px;
        }
        color: #919191;
        margin-bottom: 10px;
      }
      &.pay_price {
        >div{
          font-size: 16px;
        }
        color: #333;
      }
      .label, .value {
        display: inline-block;
        width: 50%;
        font-size: 14px;
      }
      .value {
        text-align: right;
      }
    }
  }

  .form_line {
    font-size: 0;
    color: #666;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .label, .value {
      font-size: 14px;
      display: inline-block;
    }
    .label {
      width: 25%;
    }
    .value {
      width: 75%;
    }
  }

  .m-padding {
    padding: 10px;
  }

  .buy {
    button {
      width: 100%;
      height: 50px;
      background-color: #23beae;
      border: none;
      color: #fff;
    }
  }
}
</style>
