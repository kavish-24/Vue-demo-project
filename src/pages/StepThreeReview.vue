<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div><b>Username:</b> {{ user.username }}</div>
        <div><b>Full Name:</b> {{ user.fullName }}</div>
        <div><b>Email:</b> {{ user.email }}</div>
        <div><b>Phone:</b> {{ user.phone }}</div>
        <div><b>Designation:</b> {{ user.designation }}</div>

        <!-- Password Display with Copy -->
        <div class="row items-center q-gutter-sm">
          <div><b>Password:</b> {{ user.password }}</div>
          <q-btn
            flat
            dense
            icon="content_copy"
            @click="copyPassword"
            size="sm"
          />
          <q-banner v-if="copied" class="bg-positive text-white q-pa-sm">
            Password copied!
          </q-banner>
        </div>

        <div><b>User ID:</b> {{ user.userId }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Create New User" color="green" @click="done" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["user"]);
const emit = defineEmits(["done", "update-user"]);

const copied = ref(false); // show copy success message

function generateRandomPassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

onMounted(() => {
  if (!props.user.password) {
    const newPassword = generateRandomPassword();
    emit("update-user", { password: newPassword });
  }
});

function done() {
  emit("done");
}

async function copyPassword() {
  try {
    await navigator.clipboard.writeText(props.user.password);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
</script>
