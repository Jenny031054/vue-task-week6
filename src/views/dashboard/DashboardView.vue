<template>
    <h1 class="text-primary fw-bold">這裡是後台頁面</h1>
    <nav class="nav justify-content-center ">
        <RouterLink to="/dashboard/productList"> 產品列表 |</RouterLink>
        <RouterLink to="/dashboard/order"> 訂單列表 |</RouterLink>
        <RouterLink to="/">回到前台 |</RouterLink>
    </nav>
    <RouterView />
</template>
<script>
import axios from 'axios'
const { VITE_APP_API_URL } = import.meta.env
export default {
  mounted () {
    // 存下token，下次不用重新登入也可以娶的資料
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 預設行為存在headers
    axios.defaults.headers.common.Authorization = token
    this.checkAdmin()
  },
  methods: {
    checkAdmin () {
      // 確認登入狀態
      this.$http.post(`${VITE_APP_API_URL}/user/check`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          this.$router.push('/login')
        })
    }
  }
}
</script>
