<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-card flat bordered class="q-pa-lg q-mx-auto shadow-4" style="max-width: 800px; border-radius: 12px;">
     
      <q-card-section class="text-center">
        <div class="text-h5 text-primary">
          👋 Welcome, {{ userStore.currentUser.fullName }} <span class="text-subtitle2">(Admin)</span>
        </div>
      </q-card-section>

      <q-separator />

      
      <q-card-section>
        <div class="text-subtitle1 text-bold q-mb-md">👤 Create New User</div>
        <component
          :is="currentStepComponent"
          :user="user"
          @update-user="updateUser"
          @next="nextStep"
          @done="createUser"
        />
      </q-card-section>

     
      <q-card-actions align="center" class="q-mt-md">
        <q-btn label="Logout" color="negative" icon="logout" @click="logout" />
        <q-btn label="View Users" color="primary" icon="group" class="q-ml-md" @click="showUserList = true" />
        <q-btn label="Profile" color="primary" icon="account_circle" class="q-ml-md" @click="showProfile = true" />
      </q-card-actions>
    </q-card>

    
    <q-dialog v-model="showUserList" persistent>
      <q-card class="shadow-10" style="width: 90vw; max-width: 1000px; border-radius: 12px;">
        <q-card-section class="row items-center">
          <div class="text-subtitle1 text-bold">📋 All Users</div>
          <q-space />
          <q-btn dense flat round icon="close" v-close-popup class="text-grey" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <UserListTable />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Profile Dialog -->
   <q-dialog v-model="showProfile" persistent>
  <q-card style="width: 400px; max-width: 90vw;">
    <AdminProfile @close="showProfile = false" />
  </q-card>
</q-dialog>

  </q-page>
</template>



<script>
import { useUserStore } from 'src/stores/user.js'
import { useRouter } from 'vue-router'
import StepOneForm from '../components/Forms/StepOneForm.vue'
import StepTwoForm from '../components/Forms/StepTwoForm.vue'
import StepThreeReview from '../components/Forms/StepThreeReview.vue'
import UserListTable from '../components/UserListTable.vue'
import AdminProfile from '../components/AdminProfile.vue'


const userStore = useUserStore()
const router = useRouter()

export default {
  components: {
  StepOneForm,
  StepTwoForm,
  StepThreeReview,
  UserListTable,
  AdminProfile 
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
      showUserList: false,
      showProfile: false
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
      this.$router.push('/')
    }
  },

  mounted() {
    if (!this.userStore.currentUser) {
      this.$router.push('/')
    }
  }
}
</script>
