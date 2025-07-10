<template>
  <div class="patients-view">
    <div class="header-row">
      <h1>Patients</h1>
      <button class="add-btn" @click="openAddModal">+ Add Patient</button>
    </div>
    <input v-model="search" class="search-bar" placeholder="Search patients..." />
    <table class="patients-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Room</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in filteredPatients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.age }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.room }}</td>
          <td>
            <span :class="['status', patient.status.toLowerCase()]">{{ patient.status }}</span>
          </td>
          <td>
            <button class="edit-btn" @click="openEditModal(patient)">Edit</button>
            <button class="delete-btn" @click="deletePatient(patient.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Add/Edit Patient -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editMode ? 'Edit Patient' : 'Add Patient' }}</h2>
        <form @submit.prevent="editMode ? submitEdit() : submitAdd()">
          <input v-model="modalData.name" class="input" placeholder="Name" required />
          <input v-model.number="modalData.age" class="input" placeholder="Age" type="number" required />
          <select v-model="modalData.gender" class="input" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input v-model="modalData.room" class="input" placeholder="Room" required />
          <select v-model="modalData.status" class="input" required>
            <option>Admitted</option>
            <option>Discharged</option>
          </select>
          <div class="modal-actions">
            <button type="submit" class="save-btn">Save</button>
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePatientStore } from '../store/patientStore'

const store = usePatientStore()
const search = ref('')
const showModal = ref(false)
const editMode = ref(false)
const modalData = ref({
  id: null,
  name: '',
  age: '',
  gender: '',
  room: '',
  status: 'Admitted',
})

onMounted(() => {
  store.fetchPatients()
})

const filteredPatients = computed(() => {
  return store.patients.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function openAddModal() {
  editMode.value = false
  modalData.value = { id: null, name: '', age: '', gender: '', room: '', status: 'Admitted' }
  showModal.value = true
}
function openEditModal(patient) {
  editMode.value = true
  modalData.value = { ...patient }
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
async function submitAdd() {
  await store.addPatient({ ...modalData.value })
  closeModal()
}
async function submitEdit() {
  await store.updatePatient({ ...modalData.value })
  closeModal()
}
async function deletePatient(id) {
  if (confirm('Are you sure you want to delete this patient?')) {
    await store.deletePatient(id)
  }
}
</script>

<style scoped>
.patients-view {
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
.edit-btn, .delete-btn {
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.9rem;
  margin-right: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn {
  background: #43a047;
  color: #fff;
}
.edit-btn:hover {
  background: #388e3c;
}
.delete-btn {
  background: #e53935;
  color: #fff;
}
.delete-btn:hover {
  background: #b71c1c;
}
.search-bar {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #b0bec5;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}
.patients-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
}
.patients-table th, .patients-table td {
  padding: 1rem;
  text-align: left;
}
.patients-table th {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
}
.patients-table tr:nth-child(even) {
  background: #e3f2fd;
}
.status {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
}
.status.admitted {
  background: #43a047;
}
.status.discharged {
  background: #e53935;
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 10px;
  padding: 2rem 2.5rem;
  min-width: 320px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #b0bec5;
  margin-bottom: 1.2rem;
  font-size: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.save-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #1565c0;
}
.cancel-btn {
  background: #b0bec5;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #90a4ae;
}
</style>