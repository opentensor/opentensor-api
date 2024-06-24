import toast from 'react-hot-toast'
import { StateCreator } from 'zustand'

import { withAsync } from '@/_utils/withAsync'

import { CombinedSlices } from '../types'
import {
  createNewApiKey,
  deleteAsset,
  deleteKey,
  getAllApiKeysOfUser,
  getAllApiLogsOfUser,
  getAllImageStudioAssetsOfUser
} from './actions'
import { ApiSlice, ApiState } from './types'

const initialApiState: ApiState = {
  status: 'IDLE',
  error: null,
  apiKeys: [],
  apiLogs: [],
  imageStudioAssets: [],
  selectedKey: ''
}

const createApiSlice: StateCreator<CombinedSlices, [['zustand/immer', never], never], [], ApiSlice> = (set, get) => ({
  apiState: initialApiState,
  apiActions: {
    fetchAndSetApiKeysToState: async () => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(getAllApiKeysOfUser)

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
      }

      if (response && response.success) {
        set((state) => {
          state.apiState.apiKeys = response.data
          state.apiState.status = 'SUCCESS'
        })
      }
    },
    createNewApiKey: async (name) => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(() => createNewApiKey(name))

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
        toast.error(`Failed. ${error || response.error}`, { position: 'top-right' })
      }

      if (response && response.success) {
        set((state) => {
          state.apiState.apiKeys.push(response.data)
          state.apiState.status = 'SUCCESS'

          toast.success(`API key created successfully`, { position: 'top-right' })
        })
      }
    },
    deleteApiKey: async (key) => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(() => deleteKey(key.id))

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
      }

      if (response && response.success) {
        set((state) => {
          const filteredKeys = get().apiState.apiKeys.filter((_key) => _key.id !== key.id)

          state.apiState.apiKeys = filteredKeys
          state.apiState.status = 'SUCCESS'
        })
      }
    },
    fetchAndSetApiLogsToState: async () => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(getAllApiLogsOfUser)

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
      }

      if (response && response.success) {
        set((state) => {
          state.apiState.apiLogs = response.data
          state.apiState.status = 'SUCCESS'
        })
      }
    },
    fetchAndSetImageStudioAssetsToState: async () => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(getAllImageStudioAssetsOfUser)

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
      }

      if (response && response.success) {
        set((state) => {
          state.apiState.imageStudioAssets = response.result
          state.apiState.status = 'SUCCESS'
        })
      }
    },
    deleteImageStudioAsset: async (asset) => {
      set((state) => {
        state.apiState.status = 'PENDING'
      })

      const { response, error } = await withAsync(() => deleteAsset(asset.id))

      if (error || response.error) {
        set((state) => {
          state.apiState.error = response?.error || 'Something went wrong.'
          state.apiState.status = 'ERROR'
        })
      }

      if (response && response.success) {
        set((state) => {
          const filteredAssets = get().apiState.imageStudioAssets.filter((_asset) => _asset.id !== asset.id)

          state.apiState.imageStudioAssets = filteredAssets
          state.apiState.status = 'SUCCESS'
        })
      }
    },
    setSelectedKey: (key: string) => {
      set((state) => {
        state.apiState.selectedKey = key
      })
    }
  }
})

export default createApiSlice
