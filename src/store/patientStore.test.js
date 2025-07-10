import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePatientStore } from './patientStore'
import axios from 'axios'

vi.mock('axios')

describe('patientStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches patients from API', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Patient' }] })
    const store = usePatientStore()
    await store.fetchPatients()
    expect(store.patients.length).toBe(1)
    expect(store.patients[0].name).toBe('Test Patient')
  })

  it('adds a patient', async () => {
    axios.post.mockResolvedValue({ data: { id: 2, name: 'New Patient' } })
    const store = usePatientStore()
    store.patients = []
    await store.addPatient({ name: 'New Patient' })
    expect(store.patients.length).toBe(1)
    expect(store.patients[0].name).toBe('New Patient')
  })

  it('updates a patient', async () => {
    axios.put.mockResolvedValue({})
    const store = usePatientStore()
    store.patients = [{ id: 1, name: 'Old Name' }]
    await store.updatePatient({ id: 1, name: 'Updated Name' })
    expect(store.patients[0].name).toBe('Updated Name')
  })

  it('deletes a patient', async () => {
    axios.delete.mockResolvedValue({})
    const store = usePatientStore()
    store.patients = [{ id: 1, name: 'To Delete' }]
    await store.deletePatient(1)
    expect(store.patients.length).toBe(0)
  })
}) 