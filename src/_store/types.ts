import { ApiSlice } from './api/types'

export type CombinedSlices = ApiSlice
export type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'
