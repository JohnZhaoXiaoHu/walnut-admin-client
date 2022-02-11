import AutoImport from 'unplugin-auto-import/vite'

export const creatAutoImportPlugin = (): VitePlugin => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],

    dts: 'types/auto-import.d.ts',

    imports: [
      // presets
      'vue',
      'vue-router',
      'vue-i18n',
      '@vueuse/core',

      // custom
      {
        '/@/const': [
          'DevideConst',
          'DarkModeConst',
          'LocaleConst',
          'MenuTypeConst',
          'MenuTernalConst',
          'PersistentKeysConst',
          'StorageTypeConst',
          'SymbolKeyConst',
          'TransitionNameConst',
          'DeleteTabConst',
          'MenuCollapseModeConst',
          'TabStyleModeConst',
          'AppLayoutModeConst',
          'AppLockModeConst',
        ],

        '/@/locales': ['useAppI18n', 'AppI18n'],
        '/@/router': [
          'AppRouter',
          'useAppRoute',
          'useAppRouter',
          'useRouterPush',
        ],
        '/@/store': ['useAppState'],

        '/@/hooks/core/useContext': ['useContext'],
        '/@/hooks/core/useState': ['useState'],
        '/@/hooks/component/useMessage': [
          'useAppMessage',
          'useAppNotification',
          'useAppDialog',
          'useContinue',
          'useAppMsgSuccess',
          'useAppNotiError',
        ],

        '/@/utils/axios': ['AppAxios'],
        '/@/utils/persistent': ['useAppStorage'],

        '/@/utils/log/terminal': [
          'AppTerminalLog',
          'AppTerminalInfo',
          'AppTerminalWarn',
          'AppTerminalError',
        ],
        '/@/utils/log/browser': [
          'AppBrowserLog',
          'AppBrowserInfo',
          'AppBrowserWarn',
          'AppBrowserError',
        ],
        '/@/utils/log/combine': ['AppLog', 'AppInfo', 'AppWarn', 'AppError'],

        '/@/components/UI/Form': ['useForm'],
        '/@/components/UI/Table': ['useTable'],
        '/@/components/Advanced/CRUD': ['useCRUD'],
      },
    ],
  })
}
