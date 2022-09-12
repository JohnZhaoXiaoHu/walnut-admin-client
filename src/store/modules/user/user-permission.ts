import { defineStore } from 'pinia'
import { StoreKeys } from '../../constant'
import { store } from '../../pinia'

const useAppStoreUserPermissionInside = defineStore(StoreKeys.USER_PERMISSION, {
  state: (): UserPermissionState => ({
    permissions: [],
  }),

  getters: {},

  actions: {
    setPermissions(payload: string[]) {
      this.permissions = payload
    },

    createPermissions(payload: AppSystemMenu[]): string[] {
      return payload.map((i) => i.permission!).filter((i) => i)
    },

    clearPermissions() {
      this.setPermissions([])
    },

    hasPermission(payload?: string) {
      if (!payload) return true
      // TODO
      const appPermissionMode = 'eleShow'
      return (
        appPermissionMode === 'eleShow' || this.permissions.includes(payload)
      )
    },
  },
})

const useAppStoreUserPermissionOutside = () =>
  useAppStoreUserPermissionInside(store)

export const useAppStoreUserPermission = () => {
  if (getCurrentInstance()) return useAppStoreUserPermissionInside()
  return useAppStoreUserPermissionOutside()
}
