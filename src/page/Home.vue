<template>
  <div class="home_page">
    <div class="head" v-if="hotelDetail">
      <div class="info">
        <div class="hotel_name">{{hotelDetail.name}}</div>
        <div class="title">店内消费品商城</div>
        <div class="datetime">{{hotelDetail.store_start}}-{{hotelDetail.store_end}}可免费配送</div>
      </div>
      <div class="to_hotel">
        <p><button class="navto" @click.stop="toHotelIndex">进入酒店主页</button></p>
        <p><span class="myorder" @click="toMyOrder">我的订单</span></p>
      </div>
      <div class="bg">
        <div class="mask"></div>
        <img src="http://oi9d1dmyt.bkt.clouddn.com/bg.png" alt="">
      </div>
    </div>
    <div class="search">
      <form action="" @submit.prevent="search">
        <div class="input">
          <i class="iconfont icon-search"></i>
          <input type="search" placeholder="搜索店内商品" v-model="query">
        </div>
      </form>
    </div>
    <div class="products">
      <div v-for="(item, index) in products":key="index">
        <div @click="toProductInfo(item.id)" v-if="item.inventory >= 1">
          <ProductItem :data="item" ></ProductItem>
        </div>
      </div>

      <div class="loadmore" v-if="productsPage.nowPage < productsPage.totalPage">
        <span v-inview:enter="inview" v-if="productsPage.nowPage < productsPage.totalPage">
          加载更多中....
        </span>
        <span v-else>
          没有数据了
        </span>
      </div>
      <div class="loadmore" v-if="productsPage.nowPage === productsPage.totalPage">
        <span v-inview:enter="inview" v-if="productsPage.nowPage < productsPage.totalPage">
          加载更多中....
        </span>
        <span v-else>
          没有数据了
        </span>
      </div>
    </div>
    <div class="cart_mask" v-show="isMask" @touchmove.prevent></div>
    <Cart></Cart>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
import Cart from '../components/Cart'
import api from '../common/api'
import config from '../common/config'

let fetchFlag = false

export default {
  components: {
    ProductItem,
    Cart
  },
  data () {
    return {
      products: [],
      productsPage: {
        nowPage: 0,
        totalPage: 1
      },
      query: '',
      hotelDetail: undefined,
      isMask: false
    }
  },
  created () {
    let teamId = localStorage.teamId
    axios.get(`${api.hotelDetail}/${teamId}`)
      .then((data) => {
        this.hotelDetail = data
        localStorage.hotelToken = this.hotelDetail.token
        localStorage.hotelName = this.hotelDetail.name

        document.title = data.name
      })
  },
  watch: {
    query: function (val, old) {
      if (val !== old) {
        this.search()
      }
    }
  },
  methods: {
    inview () {
      this.loadData(this.productsPage.nowPage + 1, this.query)
    },
    loadData (page = 1, query) {
      // 如果是第一页，进行重置
      if (fetchFlag) {
        return
      }
      fetchFlag = true

      if (page === 1) {
        this.products = []
      }
      let teamId = localStorage.teamId

      axios.post(api.products, {
        page,
        team_id: teamId,
        name: query
      }).then((data) => {
        this.products = this.products.concat(data.lists)
        this.productsPage.nowPage = data.nowPage
        this.productsPage.totalPage = data.totalPage
        fetchFlag = false
      })
      console.log(this.products)
    },
    search () {
      console.log('search')
      this.loadData(1, this.query)
    },
    toProductInfo (id) {
      this.$router.push(`${config.rout}/product/${id}`)
    },
    toMyOrder () {
      this.$router.push(`${config.rout}/order_list`)
    },
    toHotelIndex () {
      let token = this.hotelDetail.token
    /**
     * location.href = `${config.indexRu}${token}/1`
     */
      location.href = `/cmsfont/entrance/${token}/1/`
    }
  }
}
</script>

<style lang="scss" scoped>
  .home_page {
    .cart_mask{
      position: fixed;
      top:0;
      bottom:0;
      right: 0;
      left: 0;background: rgba(0,0,0,0.5);
    }
    .head {
      font-size: 0;
      position: relative;
      box-sizing: border-box;
      padding: 16px 10px 50px 10px;
      .info, .to_hotel {
        display: inline-block;
        font-size: 14px;
        vertical-align: top;
        position: relative;
        z-index: 2;
      }
      .info {
        width: 65%;
        .hotel_name {
          font-size: 16px;
          color: #23beae;
          margin-bottom: 10px;
        }
        .title {
          color: #fff;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .datetime {
          color: #fff;
          font-size: 12px;
        }
      }
      .to_hotel {
        width: 35%;
        text-align: right;
        p{margin:0;padding:0;}
        .navto {
          color: #fff;
          border: none;
          border-radius: 4px;
          background-color: #23beae;
          padding: 5px 10px;
          margin-bottom:8px;
          font-size: 13px;
        }
        .myorder{color:#fff; font-size: 13px;}
      }
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .4);
        }
      }
    }

    .search {
      background-color: #fff;
      padding: 5px 10px;
      box-sizing: border-box;
      .input {
        background-color: #f3f3f3;
        padding: 5px 5px 5px 30px;
        position: relative;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        .iconfont {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          top: 50%;
          margin-top: -10px;
          left: 5px;
          color: #23beae;
        }
        input {
          background-color: #f3f3f3;
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          padding: 0;
        }
      }
    }

    .products {
      padding-bottom: 60px;
      .loadmore {
        margin-top: 10px;
        text-align: center;
        color: #777;
        font-size: 14px;
      }
    }
  }
</style>
