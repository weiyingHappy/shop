<template>
  <div class="order_item">
    <div class="head">
      <div class="left">
        <i class="iconfont icon-gouwukuang"></i>
        <span class="hotel_name">{{hotelName}}</span>
      </div>
      <div class="right">
        {{state}}
      </div>
    </div>
    <div class="division"></div>
    <div class="product_info">
      <span class="names">{{title}}等</span>
      <span class="count">共{{num}} 件商品</span>
    </div>
    <div class="bottom">
      <div class="info">
        <div class="line">
          <div class="label">金额:</div>
          <div class="value">{{order.product_price}}</div>
        </div>
        <div class="line">
          <div class="label">下单时间:</div>
          <div class="value">{{order.create_time}}</div>
        </div>
      </div>
      <div class="active_btn">
        <button @click.stop="lookOrderDetail">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../common/config'
export default {
  props: {
    order: {
      type: Object
    }
  },
  data () {
    return {
      state: '已支付',
      total: 0,
      hotelName: '',
      num: 0,
      title: '等'
    }
  },
  created () {
   /**
    * this.state = this.order.state === '0' ? '未支付' : ('1' ? '已支付' : ( '2' ? '已确认' : ( '10' ? '已完成' : ( '11' ? '已取消' : '其他'))))
    * */
    if (this.order.state === '0') {
      this.state = '未支付'
    }
    if (this.order.state === '1') {
      this.state = '已支付'
    }
    if (this.order.state === '2') {
      this.state = '已确认'
    }
    if (this.order.state === '10') {
      this.state = '已完成'
    }
    if (this.order.state === '11') {
      this.state = '已取消'
    }
    this.productTotal()
    this.productTitle()
    this.hotelName = localStorage.getItem('hotelName')
  },
  methods: {
    productTotal () {
      let count = 0
      let num = 0
      this.order.product_snapshot.forEach((item) => {
        count += item.total
        num += item.num
      })
      this.total = count
      this.num = num
    },
    productTitle () {
      if (this.order.product_snapshot.length > 0) {
        this.title = this.order.product_snapshot[0].product_name
      }
    },
    lookOrderDetail () {
      let order = this.order
      this.$router.push(`${config.rout}/order/${order.order_no}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.order_item {
  border: solid 1px #dcdcdc;
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 10px;
  .head {
    font-size: 0;
    padding: 5px;
    .left, .right{
      display: inline-block;
      font-size: 14px;
    }
    .left {
      width: 70%;
      .iconfont {
        font-size: 20px;
        color: #23beae;
      }
      .hotel_name {
        font-size: 15px;
        color: #333;
      }
    }
    .right {
      width: 30%;
      text-align: right;
      font-size: 12px;
      color: #616161;
    }
  }
  .division {
    border-bottom: solid 1px #dcdcdc;
    margin: 0 10px;
  }

  .product_info {
    margin-top: 10px;
    color: #666666;
    font-size: 14px;
    .names {
      margin-right: 10px;
    }
  }

  .bottom {
    font-size: 0;
    .info, .active_btn{
      display: inline-block;
      font-size: 14px;
    }
    .info {
      width: 50%;
      color: #666;
      .line {
        margin-top: 10px;
        .label, .value {
          display: inline-block;
        }
        .label {
          width: 50%;
        }
      }
    }
    .active_btn {
      width: 50%;
      text-align: right;
      button {
        border: solid 1px #23beae;
        background-color: transparent;
        padding: 5px 10px;
        border-radius: 4px;
        margin-top: 10px;
        color: #616161;
      }
    }
  }
}
</style>
