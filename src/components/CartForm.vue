<template>
<!-- 表單 -->
<div class="my-5 row justify-content-center">
          <v-form @submit="onSubmit" ref="form" class="col-md-6" v-slot="{ errors }" >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <!-- input功能換成v-field -->
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email" rules="email|required"
                v-model="user.email"
              ></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                       placeholder="請輸入姓名" rules="required" v-model="user.name"></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field id="tel" name="tel" type="tel" class="form-control" :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話" :rules="isPhone" v-model="user.tel"></v-field>
              <error-message name="tel" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field id="address" name="area" type="text" class="form-control" :class="{ 'is-invalid': errors['area'] }"
                       placeholder="請輸入地址" rules="required" v-model="user.area"></v-field>
              <error-message name="area" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea id="message" class="form-control" cols="30" rows="10" v-model="user.message"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger" @submit="onSubmit(user.tel)"
                      >送出訂單</button>
            </div>
          </v-form>
        </div>
</template>

<script>
export default {
  data () {
    return {
      errors: '格式錯誤',
      user: {},
      status: {
        addToCartLoading: '',
        delCartLoading: ''
      }
    }
  },
  mounted () {
    this.getProduct()
    this.getCartData()
  },
  methods: {
    onSubmit () {
      const orderInfo = {
        data: {
          user: {
            name: this.user.name,
            email: this.user.email,
            tel: this.user.tel,
            address: this.user.area
          },
          message: this.user.message
        }
      }
      if (this.carts.length === 0) {
        // eslint-disable-next-line no-undef
        axios.post(`${apiUrl}/v2/api/${apiPath}/order`, orderInfo)
          .then((res) => {
            console.log(res.data)
            this.user = {}
            this.getCartData()
            alert('訂單已送出成功！')
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        alert('購物車內沒有商品歐！')
      };
    }
  }

}
</script>
