import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        username: 'admin',
        password: 'admin',
        fullName: 'Admin User',
        email: 'admin@example.com',
        phone: '9999999999',
        designation: 'admin'
      },
       {
        username: 'Kavish',
        password: '1234',
        fullName: 'Kavish Toraskar',
        email: 'Ka@example.com',
        phone: '9999999999',
        designation: 'admin'
      }
    ],
    currentUser: null
  }),

  actions: {
   addUser(user) {

  this.users.push({
    ...user
  })
},

    login(username, password) {
      const user = this.users.find(
        u => u.username === username && u.password === password
      )
      if (user) this.currentUser = user
      return user
    },

    logout() {
      this.currentUser = null
    }
  },

 
  persist: true
})
