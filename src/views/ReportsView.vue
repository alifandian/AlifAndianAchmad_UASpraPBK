<template>
  <div class="reports-view">
    <h1>Reports</h1>
    <div class="reports-list">
      <div class="report-card" v-for="report in reports" :key="report.id">
        <div class="icon">{{ report.icon }}</div>
        <div class="info">
          <div class="title">{{ report.title }}</div>
          <div class="desc">{{ report.desc }}</div>
        </div>
        <button class="view-btn">View</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const reports = [
  { id: 1, icon: '📄', title: 'Patient Report', desc: 'Summary of all patient data.' },
  { id: 2, icon: '💊', title: 'Medication Report', desc: 'Overview of medication orders.' },
  { id: 3, icon: '👨‍⚕️', title: 'Staff Report', desc: 'Details of hospital staff.' },
  { id: 4, icon: '💰', title: 'Financial Report', desc: 'Hospital financial summary.' },
]
</script>

<style scoped>
.reports-view {
  width: 100%;
}
.reports-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.report-card {
  background: linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: transform 0.2s;
}
.report-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 6px 24px rgba(25, 118, 210, 0.15);
}
.icon {
  font-size: 2.5rem;
}
.info {
  flex: 1;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1976d2;
}
.desc {
  color: #333;
  font-size: 1rem;
}
.view-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.view-btn:hover {
  background: #1565c0;
}
</style> 