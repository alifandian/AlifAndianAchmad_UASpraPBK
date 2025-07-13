<template>
  <div class="dashboard-view">
    <h1>Welcome to Hospital Management Dashboard</h1>
    <p class="subtitle">Monitor and manage hospital operations efficiently.</p>
    <div class="stats-grid">
      <div class="stat-card patients">
        <div class="stat-title">Patients</div>
        <div class="stat-value">128</div>
      </div>
      <div class="stat-card medications">
        <div class="stat-title">Medications</div>
        <div class="stat-value">56</div>
      </div>
      <div class="stat-card users">
        <div class="stat-title">Users</div>
        <div class="stat-value">12</div>
      </div>
      <div class="stat-card reports">
        <div class="stat-title">Reports</div>
        <div class="stat-value">7</div>
      </div>
    </div>
  </div>
  <q-page>
       <q-btn color="primary" label="Test Quasar" />
     </q-page>
</template>

<script setup>
// In a real app, fetch stats from API or store
</script>

<style scoped>
.dashboard-view {
  text-align: center;
}
.subtitle {
  color: #1976d2;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.stat-card {
  background: linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
  padding: 2rem 1rem;
  transition: transform 0.2s;
  cursor: pointer;
}
.stat-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 6px 24px rgba(25, 118, 210, 0.15);
}
.stat-title {
  font-size: 1.1rem;
  color: #1976d2;
  margin-bottom: 0.5rem;
}
.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0d47a1;
}
</style>
