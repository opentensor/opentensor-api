import { ApiStatus } from '../types'

export interface ApiSlice {
  apiState: ApiState
  apiActions: ApiActions
}

export type ApiState = {
  status: ApiStatus
  error: unknown | null
  apiKeys: ApiKey[]
  apiLogs: ApiLog[]
}

export type ApiActions = {
  fetchAndSetApiKeysToState: () => Promise<void>
  createNewApiKey: (name: string) => Promise<void>
  deleteApiKey: (key: ApiKey) => Promise<void>
  fetchAndSetApiLogsToState: () => Promise<void>
}

export type ApiKey = {
  id: string
  key: string
  iv: string
  key_hashed: string
  name: string
  enabled: boolean
  usage: number
  max_usage_limit: number
  user_id: string
  createdAt: string
}

export type ApiLog = {
  key: string
  key_name: string
  key_hashed: string
  endpoint: string
  status: string
  ip: string
  created_at: string
}
