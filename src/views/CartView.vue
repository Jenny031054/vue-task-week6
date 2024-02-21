<template>
<div class="container">
  <h1 >購物車頁面</h1>
    <hr>
    <div class="row">
      <table class="table align-middle ">
        <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
            <th>刪除</th>
        </thead>
        <tbody v-for="cart in cart.carts" :key="cart.id">
            <td><img :src="cart.product.imageUrl" alt="" height="200" width="200" class="object-fit"></td>
            <td>{{ cart.product.title }}</td>
            <td>{{ cart.qty }}</td>
            <td>{{ cart.final_total }}</td>
            <td>
              <button class="btn btn-danger" type="button" @click="delCart(cart.id)">
                刪除
              </button>
            </td>
        </tbody>
        <tfoot>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.final_total }}</td>
        </tfoot>
    </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cart: []
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart () {
      const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
      this.$http.get(`${VITE_APP_API_URL}/${VITE_APP_API_NAME}/cart`)
        .then((res) => {
          this.cart = res.data.data
          console.log(this.cart)
        })
    },
    delCart (id) {
      const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
      this.$http.delete(`${VITE_APP_API_URL}/${VITE_APP_API_NAME}/cart/${id}`)
        .then((res) => {
          console.log(res.data)
          alert('刪除成功！')
          this.getCart()
        })
    }
  }
}
</script>
