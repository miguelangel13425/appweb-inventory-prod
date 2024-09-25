import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import warehouseReducer from './warehouseSlice';

const accountsReducer = combineReducers({
    auth: authReducer,
})

const inventoryReducer = combineReducers({
    warehouse: warehouseReducer,
});

const rootReducer = combineReducers({
    accounts: accountsReducer,
    inventory: inventoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;