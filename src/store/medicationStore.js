import { defineStore } from 'pinia'
import axios from 'axios'

export const useMedicationStore = defineStore('medication', {
  state: () => ({
    medications: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMedications() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:3001/medications')
        this.medications = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async addMedication(order) {
      try {
        const res = await axios.post('http://localhost:3001/medications', order)
        this.medications.push(res.data)
      } catch (err) {
        this.error = err
      }
    },
    async updateMedication(order) {
      try {
        await axios.put(`http://localhost:3001/medications/${order.id}`, order)
        const idx = this.medications.findIndex(o => o.id === order.id)
        if (idx !== -1) this.medications[idx] = order
      } catch (err) {
        this.error = err
      }
    },
    async deleteMedication(id) {
      try {
        await axios.delete(`http://localhost:3001/medications/${id}`)
        this.medications = this.medications.filter(o => o.id !== id)
      } catch (err) {
        this.error = err
      }
    },
  },
})