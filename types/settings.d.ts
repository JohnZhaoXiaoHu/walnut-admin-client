/**
 * https://github.com/YousefED/typescript-json-schema
 * this interface is also used to generate json schema
 * if change this file, please in terminal run `npm run gen:schema` to generate `settings.json` VS Code support
 * all types below must be explicit import, no auto-import or global usage
 */
import { ValueOfAppConstTransitionName } from '../src/const/transition'
import {
  ValueOfAppConstLayoutMode,
  ValueOfAppConstCollapseMode,
  ValueOfAppConstBasicMode,
  ValueOfAppConstColorMode,
  ValueOfAppConstLockMode,
  ValueOfAppConstRouteQueryMode,
  ValueOfAppConstRouteQueryEnhancedMode,
} from '../src/const/app'
import {
  ValueOfAppConstTabUtilsShowMode,
  ValueOfAppConstTabCloseMode,
  ValueOfAppConstTabAffixMode,
  ValueOfAppConstTabStyleMode,
} from '../src/const/tab'

interface AppSettingsForApp {
  /**
   * App Layout
   * @default left-menu
   */
  layout: ValueOfAppConstLayoutMode

  /**
   * Keep Alive component, vue features
   * @default true
   */
  keepAlive: boolean

  /**
   * Content padding px
   * @default 2
   */
  contentPadding: number

  /**
   * Rotue Query Features
   * 'normal' => no change to route query
   * 'enhanced' => make route query unreadable
   * @default normal
   */
  routeQueryMode: ValueOfAppConstRouteQueryMode

  /**
   * Route Query Enhanced Mode
   * Only works when `routeQueryMode` => 'enhanced'
   * 'base64' => stringify and transform to base64
   * 'cryptojs' => use `crypto-js` to encrypt/decrypt route query
   * @default base64
   */
  routeQueryEnhancedMode: ValueOfAppConstRouteQueryEnhancedMode

  /**
   * Transition Component, vue features
   * @default true
   */
  transitionStatus: boolean

  /**
   * Transition Mode
   * 'global' => use `transitionName` for transition name
   * 'scope' => use the transition info in route `meta` object
   * @default scope
   */
  transitionMode: ValueOfAppConstBasicMode

  /**
   * Global Transition Name
   * Only works when `transitionMode` => 'global'
   * @default fade
   */
  transitionName: ValueOfAppConstTransitionName

  /**
   * Watermark features on use or not
   * @default true
   */
  watermarkStatus: boolean

  /**
   * Watermark Mode
   * 'global' => use `watermarkContent` for watermark content
   * 'scope' => use the watermark info in route `meta` object
   * @default scope
   */
  watermarkMode: ValueOfAppConstBasicMode

  /**
   * Global Watermark Content
   * Only works when `watermarkMode` => 'global'
   * @default walnut-admin
   */
  watermarkContent: string

  /**
   * Lock Features on use or not
   * @default true
   */
  lockStatus: boolean

  /**
   * Lock Mode
   * 'default' => user can manually to lock tha application
   * 'security' => more secure usage, app would lock when user's mouse leave the app or change the browser/system tabs
   * 'idle' => app would auto lock when user is idle for some time
   * @default default
   */
  lockMode: ValueOfAppConstLockMode

  /**
   * User inactive seconds to lock app
   * @default 5
   */
  lockIdleSeconds: number

  /**
   * More UX config, just different css tricks to fitler the app in view
   * @default default
   */
  colorMode: ValueOfAppConstColorMode

  /**
   * More UX config, for those who cannot see animation viewing the internet
   * @default false
   */
  reducedMotion: boolean

  /**
   * TODO
   * More UX config, should provide several configs like 10px/12px/14px/16px/18px/20px
   * @default 16
   */
  // baseFontSize: number

  // TODO
  // iframe config
  // hijack f5
}

interface AppSettingsForTheme {
  light: {
    primaryColor: string
    infoColor: string
    successColor: string
    warningColor: string
    errorColor: string
    bodyColor: string
    invertedColor: string
  }
  dark: {
    primaryColor: string
    infoColor: string
    successColor: string
    warningColor: string
    errorColor: string
    bodyColor: string
    invertedColor: string
  }
}

