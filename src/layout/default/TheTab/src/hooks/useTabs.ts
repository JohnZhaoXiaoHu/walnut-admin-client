import type { WScrollbarRef } from '/@/components/Extra/Scrollbar'

import { onLeaveRoomForTabs, createTab } from '../utils'
import { buildTabs } from '/@/core/tab'

/**
 * @description App Tab Core Function
 */
export const useTabs = () => {
  const { app, tab } = useAppState()

  const route = useAppRoute()
  const { currentRoute } = useAppRouter()

  const scrollRef = ref<Nullable<WScrollbarRef>>(null)

  const getCurrentRouteTabIndex = computed(() =>
    tab.value.tabs.findIndex((item) => item.name === currentRoute.value.name)
  )

  const onScrollToCurrentTab = () => {
    // scroll by index
    nextTick(() => {
      // If is mobile, just scroll to current route tab index
      scrollRef.value?.scrollToIndex(
        app.value.isMobile
          ? getCurrentRouteTabIndex.value
          : onLeaveRoomForTabs(getCurrentRouteTabIndex.value)
      )
    })
  }

  watchEffect(() => {
    // Build tab
    buildTabs(createTab(route))

    // set currentRouteName
    tab.value.currentRouteName = route.name as string

    // Scroll
    // Trick to trigger the scroll
    app.value.device && onScrollToCurrentTab()
  })

  onMounted(() => {
    tab.value.targetTab = createTab(route)
    tab.value.targetTabIndex = tab.value.tabs.findIndex(
      (i) => i.name === tab.value.targetTab?.name
    )
  })

  return { scrollRef, getCurrentRouteTabIndex }
}
