import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PatientsView from './PatientsView.vue'
import { createTestingPinia } from '@pinia/testing'
import { usePatientStore } from '../store/patientStore'

vi.mock('../store/patientStore', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    usePatientStore: vi.fn(),
  }
})

describe('PatientsView.vue', () => {
  let storeMock
  beforeEach(() => {
    storeMock = {
      patients: [
        { id: 1, name: 'John Doe', age: 32, gender: 'Male', room: 'A101', status: 'Admitted' },
        { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', room: 'B202', status: 'Discharged' },
      ],
      fetchPatients: vi.fn(),
      addPatient: vi.fn(),
      updatePatient: vi.fn(),
      deletePatient: vi.fn(),
    }
    usePatientStore.mockReturnValue(storeMock)
  })

  it('renders patients table from store', async () => {
    const wrapper = mount(PatientsView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    await flushPromises()
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Jane Smith')
  })

  it('opens add modal when add button is clicked', async () => {
    const wrapper = mount(PatientsView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    await flushPromises()
    await wrapper.find('.add-btn').trigger('click')
    expect(wrapper.find('.modal').exists()).toBe(true)
  })
}) 