<!--
  商品清单页面
-->
<template>
  <div class="product_list_page">
    <div class="title">商品清单</div>
    <ul class="list">
      <li v-for="(item, index) in product" :key="index" >
        <ProductItem :data="item.product" :isVuex="'save'" readonly :num="item.num"></ProductItem>
      </li>
    </ul>

    <div class="fix_bottom">
      <button class="to_change_btn" @click.stop="editCart">修改购物清单</button>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
import { mapGetters } from 'vuex'
import config from '../common/config'
export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapGetters({
      product: 'cart/cart'
    })
  },
  methods: {
    editCart () {
      localStorage.sToast = 1
      this.$router.push(`${config.rout}/home`)
    }
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
