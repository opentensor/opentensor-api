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
  imageStudioAssets: ImageStudioAssets[]
  selectedKey: string
}

export type ApiActions = {
  fetchAndSetApiKeysToState: () => Promise<void>
  createNewApiKey: (name: string) => Promise<void>
  deleteApiKey: (key: ApiKey) => Promise<void>
  fetchAndSetApiLogsToState: () => Promise<void>
  fetchAndSetImageStudioAssetsToState: () => Promise<void>
  deleteImageStudioAsset: (asset: ImageStudioAssets) => Promise<void>
  setSelectedKey: (key: string) => void
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
  created_at: string
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

export type ImageStudioAssets = {
  id: string
  app_tag: String
  img_str: String
  user_id: string
}

export type StripePlan = {
  plans: {
    active: boolean
    aggregate_usage: string | null
    amount: number
    amount_decimal: string
    billing_scheme: string
    created: number
    currency: string
    id: string
    interval: string
    interval_count: number
    livemode: boolean
    metadata: Record<string, string>
    meter: string | null
    nickname: string | null
    object: string
    product: string
    tiers_mode: string | null
    transform_usage: string | null
    trial_period_days: number | null
    usage_type: string
  }
}
