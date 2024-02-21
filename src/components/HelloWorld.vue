<template>
  <div>
    歡迎來首頁
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import counterStore from '@/stores/counter'

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(counterStore, ['increment'])
  },
  computed: {
    ...mapState(counterStore, ['count'])
  }
}
</script>

<style scoped>
</style>
