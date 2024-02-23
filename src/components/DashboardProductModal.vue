<template>
    <div id="productModal" ref="dashboardProductModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <!-- 主要圖片 -->
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入主要圖片網址</label>
                      <input
                        v-model="editProduct.imageUrl"
                        type="text" class="form-control"
                        placeholder="請輸入圖片連結"
                        id="imageUrl">
                      <img class="img-fluid" :src="editProduct.imageUrl" >
                    </div>
                    <!-- END 主要圖片 -->
                    <!-- 多圖新增 -->
                    <h5 class="mb-3">多圖新增</h5>
                    <div v-if="Array.isArray(editProduct.imagesUrl)">
                        <!-- 這邊是處理多圖新增，因為要存的方式是陣列，所以 -->
                        <div class="mb-1" v-for="(image,key) in editProduct.imageUrl" :key="key">
                          <div class="mb-3">
                            <label :for="key" class="form-label">輸入圖片網址</label>
                            <input :id="key"
                             v-model="editProduct.imagesUrl[key]"
                             type="text" class="form-control"
                             placeholder="請輸入圖片連結">
                          </div>
                         <img class="img-fluid" :src="image">
                        </div>
                        <!-- 判斷多張圖片的陣列長度是否為0或 -->
                        <div  v-if="!editProduct.imagesUrl.length || editProduct.imageUrl[editProduct.imagesUrl.length - 1]">
                            <button
                            @click="editProduct.imagesUrl.push('')"
                            class="btn btn-outline-primary btn-sm d-block w-100">
                            新增圖片
                            </button>
                        </div>
                        <div v-else>
                            <button
                            @click="editProduct.imagesUrl.pop()"
                            class="btn btn-outline-danger btn-sm d-block w-100">
                            刪除圖片
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                          新增圖片
                        </button>
                    </div>

                </div>

                </div>
                <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input v-model="editProduct.title" id="title" type="text" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input v-model="editProduct.category" id="category" type="text" class="form-control"
                           placeholder="請輸入分類">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input v-model="editProduct.unit" id="unit" type="text" class="form-control" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input v-model="editProduct.origin_price" id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input  v-model="editProduct.price" id="price" type="number" min="0" class="form-control"
                           placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea v-model="editProduct.description" id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea v-model="editProduct.content"  id="content" type="text" class="form-control"
                            placeholder="請輸入說明內容">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input v-model="editProduct.is_enabled"  id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>

              <button @click="updateProduct" type="button" class="btn btn-primary">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
import { Modal } from 'bootstrap'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  props: ['product', 'isNew'],
  data () {
    return {
      dashboardProductModal: null,
      editProduct: {}
    }
  },
  // 這個生命週期的時候可以取得網頁DOM元素，所以在這裡先抓到modal，接著界可以用他的變數名稱操控
  mounted () {
    this.editProduct = this.product
    // 建立productModal
    this.dashboardProductModal = new Modal(this.$refs.dashboardProductModal)
  },
  watch: {
    product () {
      this.editProduct = this.product
    }
  },
  methods: {
    updateProduct () {
      // 用let 因為下面還要判斷這次的狀況是要新增還是修改，
      let url = `${VITE_APP_API_URL}/${VITE_APP_API_NAME}/admin/product`
      let http = 'post'
      // 判斷是否為新增商品，就要改網址路徑和http狀態
      if (this.isNew === false) {
        // 而且編輯確認按鈕要帶上產品id
        url = `${VITE_APP_API_URL}/${VITE_APP_API_NAME}/admin/product/${this.editProduct.id}`
        http = 'put'
      };

      // 判斷完就可以發請求，因為axios是個物件，用.post、.put發送請求涵式，也可以用括弧記法[]
      this.$http[http](url, { data: this.editProduct })
        .then((res) => {
          alert(res.data.message)
          // 關閉modal後取得資料並且渲染到畫面上
          this.hideModal()
          // this.getData();
          // 這邊內部元件資料更新，同時也要更新到外部去，所以要用emit事件傳遞更新後的狀態
          this.$emit('updateData')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showModal () {
      this.editProduct = this.product
      this.dashboardProductModal.show()
      console.log(this.isNew)
      console.log(this.editProduct)
    },
    hideModal () {
      this.dashboardProductModal.hide()
    }
    // createImages () {
    //   this.editProduct.imagesUrl = []
    //   this.editProduct.imagesUrl.push('')
    // }
  }
}
</script>
