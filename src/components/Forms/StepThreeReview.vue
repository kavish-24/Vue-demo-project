<template>
  <div class="q-pa-md">
    <q-card flat bordered class="q-pa-md q-gutter-md">

      <q-card-section>
        <div class="text-h6 text-primary q-mb-md">
          🧾 Review User Details
        </div>

        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label overline>Username</q-item-label>
              <q-item-label>{{ user.username }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Full Name</q-item-label>
              <q-item-label>{{ user.fullName }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Email</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Phone</q-item-label>
              <q-item-label>{{ user.phone }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Designation</q-item-label>
              <q-item-label>{{ user.designation }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="user.designation === 'user'">
            <q-item-section>
              <q-item-label overline>User ID</q-item-label>
              <q-item-label>{{ user.userId }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>Password</q-item-label>
              <q-item-label>{{ user.password }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                dense
                icon="content_copy"
                color="primary"
                @click="copyPassword"
              />
            </q-item-section>
          </q-item>
        </q-list>

        
        <q-banner
          v-if="copied"
          class="bg-positive text-white q-mt-md"
          dense
        >
          Password copied to clipboard!
        </q-banner>
      </q-card-section>

    
      <q-card-actions align="right">
        <q-btn label="Create New User" color="positive" icon="check_circle" @click="done" />
      </q-card-actions>
    </q-card>
  </div>
</template>


<script>
export default {
  name: 'StepThreeForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  emits: ['done', 'update-user'],

  data() {
    return {
      copied: false
    }
  },

  mounted() {
    if (!this.user.password) {
      const newPassword = this.generateRandomPassword()
      this.$emit('update-user', { password: newPassword })
    }
  },

  methods: {
    generateRandomPassword(length = 8) {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
      let password = ''
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        password += chars[randomIndex]
      }
      return password
    },

    done() {
      this.$emit('done')
    },

    async copyPassword() {
      try {
        await navigator.clipboard.writeText(this.user.password)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }
}
</script>
