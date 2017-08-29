<template>
  <div class="product_detail">
    <swiper v-if="productDetail" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(img, index) in productDetail.product.imgs" :key="index">
        <div class="slide_img">
          <img :src="img" alt="">
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>

    <div class="body" v-if="productDetail">
      <div class="head">
        <div class="left">
          <div class="name">{{productDetail.product_name}}</div>
          <div class="price">￥{{productDetail.price}}</div>
        </div>
        <div class="right">
        <span
            class="no_add_to_cart"
            v-if="getProductNumInCart(productDetail) <= 0 && productDetail.inventory ==='0'"
          >库存不足</span>
          <button
            class="add_to_cart"
            @click="addToCart(productDetail)"
            v-if="getProductNumInCart(productDetail) <= 0 && productDetail.inventory !=='0'"
          >加入购物车</button>

          <div class="count_group" v-else>
            <span
              class="reduce"
              @click.stop="reduceToCart(productDetail)"
              v-if="getProductNumInCart(productDetail) > 0"
            ></span>
            <span
              class="number"
              v-if="getProductNumInCart(productDetail) > 0"
            >{{getProductNumInCart(productDetail)}}</span>
            <span
              class="plus"
              @click.stop="addToCart(productDetail)"
              v-if="getProductNumInCart(productDetail) < productDetail.inventory"
            ></span>
          </div>
        </div>
      </div>

      <div class="detail">
        <div class="name">{{productDetail.product_name}}</div>
        <div class="bewrite">
          {{productDetail.product.intro}}
        </div>
      </div>
    </div>
    <div class="cart_mask" v-show="isMask" @touchmove.prevent></div>
    <cart></cart>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../common/api'
import Cart from '../components/Cart'

export default {
  components: {
    swiper,
    swiperSlide,
    Cart
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart'
    })
  },
  data () {
    return {
      notNextTick: true,
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        scrollbar: '.swiper-scrollbar'
      },
      productDetail: undefined,
      isMask: false
    }
  },
  created () {
    axios.get(`${api.productDetail}/${this.$route.params.id}`)
      .then((data) => {
        this.productDetail = data
      })
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/add',
      reduceToCart: 'cart/reduce'
    }),
    getProductNumInCart (product) {
      const result = this.cart.find(item => product.id === item.product.id)

      if (result) {
        return result.num
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
.product_detail {
  .slide_img {
    height: 160px;
    background-color: #ddd;
    position: relative;
    img {
      position: absolute;
      width: auto;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .cart_mask{
    position: fixed;
    top:0;
    bottom:0;
    right: 0;
    z-index: 1;
    left: 0;background: rgba(0,0,0,0.5);
  }
  .body {
    .head {
      border-bottom: solid 1px #dcdcdc;
      padding: 10px;
      font-size: 0;
      .left, .right {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
      }
      .left {
        width: 60%;
        font-size: 16px;
        color: #666;
        .name {
          margin-bottom: 10px;
          font-size: 16px;
          color:#666;
        }
        .price {
          font-size: 14px;
          color:#666;
        }
      }
      .right {
        width: 40%;
        text-align: right;
        .add_to_cart {
          border: none;
          background-color: #23beae;
          color: #fff;
          padding: 7px 10px;
          border-radius: 4px;
        }
        .count_group {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .reduce, .plus {
            box-sizing: border-box;
            width: 25px;
            height: 25px;
          // border: solid 1px #919191;
            border-radius: 50%;
            background-color: transparent;
            outline: none;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: #919191;
          // font-size: 20px;
            background: url(../assets/img/reduce.png) no-repeat center center;
            background-size:25px;
          }
          .plus {
          // background-color: #23beae;
          // border-color: #23beae;
          // color: #fff;
            background: url(../assets/img/plus.png) no-repeat center center;
            background-size:25px;
          }
          .number {
            width: 20px;
            text-align: center;
            color: #666;
          }
        }
      }
    }

    .detail {
      padding: 10px 10px 50px 10px;
      .name {
        color: #999;
        font-size: 14px;
      }
      .price {
        font-size: 14px;
        color:#666;
      }
      .bewrite {
        color: #666;
        margin-top: 10px;
        line-height: 23px;
        font-size: 14px;
      }
    }
  }
}

</style>
