import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createCartSlice } from './cartSlice'
import { StoreTypes } from './storeTypes'
import { createThemeSlice } from './themeSlice'

export const useStore = create<StoreTypes>()(
  devtools((...a) => ({
    ...createThemeSlice(...a),
    ...createCartSlice(...a),
  })),
)
