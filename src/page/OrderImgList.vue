<!--
  商品清单页面
-->
<template>
  <div class="product_list_page">
    <div class="title">商品清单</div>
    <ul class="list">
      <li v-for="(item, index) in orderInfo" :key="index">
        <OrderImgItem :detail="item"></OrderImgItem>
      </li>
    </ul>

  </div>
</template>

<script>
import OrderImgItem from '../components/OrderImgItem'
import api from '../common/api'
export default {
  components: {
    OrderImgItem
  },
  data () {
    return {
      orderInfo: []
    }
  },
  created () {
    let orderNo = this.$route.params.id
    axios.get(`${api.orderInfo}/${orderNo}`)
      .then((data) => {
        console.log(data)
        this.orderInfo = data.product_snapshot
      })
  }
}
</script>

<style lang="scss" scoped>
.product_list_page {
  .title {
    padding: 15px 0;
    background-color: #f4f4f4;
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-bottom: 50px;
  }

  .to_change_btn {
    width: 100%;
    padding: 15px 0;
    border: none;
    background-color: #f4f4f4;
    color: #666;
    outline: none;
  }
}
</style>
