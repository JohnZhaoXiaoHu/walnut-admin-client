import type { UserInfoType } from './types/user'

export interface AppStorage {
  app: {
    isDark: boolean
    darkMode: ValueOfDarkModeConst
    locale: ValueOfLocaleConst
    isLock: boolean
    lockMode: ValueOfAppLockModeConst
  }

  token: string

  auth: {
    username?: string
    password?: string
  }
}

export interface AppMemory {
  appMemo: {
    collapse: boolean
    device: ValueOfDevideConst
    isMobile: boolean
    showAside: boolean
  }

  menu: {
    menus: AppMenu[]
    keepAliveRouteNames: string[]
    indexMenuName: string
    permissions: string[]
  }

  user: {
    userInfo: Partial<UserInfoType>
  }

  tab: {
    tabs: AppTab[]
    visitedTabs: Map<string, string[]>
  }

  settings: {
    ForDevelopers: AppSettings

    ForUsers: {}
  }
}
