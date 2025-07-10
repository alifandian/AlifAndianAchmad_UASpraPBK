import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMedicationStore } from './medicationStore'
import axios from 'axios'

vi.mock('axios')

describe('medicationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches medications from API', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 'M-001', medication: 'Test Med' }] })
    const store = useMedicationStore()
    await store.fetchMedications()
    expect(store.medications.length).toBe(1)
    expect(store.medications[0].medication).toBe('Test Med')
  })

  it('adds a medication order', async () => {
    axios.post.mockResolvedValue({ data: { id: 'M-002', medication: 'New Med' } })
    const store = useMedicationStore()
    store.medications = []
    await store.addMedication({ medication: 'New Med' })
    expect(store.medications.length).toBe(1)
    expect(store.medications[0].medication).toBe('New Med')
  })

  it('updates a medication order', async () => {
    axios.put.mockResolvedValue({})
    const store = useMedicationStore()
    store.medications = [{ id: 'M-001', medication: 'Old Med' }]
    await store.updateMedication({ id: 'M-001', medication: 'Updated Med' })
    expect(store.medications[0].medication).toBe('Updated Med')
  })

  it('deletes a medication order', async () => {
    axios.delete.mockResolvedValue({})
    const store = useMedicationStore()
    store.medications = [{ id: 'M-001', medication: 'To Delete' }]
    await store.deleteMedication('M-001')
    expect(store.medications.length).toBe(0)
  })
})