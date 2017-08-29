<!--
  订单信息填写
-->
<template>
  <div class="order_generate">
    <div class="product_panel" @click="productList">
      <div class="images">
        <div class="img_item" v-for="(img, index) in coverImg" :key="index" v-if="index <=3 ">
          <div class="wrap">
            <img :src="img" alt="">
          </div>
        </div>
        <div class="img_item" v-if="imgNum">
              <div class="wrap" >
                <img src="../assets/img/blank.png" alt="">
              </div>
            </div>
      </div>
      <div class="text">
        <div class="name">{{productName}}等</div>
        <div class="count">共{{count}}件商品</div>
        <div class="nav_control" >
          <i class="iconfont icon-you"></i>
        </div>
      </div>
    </div>

    <div class="price_panel">
      <div class="line product_price">
        <div class="label">商品金额</div>
        <div class="value">￥{{price}}</div>
      </div>
      <div class="line pay_price">
        <div class="label">实付</div>
        <div class="value">￥{{price}}</div>
      </div>
    </div>

    <div class="order_input_panel">
      <div class="line">
        <div class="label">房间号:</div>
        <!-- <div class="input" v-if="localRoomNum">{{localRoomNum}}</div> -->
        <div class="input" >
          <input type="text" v-model="roomNum" :placeholder="localRoomNum">
        </div>
      </div>
      <div class="line">
        <div class="label">入住人:</div>
        <div class="input">
          <input type="text" placeholder="请输入入住人" v-model="orderInfo.user_name">
          <span>(选填)</span>
        </div>
      </div>
      <div class="line">
        <div class="label">联系电话:</div>
        <div class="input">
          <input type="text" placeholder="请输入联系电话" v-model="orderInfo.phone">
          <span>(选填)</span>
        </div>
      </div>
      <div class="line">
        <div class="label">备注:</div>
        <div class="input">
          <input type="text" placeholder="请输入备注" v-model="orderInfo.note">
          <span>(选填)</span>
        </div>
      </div>
    </div>

    <div class="integral_panel">
      <!-- <div class="will_get">
        <span class="title">获得积分</span>
        <span class="value">168</span>
      </div> -->
      <div class="notify">
        <div class="title">温馨提示：</div>
        <p>
          1、订单将在15分钟内送达。
        </p>
        <p>
          2、由于商品特殊性，除商品质量问题，不可退款。
        </p>
      </div>
    </div>

    <div class="fix_bottom">
      <div class="submit_order">
        <div class="price">
          订单金额：￥{{price}}
        </div>
        <div class="submit_btn">
          <button @click.stop="submitOders">提交订单</button>
        </div>
      </div>
    </div>
      <div class="alertToast" v-show="alertToast">
      <p><span>请填写房间号</span></p>
      </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../common/api'
import config from '../common/config'
export default {
  data () {
    return {
      alertToast: false,
      roomNum: localStorage.roomNum !== undefined ? localStorage.roomNum : '',
      orderInfo: {
        user_name: '',
        phone: '',
        note: '',
        room_no: localStorage.roomNum || '',
        team_id: localStorage.teamId || ''

      },
      moreImg: false
    }
  },
  watch: {
    roomNum: function (val, old) {
      if (isNaN(Number(val))) {
        this.roomNum = this.orderInfo.room_no
      } else {
        this.roomNum = this.roomNum.replace(/(^\s*)|(\s*$)/g, '')
      }
    }
  },
  computed: {
    ...mapGetters({
      coverImg: 'cart/images',
      count: 'cart/cartCount',
      productName: 'cart/firstProductName',
      price: 'cart/Price',
      product: 'cart/productInf'
    }),
    localRoomNum () {
      return localStorage.roomNum !== undefined ? localStorage.roomNum : ''
    },
    imgNum () {
      if (this.coverImg.length > 4) {
        this.moreImg = true
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    productList () {
      this.$router.push(`${config.rout}/product_list`)
    },
    submitOders () {
      let self = this
      this.orderInfo.products = this.product
      console.log(this.orderInfo)
      if (Number(this.roomNum) === 0) {
        this.alertToast = true
        setTimeout(function () {
          self.alertToast = false
        }, 2000)
        return
        /**
         * this.roomNum = this.localRoomNum
         */
      }
      this.alertToast = false
      this.orderInfo.room_no = this.roomNum
      console.log(this.orderInfo.room_no)
      /**
       * localStorage.roomNum = this.roomNum
       */
      let { user_name, phone, note, room_no, team_id, products } = this.orderInfo
      axios.post(api.productOrders, {
        user_name: user_name,
        phone: phone,
        note: note,
        room_no: room_no,
        team_id: team_id,
        products: products
      }).then((data) => {
        console.log(data)
        this.$router.push(`${config.rout}/order/${data.order_no}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_generate {

  background-color: #f4f4f4;
  .alertToast{
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    p{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
     span {
       background: rgba(0,0,0,0.6);color:#fff;padding:4px 6px;font-size:14px;border-radius: 4px;
       }
    }
  }
  .product_panel {
    padding: 10px;
    border-bottom: solid 1px #dcdcdc;
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
      }
    }
  }

  .price_panel {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 20px;
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

  .order_input_panel {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
    .line {
      font-size: 0;
      margin-bottom: 20px;
      color: #666;
      .label, .input {
        font-size: 14px;
        display: inline-block;
      }
      .label {
        width: 25%;
      }
      .input {
        width: 75%;
        input {
          border: solid 1px #ddd;
          padding: 8px;
          border-radius: 4px;
          outline: none;
          width: 50%;
        }
      }
    }
  }

  .integral_panel {
    background-color: #fff;
    padding: 10px 10px 50px 10px;
    color: #666;
    .will_get {
      margin-bottom: 10px;
      .title {
        margin-right: 20px;
      }
    }
    .notify {
      .title {
        color: #23beae;
        margin-bottom: 10px;
      }
      p {
        margin: 5px 0;
      }
    }
  }

  .submit_order {
    background-color: #f4f4f4;
    font-size: 0;
    .price, .submit_btn {
      font-size: 14px;
      display: inline-block;
    }
    .price {
      width: 70%;
      color: #23beae;
      font-size: 18px;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .submit_btn {
      width: 30%;
      button {
        width: 100%;
        height: 50px;
        border: none;
        background-color: #fe9f07;
        color: #fff;
      }
    }
  }
}
</style>
