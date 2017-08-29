<!--
  商品项组件
  props说明：
    readonly: 是否只读，bool值，为true将只显示价格和数量，不可编辑
-->
<template>
  <div class="product_item">
    <div class="cover">
      <div class="image">
        <img :src="detail.product_img" alt="">
      </div>
    </div>

    <div class="info">
      <div class="name">{{detail.product_name}}</div>
      <div class="bottom" >
        <div class="price">￥{{detail.price}}*{{detail.num}}</div>
        <div class="count_group">
          ￥{{detail.price*detail.num}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    detail: {
      type: Object
    }
  },
  computed: {
    coverImg () {
      if (this.data.product.imgs.length > 0) {
        return `${this.data.product.imgs[0]}?imageView2/1/w/250/h/250`
      }
      // 七牛空图片地址
      return 'http://oi9d1dmyt.bkt.clouddn.com/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.jpg'
    }
  },
  methods: {
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
.product_item {
  box-sizing: border-box;
  padding: 10px;
  font-size: 0;
  border-bottom: solid 1px #dcdcdc;
  &:last-child {
    border-bottom: none;
  }
  .cover, .info {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }
  .cover {
    width: 25%;
    .image {
      padding-top: 100%;
      background-color: #ddd;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        width: 100%;
        height:100%;
      }
    }
  }
  .info {
    width: 75%;
    box-sizing: border-box;
    padding-left: 10px;
    height: 100%;
    .name {
      color: #666;
      margin-bottom: 10vw;
    }
    .bottom {
      color: #666;
      display: flex;
      justify-content:space-between;
      align-items: center;
    }
  }
}
.count_group {
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .reduce, .plus {
    width: 20px;
    height: 20px;
    border: solid 1px #919191;
    border-radius: 50%;
    background-color: transparent;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #919191;
    font-size: 20px;
  }
  .plus {
    background-color: #23beae;
    border-color: #23beae;
    color: #fff;
  }
  .number {
    width: 20px;
    text-align: center;
    color: #666;
  }
}
</style>
