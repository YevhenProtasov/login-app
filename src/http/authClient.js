import { createClient } from './index.js';

export const authClient = createClient();

authClient.interceptors.response.use((res) => {
  return res.data;
});
