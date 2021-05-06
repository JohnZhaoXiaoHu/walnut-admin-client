declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type Recordable<T extends any = any> = Record<string, T>

declare type ReadonlyRecordable<T extends any = any> = {
  readonly [key: string]: T
}

declare type Nullable<T> = T | null

declare type BaseDataType = string | number | boolean

/**
 * @description v-for index type
 */
declare type IndexType = string | number | symbol

/**
 * @description type for empty object
 */
declare type EmptyObject = Record<string, never>

/**
 * @description type for any object
 */
declare type AnyObject = Record<string, unknown>

/**
 * @description used for setup prop type
 */
declare type SetupProp<T> = Readonly<
  EmptyObject & {
    item?: T | undefined
  }
>

/**
 * @description Used for components with `options` API.
 * Default value field is `value` and label field is `label`
 *
 * @example
 *
 * Default: const options1: BaseOptionItemType[] = [{ value: 'foo', label: 'bar' }]
 * Custom:  const options2: BaseOptionItemType<'value1', 'label1'>[] = [{ value1: 'foo', label1: 'bar' }]
 */
declare type BaseOptionItemType<
  V extends string = 'value',
  L extends string = 'label',
  E extends Record = any
> = Record<V, BaseDataType> & Record<L, string> & Partial<E>

/**
 * @description Filter wanted type fields
 * @example
 *
 * interface Thing {
 *   id: string;
 *   price: number;
 *   other: { stuff: boolean };
 *   test: string
 * }
 *
 * KeysMatching<Thing, string>  =====>  'id' | 'test'
 *
 */
type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T]

// Some types relative to ElementPlus
declare type ComponentSize = 'medium' | 'small' | 'mini'

declare type ComponentType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

declare type ComponentPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

declare type ComponentTrigger = 'hover' | 'click' | 'contentmenu'