interface AppSettingsForLogo {
  /**
   * Dom id
   */
  id: string

  /**
   * True => fixed, false => normal
   */
  fixed: boolean

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Logo transition name
   */
  transition: ValueOfAppConstTransitionName
}

interface AppSettingsForHeader {
  /**
   * Dom id
   */
  id: string

  /**
   * True => fixed, false => normal
   */
  fixed: boolean

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Header transition name
   */
  transition: ValueOfAppConstTransitionName

  /**
   * Header inverted
   */
  inverted: boolean

  /**
   * Header height
   */
  height: number

  /**
   * Header utils - full screen visibility
   */
  fullscreen: boolean

  /**
   * Header utils - search visibility
   */
  search: boolean
}

interface AppSettingsForTabs {
  /**
   * Dom id
   */
  id: string

  /**
   * True => fixed, false => normal
   */
  fixed: boolean

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Tabs inverted
   */
  inverted: boolean

  /**
   * Tabs transition name
   */
  transition: ValueOfAppConstTransitionName

  /**
   * Tab height
   */
  height: number

  /**
   * Tab item width
   */
  itemWidth: number

  /**
   * Tab icon visibility
   */
  showIcon: boolean

  /**
   * Tab aside utils visibility
   */
  showUtils: boolean

  /**
   * Tab aside utils display mode
   */
  utilsMode: ValueOfAppConstTabUtilsShowMode

  /**
   * Tab context menu visibility
   */
  contextMenu: boolean

  /**
   * Tab sortable
   */
  sortable: boolean

  /**
   * Tab style mode
   */
  styleMode: ValueOfAppConstTabStyleMode

  /**
   * With persistent support
   */
  persistent: boolean

  /**
   * Tab item animation name
   */
  itemTransition: ValueOfAppConstTransitionName

  /**
   * Tab close mode
   */
  closeMode: ValueOfAppConstTabCloseMode

  /**
   * Tab affix mode
   */
  affixMode: ValueOfAppConstTabAffixMode
}

interface AppSettingsForBreadcrumb {
  /**
   * Dom id
   */
  id: string

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Breadcrumb transition name
   */
  transition: ValueOfAppConstTransitionName

  /**
   * Breadcrumb icon visibility
   */
  showIcon: boolean

  /**
   * Breadcrumb dropdown visibility
   */
  showDropdown: boolean

  /**
   * Breadcrumb custom separator
   */
  separator: string
}

interface AppSettingsForMenu {
  /**
   * Dom id
   */
  id: string

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Menu transition name
   */
  transition: ValueOfAppConstTransitionName

  /**
   * Menu inverted color
   */
  inverted: boolean

  /**
   * When app layout is `left-menu`, menu width
   */
  width: number

  /**
   * Menu accordion
   */
  accordion: boolean

  /**
   * Menu icon size
   */
  iconSize: number

  /**
   * Menu indent
   */
  indent: number

  /**
   * Show collapse button
   */
  collapseStatus: boolean

  /**
   * Menu collapsed icon size
   */
  collapsedIconSize: number

  /**
   * Menu Collapse Mode
   */
  collapseMode: ValueOfAppConstCollapseMode

  /**
   * When app layout is `left-menu`, menu collapsed width
   */
  collapsedWidth: number
}

interface AppSettingsForFooter {
  /**
   * Dom id
   */
  id: string

  /**
   * True => fixed, false => normal
   */
  fixed: boolean

  /**
   * True => using, false => hidden
   */
  status: boolean

  /**
   * Footer inverted
   */
  inverted: boolean

  /**
   * Footer transition name
   */
  transition: ValueOfAppConstTransitionName

  /**
   * Footer height
   */
  height: number

  /**
   * Footer content
   */
  content: string
}

interface AppSettings {
  app: AppSettingsForApp

  themes: AppSettingsForTheme

  logo: AppSettingsForLogo

  header: AppSettingsForHeader

  tabs: AppSettingsForTabs

  breadcrumb: AppSettingsForBreadcrumb

  menu: AppSettingsForMenu

  footer: AppSettingsForFooter
}
