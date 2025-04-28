import { configureStore } from '@reduxjs/toolkit'
import slideBarSlice from './slideBarSlice'
import responseSlice from './responseSlice'
import  searchParamsSlice  from './searchParamsSlice'
// import promtSlice from './llmpromtSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        slideBar:slideBarSlice,
        response:responseSlice,
        searchParams:searchParamsSlice,
        // promt:promtSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']