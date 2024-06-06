import { enableMapSet } from 'immer'
import { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import createApiSlice from './api'
import { CombinedSlices } from './types'

enableMapSet()

const withMiddlewares = <T>(f: StateCreator<T, [['zustand/immer', never]], []>) => devtools(immer<T>(f))

export const useGlobalStore = createWithEqualityFn(
  withMiddlewares<CombinedSlices>((...args) => ({
    ...createApiSlice(...args)
  })),
  shallow
)
