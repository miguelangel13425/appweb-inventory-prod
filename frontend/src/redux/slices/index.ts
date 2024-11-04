import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './accounts/authSlice'
import userReducer from './accounts/userSlice'
import profileReducer from './accounts/profileSlice'
import roleReducer from './accounts/roleSlice'
import studentReducer from './accounts/studentSlice'
import providerReducer from './accounts/providerSlice'

import warehouseReducer from './inventory/warehouseSlice'
import locationReducer from './inventory/locationSlice'
import categoryReducer from './inventory/categorySlice'
import productReducer from './inventory/productSlice'
import inventoryReducer from './inventory/inventorySlice'
import inventoryTransactionReducer from './inventory/inventoryTransactionSlice'
import dashboardReducer from './inventory/dashboardSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  role: roleReducer,
  student: studentReducer,
  provider: providerReducer,

  warehouse: warehouseReducer,
  location: locationReducer,
  category: categoryReducer,
  product: productReducer,
  inventory: inventoryReducer,
  inventoryTransaction: inventoryTransactionReducer,
  dashboard: dashboardReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
