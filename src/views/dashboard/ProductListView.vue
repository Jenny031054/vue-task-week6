<template>
    <h1 class="fw-bold">這裡是產品列表</h1>
    <div class="container">
        <div class="text-end mt-4">
          <button
          @click="openModal('new',item)"
          class="btn btn-primary">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-end">{{ item.origin_price }}</td>
              <td class="text-end">{{ item.price }}</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                  @click="openModal('edit',item)"
                  type="button" class="btn btn-outline-primary btn-sm">
                    編輯
                  </button>
                  <button
                  @click="openModal('delete',item)"
                  type="button" class="btn btn-outline-danger btn-sm">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <pagination :pages="pagination" @get-page="getData"></pagination> -->
      </div>
      <!-- pagination -->
      <!-- END pagination -->
      <!-- Modal -->
      <DashboardProductModal @update-data="getData" :product="productTemp" :is-new="isNew" ref="dashboardProductModal" />
      <!-- END Modal -->
      <!-- 刪除modal -->
      <del-product-modal :del-item="productTemp" @get-data="getData" ref="delProductModal"></del-product-modal>
      <!-- END 刪除modal -->
</template>
<script>
// 預設匯出元件
import DashboardProductModal from '@/components/DashboardProductModal.vue'
import delProductModal from '@/components/DelModal.vue'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  components: {
    DashboardProductModal,
    delProductModal
  },
  data () {
    return {
      products: [],
      productTemp: {},
      isNew: false
    }
  },
  mounted () {
    this.getData()
    console.log(this.$refs)
    // ProductModal.showModal()
  },
  methods: {
    openModal (status, item) {
      console.log(status)
      // 這邊開啟視窗時會有三種狀態，
      // 1. 新增商品 2.編輯商品 3. 刪除商品
      if (status === 'new') {
        this.productTemp = {
          imagesUrl: []
        }
        console.log(this.productTemp)
        this.isNew = true
        this.$refs.dashboardProductModal.showModal()
      } else if (status === 'edit') {
        this.productTemp = { ...item }
        console.log(this.productTemp)
        this.isNew = false
        this.$refs.dashboardProductModal.showModal()
      } else if (status === 'delete') {
        this.productTemp = { ...item }
        this.$refs.delProductModal.showModal()
      }
    },
    getData (page = 1) {
      // 設定網址參數page，預設是第1頁
      const url = `${VITE_APP_API_URL}/${VITE_APP_API_NAME}/admin/products?page=${page}`
      this.$http.get(url)
        .then((res) => {
          console.log(res.data)
          const { products } = res.data
          this.products = products
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    }
  }
}

</script>
