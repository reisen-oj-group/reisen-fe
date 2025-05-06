import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 所有 Mock API
import mockAPI from './mock/api';

export function setupProdMockServer() {
  createProdMockServer(mockAPI)
}
