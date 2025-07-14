<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-card flat bordered class="q-pa-lg q-mx-auto" style="max-width: 800px;">
      <q-card-section>
        <div class="text-h5 text-primary text-center">
          Welcome {{ userStore.currentUser.fullName }} (admin)
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1 text-bold q-mb-md">👤 Create User</div>
        <component
          :is="currentStepComponent"
          :user="user"
          @update-user="updateUser"
          @next="nextStep"
          @done="createUser"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="Logout" color="negative" @click="logout" />
        <q-btn label="View Users" color="primary" icon="visibility" class="q-ml-md" @click="showUserList = true" />
      </q-card-actions>
    </q-card>

    <q-separator spaced />

   
    <q-dialog v-model="showUserList" persistent>
      <q-card style="width: 90vw; max-width: 1000px;">
        <q-card-section>
          <div class="text-subtitle1 text-bold q-mb-md">📋 User List</div>
          <UserListTable />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script>
import { useUserStore } from 'src/stores/user.js'
import { useRouter } from 'vue-router'
import StepOneForm from './StepOneForm.vue'
import StepTwoForm from './StepTwoForm.vue'
import StepThreeReview from './StepThreeReview.vue'
import UserListTable from './UserListTable.vue'

const userStore = useUserStore()
const router = useRouter()

export default {
  components: {
    StepOneForm,
    StepTwoForm,
    StepThreeReview,
    UserListTable
  },

  data() {
    return {
      user: {
        username: '',
        fullName: '',
        email: '',
        phone: '',
        designation: 'user',
        userId: '',
        password: ''
      },
      currentStep: 1,
      showUserList: false
    }
  },

  computed: {
    currentStepComponent() {
      if (this.currentStep === 1) return StepOneForm
      if (this.currentStep === 2) return StepTwoForm
      return StepThreeReview
    },

    userStore() {
      return userStore
    }
  },

  methods: {
    updateUser(partialData) {
      Object.assign(this.user, partialData)
    },

    nextStep() {
      this.currentStep++
    },

    createUser() {
      this.userStore.addUser({ ...this.user })
      this.currentStep = 1
      this.user = {
        username: '',
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        userId: '',
        password: ''
      }
    },

    logout() {
      this.userStore.logout()
      router.push('/')
    }
  },

  mounted() {
    if (!this.userStore.currentUser) {
      router.push('/')
    }
  }
}
</script>
