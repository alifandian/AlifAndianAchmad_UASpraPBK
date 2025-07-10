<template>
  <div class="users-view">
    <div class="header-row">
      <h1>Users</h1>
      <button class="add-btn">+ Add User</button>
    </div>
    <input v-model="search" class="search-bar" placeholder="Search users..." />
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['status', user.status.toLowerCase()]">{{ user.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const users = ref([
  { id: 1, name: 'Dr. Alice', role: 'Doctor', email: 'alice@hospital.com', status: 'Active' },
  { id: 2, name: 'Nurse Bob', role: 'Nurse', email: 'bob@hospital.com', status: 'Active' },
  { id: 3, name: 'Admin Carol', role: 'Admin', email: 'carol@hospital.com', status: 'Inactive' },
  { id: 4, name: 'Dr. Dave', role: 'Doctor', email: 'dave@hospital.com', status: 'Active' },
])
const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.users-view {
  width: 100%;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.add-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #1565c0;
}
.search-bar {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #b0bec5;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
}
.users-table th, .users-table td {
  padding: 1rem;
  text-align: left;
}
.users-table th {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
}
.users-table tr:nth-child(even) {
  background: #e3f2fd;
}
.status {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
}
.status.active {
  background: #43a047;
}
.status.inactive {
  background: #e53935;
}
</style> 