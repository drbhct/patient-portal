import { useAuthStore } from '@/stores/auth' const authStore = useAuthStore() //
Replace mapGetters: ...mapGetters(['getAuthCurrentPage']), // With:
authStore.currentPage // Replace getter usage: this.getAuthCurrentPage //
Replace action calls: this.setAuthCurrentPage(page) // With:
authStore.setCurrentPage(page)
