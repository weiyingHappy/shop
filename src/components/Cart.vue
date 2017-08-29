<template>
  <div class="shopping_cart" @touchmove.stop>
    <div class="bar" @click="dealToast">
      <div class="count">
        <i class="iconfont icon-cart"></i>
        <div class="number" v-if="cartCount > 0">{{cartCount}}</div>
      </div>
      <div class="price">
        <span v-if="cartCount === 0">暂无商品</span>
        <span v-else>￥{{cartPrice}}</span>
      </div>
      <div class="settlement">
        <button
          @click.stop="$router.push(`${rout}/order_generate`)"
          :disabled="cartCount===0"
        >去结算</button>
      </div>
    </div>

    <div class="toast" v-if="showToast" >
      <div class="head">
        <div class="count">
          <div class="cart">
            <i class="iconfont icon-cart"></i>
            <div class="number" v-if="cartCount > 0">{{cartCount}}</div>
          </div>
        </div>
        <div class="clear">
          <span @click="clearCart">清空购物车</span>
        </div>
      </div>

      <div class="body">
        <ProductItem v-for="(item, index) in cart" :key="index" :data="item.product"></ProductItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductItem from './ProductItem'
import config from '../common/config'

export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      cartCount: 'cart/cartCount',
      cartPrice: 'cart/Price'
    })
  },
  data () {
    return {
      showToast: false,
      rout: config.rout,
      cartShow: true
    }
  },
  mounted () {
    let s = localStorage.sToast ? localStorage.sToast : ''
    if (s) {
      this.showToast = true
      this.$parent.isMask = true
    }
  },
  methods: {
    ...mapActions({
      clearCart: 'cart/clearCart'
    }),
    dealToast () {
      if (localStorage.sToast) {
        localStorage.removeItem('sToast')
      }
      if (this.cartShow) {
        localStorage.isMask = 1
      } else {
        localStorage.isMask = 0
      }
      this.showToast = !this.showToast
      this.$parent.isMask = this.showToast
      this.cartShow = !this.cartShow
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping_cart {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 0;
  z-index: 10;
  .bar {
    background-color: #f4f4f4;
    z-index: 2;
    bottom: 0;
    position: relative;
    .count, .price, .settlement {
      display: inline-block;
      font-size: 14px;
      vertical-align: middle;
    }
    .count {
      width: 15%;
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      .iconfont {
        font-size: 25px;
        color: #23beae;
      }
      .number {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background-color: #ff0000;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }
    .price {
      width: 55%;
      font-size: 18px;
      color: #23beae;
    }
    .settlement {
      width: 30%;
      button {
        width: 100%;
        height: 50px;
        border: none;
        color: #fff;
        font-size: 18px;
        background-color: #fe9f07;
        &:disabled {
          background-color: #ddd;
        }
      }
    }
  }

  .toast {
    height: 100vw;
    background-color: #fff;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 50px;
    z-index: 1;
    border-radius: 4px 4px 0 0;
    border-top: solid 1px #ddd;
    .head {
      font-size: 0;
      padding: 0 10px;
      height: 10%;
      .count, .clear {
        display: inline-block;
        width: 50%;
        font-size: 14px;
        vertical-align: middle;
      }

      .count {
        .cart {
          height: 40px;
          width: 40px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            font-size: 30px;
            color: #23beae;
          }
          .number {
            position: absolute;
            top: -10px;
            right: -10px;
            height: 20px;
            width: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ff0000;
            border-radius: 50%;
            color: #fff;
          }
        }
      }

      .clear {
        text-align: right;
        color: #919191;
        font-size: 12px;
      }
    }
    .body {
      height: 90%;
      overflow: scroll;
    }
  }
}
</style>
