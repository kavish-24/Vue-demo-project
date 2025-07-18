<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2" style="width: 350px; max-width: 90vw">
      <q-card-section class="text-h6 text-primary text-center">
        🔐 Login
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Username"
          dense
          ref="usernameRef"
          :rules="[val => !!val || 'Username is required']"
          @keyup.enter="$refs.passwordRef.focus()"
        />

        <q-input
          filled
          v-model="password"
          label="Password"
          :type="isPwdVisible ? 'text' : 'password'"
          dense
          ref="passwordRef"
          :rules="[val => !!val || 'Password is required']"
          @keyup.enter="handleLogin"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPwdVisible = !isPwdVisible"
            />
          </template>
        </q-input>

        <q-btn
          label="Login"
          color="primary"
          @click="handleLogin"
          class="full-width"
        />

        <q-banner
          v-if="error"
          class="bg-red text-white q-mt-sm"
          dense
          rounded
        >
          ⚠️ Invalid username or password
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user'

export default {
  name: 'LoginPage',

  data() {
    return {
      username: '',
      password: '',
      error: false,
      isPwdVisible: false
    }
  },

  created() {
    const store = useUserStore()
    store.logout()
  },

  methods: {
    handleLogin() {
      const user = this.userStore.login(this.username, this.password)

      if (!user) {
        this.error = true
        return
      }

     
      sessionStorage.setItem('currentUser', JSON.stringify(user))
      sessionStorage.setItem('loggedIn', 'true')

      if (user.designation === 'admin') {
        this.$router.push('/admin')
      } else {
        this.$router.push('/user')
      }
    }
  },

  computed: {
    userStore() {
      return useUserStore()
    }
  }
}
</script>
