import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './accounts/authSlice';
import profileReducer from './accounts/profileSlice';
import roleReducer from './accounts/roleSlice';
import personReducer from './accounts/personSlice';

import warehouseReducer from './inventory/warehouseSlice';
import locationReducer from './inventory/locationSlice';
import categoryReducer from './inventory/categorySlice';
import productReducer from './inventory/productSlice';
import inventoryReducer from './inventory/inventorySlice';
import inventoryTransactionReducer from './inventory/inventoryTransactionSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    role: roleReducer,
    person: personReducer,

    warehouse: warehouseReducer,
    location: locationReducer,
    category: categoryReducer,
    product: productReducer,
    inventory: inventoryReducer,
    inventoryTransaction: inventoryTransactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
