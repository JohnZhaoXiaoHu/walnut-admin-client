<script lang="ts" setup>
import UIProvider from './naive/UIProvider.vue'
import MsgProvider from './naive/MsgProvider.vue'
import ThemeProvider from './naive/AppTheme.vue'

import { useAppDarkMode } from '@/components/App/AppDarkMode/useAppDarkMode'
import { useAppLocale } from '@/components/App/AppLocalePicker/useAppLocale'
import { useAppLock } from '@/components/App/AppLock/useAppLock'
;(async function () {
  await useUseragentInfo()
  await useAppMonitor()
})()

useAppTitle()
useAppResize()
useAppDarkMode()
useAppLocale()
useAppLock()
useAppReducedMotion()
</script>

<template>
  <StarportCarrier>
    <UIProvider>
      <ThemeProvider>
        <MsgProvider>
          <RouterView />
        </MsgProvider>
      </ThemeProvider>
    </UIProvider>
  </StarportCarrier>
</template>
