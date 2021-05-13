import type { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'

import { createViteProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { getEnv } from './src/utils/env'
import { getApiPrefix } from './src/utils'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = getEnv(mode, root)

  const apiPrefix = getApiPrefix(env.VITE_API_PREFIX, env.VITE_API_VERSION)

  const alias = {
    '/@': pathResolve('src'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
  }

  return {
    root,

    base: env.VITE_PUBLIC_PATH,

    define: {
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },

    plugins: createVitePlugins(mode, env),

    resolve: {
      alias: alias,
    },

    css: {},

    server: {
      port: env.VITE_PORT,

      proxy: createViteProxy({ target: env.VITE_PROXY, prefix: apiPrefix }),

      open: '/index',

      hmr: {
        overlay: false,
      },
    },

    build: {
      brotliSize: false,
      sourcemap: mode === 'staging',
      rollupOptions: {
        output: {
          // For 2.1.5 has `Maximum call stack size exceeded` error. See below.
          // https://github.com/vitejs/vite/issues/2906
          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
}
