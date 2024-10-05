import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest:{
    name: 'LinkedIn AI Reply',
    description: 'Assists in generating replies to LinkedIn messages',
    version: '1.0',
    permissions: ['activeTab'],
    "host_permissions": ["*://*/*"]
  }
});
