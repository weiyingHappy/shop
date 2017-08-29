<template>
  <div class="order_list_page">
    <ul class="list">
      <li v-for="(item, index) in orderList" :key="index">
        <OrderItem :order="item"></OrderItem>
      </li>
       <div class="loadmore" v-show="productsPage.nowPage != productsPage.totalPage">
        <span v-inview:enter="inview" v-if="productsPage.nowPage < productsPage.totalPage">
          加载更多中....
        </span>
        <span v-else>
          没有数据了
        </span>
      </div>
      <div class="loadmore" v-show="productsPage.nowPage == productsPage.totalPage">
        <span v-inview:enter="inview" v-if="productsPage.nowPage < productsPage.totalPage">
          加载更多中....
        </span>
        <span v-else>
          没有数据了
        </span>
      </div>
    </ul>
  </div>
</template>

<script>
import OrderItem from '../components/OrderItem'
import api from '../common/api'

export default {
  components: {
    OrderItem
  },
  data () {
    return {
      orderList: [],
      productsPage: {
        nowPage: 0,
        totalPage: 1
      }
    }
  },
  methods: {
    inview () {
      this.loadData(this.productsPage.nowPage + 1)
    },
    loadData (page = 1, query) {
      // 如果是第一页，进行重置
      if (page === 1) {
        this.products = []
      }

      let teamId = localStorage.teamId

      axios.post(api.orderList, {
        page: page,
        team_id: teamId
      }).then((data) => {
        console.log(data)
        this.orderList = this.orderList.concat(data.lists)
        this.productsPage.nowPage = data.nowPage
        this.productsPage.totalPage = data.totalPage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_list_page {
  padding: 10px;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
     .loadmore {
        margin-top: 10px;
        text-align: center;
        color: #777;
        font-size: 14px;
      }
  }
}
</style>
