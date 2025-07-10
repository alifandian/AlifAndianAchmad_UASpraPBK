<script setup>
// No logic needed here for now
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-brand">🏥 Hospital Management</div>
      <ul class="navbar-menu">
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/patients">Patients</router-link></li>
        <li><router-link to="/medications">Medications</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/reports">Reports</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1976d2;
  color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}
.navbar-menu {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}
.navbar-menu li {
  font-size: 1.1rem;
}
.navbar-menu a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.navbar-menu a.router-link-exact-active,
.navbar-menu a:hover {
  background: #1565c0;
}
.main-content {
  max-width: 1100px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.07);
  padding: 2.5rem 2rem;
  min-height: 70vh;
}
</style>
