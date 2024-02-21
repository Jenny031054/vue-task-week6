<template>
    <h1 class=" fw-bold">這裡是登入</h1>
    <div class="container">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">
            請先登入
          </h1>
          <div class="col-8">
            <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username" v-model="user.username"
                  placeholder="name@example.com" required autofocus>
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password" v-model="user.password"
                  placeholder="Password" required>
                <label for="password">Password</label>
              </div>
              <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="signin">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
      console.log(this.user)
      this.$http.post(api, this.user)
        .then((res) => {
          console.log(this.user)
          console.log(res)
          // 先解構，得到token和到期日
          const { token, expired } = res.data
          console.log(token, expired)
          // 存到瀏覽器的cookie
          document.cookie = `myToken=${token}; expires=${new Date(expired)} ;path=/`
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.$router.push('/login')
          alert(error.response.data.message)
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>
