<template>
  <q-page class="q-pa-md column q-gutter-md items-center">
    <div style="width: 300px">
      <q-input filled v-model="username" label="Username" />
      <q-input filled type="password" v-model="password" label="Password" />
      <q-btn label="Login" color="primary" @click="handleLogin" class="full-width q-mt-sm" />
      <q-banner v-if="error" class="bg-red text-white q-mt-sm">
        Invalid username
      </q-banner>
    </div>
  </q-page>
</template>

<script >
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

export default {
  name:'LoginPage',
  data(){
    return {
      username: '',
      password: '',
      error: false
    }
  },  

setup() {
    const router = useRouter()
    const userStore = useUserStore()

    return {
      router,
      userStore
    }
  },
 
methods: {
    handleLogin() {
      const user = this.userStore.login(this.username, this.password)

      if (!user) {
        this.error = true
        return
      }

      if (user.designation === 'admin') {
        this.router.push('/admin')
      } else {
        this.router.push('/user')
      }
    }
  }
  
}
</script>
