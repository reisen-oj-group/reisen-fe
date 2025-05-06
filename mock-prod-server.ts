import { createProdMockServer } from 'vite-plugin-mock/client'

// 所有 Mock API
import mockAPI from './mock/api';

export function setupProdMockServer() {
  createProdMockServer(mockAPI)
}
