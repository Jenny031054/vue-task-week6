<template>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ delItem.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button
              @click="delProduct"
              type="button" class="btn btn-danger">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { Modal } from 'bootstrap'
import axios from 'axios'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env
export default {
  props: ['delItem'],
  data () {
    return {
      delProductModal: null
    }
  },
  mounted () {
    this.delProductModal = new Modal(this.$refs.delProductModal)
  },
  methods: {
    delProduct () {
      const url = `${VITE_APP_API_URL}/${VITE_APP_API_NAME}/admin/product/${this.delItem.id}`
      axios.delete(url)
        .then((res) => {
          alert(res.data.message)
          this.hideModal()
          this.$emit('get-data')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    hideModal () {
      this.delProductModal.hide()
    },
    showModal () {
      this.delProductModal.show()
    }
  }
}
</script>
