import { useFullscreen as VueUseFullScreen } from '@vueuse/core'

export interface useFullScreenOptions {
  /**
   * @description Target to full screen
   */
  target?: string
}

export const useFullScreen = (opt: useFullScreenOptions) => {
  const el = document.querySelector(opt.target!)
  const { isFullscreen, toggle } = VueUseFullScreen(el)

  return {
    isFullscreen,
    toggleFullScreen: toggle,
  }
}
