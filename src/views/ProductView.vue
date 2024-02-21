<template>
  <div class="w-100">
    <h1>這裡是商品頁面</h1>
    <hr>
    <table class="table align-middle">
    <thead>
      <th>圖片</th>
      <th>產品名稱</th>
      <th>價格</th>
      <th>產品細節</th>
      <th>加入購物車</th>
    </thead>
    <tbody v-for="product in productList" :key="product.id">
      <td><img :src="product.imageUrl" alt="" height="200" width="200" class="object-fit"></td>
      <td>{{ product.title }}</td>
      <td>{{ product.price }}</td>
      <td>
        <button class="btn btn-secondary" type="button" @click="getProductInfo(product.id,product)">
          查看產品細節
        </button>
      </td>
      <td><button class="btn btn-danger" type="button" @click="addCart(product.id)">加入購物車</button></td>
    </tbody>
    </table>
  </div>
  <!-- 產品細節視窗 -->
  <Product-Detail-Modal @add-cart="addCart" :temp-product="productTemp" ref="productDetailModal"/>
</template>

<script>
import ProductDetailModal from '@/components/productInfoModal.vue'
export default {
  components: {
    ProductDetailModal
  },
  data () {
    return {
      productList: [],
      productTemp: {}
    }
  },
  mounted () {
    const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
    this.$http.get(`${VITE_APP_API_URL}/${VITE_APP_API_NAME}/products/all`)
      .then((res) => {
        console.log(res)
        this.productList = res.data.products
        console.log(import.meta.env)
      })
  },
  methods: {
    addCart (id) {
      const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
      const order = {
        data: {
          product_id: id,
          qty: 1
        }
      }
      this.$http.post(`${VITE_APP_API_URL}/${VITE_APP_API_NAME}/cart`, order)
        .then((res) => {
          alert(res.data.message)
          console.log(res)
        })
    },
    getProductInfo (id, productInfo) {
      const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
      // 將目前的產品資訊整包帶到this.productTemp，方便等等在modal中取用
      this.productTemp = productInfo
      this.$refs.productDetailModal.openModal()
      this.$http.get(`${VITE_APP_API_URL}/${VITE_APP_API_NAME}/product/${id}`)
        .then((res) => {
          console.log(res.data)
        })
    }
  }
}

</script>
<style scoped>
</style>
