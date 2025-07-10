import { defineStore } from 'pinia'
import axios from 'axios'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPatients() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3001/patients')
        this.patients = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async addPatient(patient) {
      try {
        const res = await axios.post('http://localhost:3001/patients', patient)
        this.patients.push(res.data)
      } catch (err) {
        this.error = err
      }
    },
    async updatePatient(patient) {
      try {
        await axios.put(`http://localhost:3001/patients/${patient.id}`, patient)
        const idx = this.patients.findIndex(p => p.id === patient.id)
        if (idx !== -1) this.patients[idx] = patient
      } catch (err) {
        this.error = err
      }
    },
    async deletePatient(id) {
      try {
        await axios.delete(`http://localhost:3001/patients/${id}`)
        this.patients = this.patients.filter(p => p.id !== id)
      } catch (err) {
        this.error = err
      }
    },
  },
})