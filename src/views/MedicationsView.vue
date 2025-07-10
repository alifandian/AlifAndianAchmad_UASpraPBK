<template>
  <div class="medications-view">
    <div class="header-row">
      <h1>Medication Orders</h1>
      <button class="add-btn" @click="openAddModal">+ Add Order</button>
    </div>
    <input v-model="search" class="search-bar" placeholder="Search medications..." />
    <table class="medications-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Patient</th>
          <th>Medication</th>
          <th>Dose</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.patient }}</td>
          <td>{{ order.medication }}</td>
          <td>{{ order.dose }}</td>
          <td>
            <span :class="['status', order.status.toLowerCase()]">{{ order.status }}</span>
          </td>
          <td>
            <button class="edit-btn" @click="openEditModal(order)">Edit</button>
            <button class="delete-btn" @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Add/Edit Order -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editMode ? 'Edit Order' : 'Add Order' }}</h2>
        <form @submit.prevent="editMode ? submitEdit() : submitAdd()">
          <input v-model="modalData.id" class="input" placeholder="Order ID" required :readonly="editMode" />
          <input v-model="modalData.patient" class="input" placeholder="Patient" required />
          <input v-model="modalData.medication" class="input" placeholder="Medication" required />
          <input v-model="modalData.dose" class="input" placeholder="Dose" required />
          <select v-model="modalData.status" class="input" required>
            <option>Pending</option>
            <option>Completed</option>
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
import { useMedicationStore } from '../store/medicationStore'

const store = useMedicationStore()
const search = ref('')
const showModal = ref(false)
const editMode = ref(false)
const modalData = ref({
  id: '',
  patient: '',
  medication: '',
  dose: '',
  status: 'Pending',
})

onMounted(() => {
  store.fetchMedications()
})

const filteredOrders = computed(() => {
  return store.medications.filter(o =>
    o.patient.toLowerCase().includes(search.value.toLowerCase()) ||
    o.medication.toLowerCase().includes(search.value.toLowerCase())
  )
})

function openAddModal() {
  editMode.value = false
  modalData.value = { id: '', patient: '', medication: '', dose: '', status: 'Pending' }
  showModal.value = true
}
function openEditModal(order) {
  editMode.value = true
  modalData.value = { ...order }
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
async function submitAdd() {
  await store.addMedication({ ...modalData.value })
  closeModal()
}
async function submitEdit() {
  await store.updateMedication({ ...modalData.value })
  closeModal()
}
async function deleteOrder(id) {
  if (confirm('Are you sure you want to delete this order?')) {
    await store.deleteMedication(id)
  }
}
</script>

<style scoped>
.medications-view {
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
.medications-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
}
.medications-table th, .medications-table td {
  padding: 1rem;
  text-align: left;
}
.medications-table th {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
}
.medications-table tr:nth-child(even) {
  background: #e3f2fd;
}
.status {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
}
.status.pending {
  background: #ffa000;
}
.status.completed {
  background: #43a047;
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