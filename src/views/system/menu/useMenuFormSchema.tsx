import type { WForm } from '/@/components/UI/Form'

import { findPath } from 'easy-fns-ts'

import { getViewsOptions, menuTernalOptions, menuTypeOptions } from './utils'

export const useMenuFormSchema = (
  actionType: Ref<ActionType>,
  formData: Ref<RecordNullable<AppSystemMenu>>,
  treeData: ComputedRef<TreeNodeItem<AppSystemMenu>[]>
): DeepMaybeRefSelf<WForm.Schema.Item<AppSystemMenu>[]> => {
  const { getLocaleMessage, locale } = useAppI18n()

  const { viewOptions, nameOptions } = getViewsOptions()

  // get title list from locale message
  // key start with `sys:menu` are all menu title
  const getTitleList = computed(() =>
    Object.entries<string>(getLocaleMessage(locale.value))
      .map(([k, v]) => {
        if (k.startsWith('sys:menu:')) {
          return { value: k, label: v }
        }
        return { value: undefined, label: undefined }
      })
      .filter((i) => i.value)
  )

  // get node item from tree data
  const getCurrentNode = computed(
    () =>
      treeData.value &&
      findPath<AppSystemMenu>(
        treeData.value,
        (n) => n._id === formData.value.pid
      )
  )

  // for path prefix, better experience
  const getRoutePathPrefix = computed(() =>
    !getCurrentNode.value
      ? '/'
      : (getCurrentNode.value as AppSystemMenu[])
          .map((item) => item.path)
          .join('/') + '/'
  )

  // get tree select expanded keys
  const getTreeSelectExpandKeys = computed(() =>
    (getCurrentNode.value as AppSystemMenu[])?.map((i) => i._id!)
  )

  return [
    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form:menu:divider1',
      },
    },

    {
      type: 'Base:Render',
      formProp: {
        path: 'type',
      },
      componentProp: {
        render: ({ formData }) => {
          if (actionType.value === 'create' || !actionType.value) {
            return (
              <w-radio
                v-model={[formData.type, 'value']}
                options={menuTypeOptions}
              >
                {formData.type}
              </w-radio>
            )
          }

          if (actionType.value === 'update') {
            return (
              <n-tag
                type={
                  formData.type === 'menu'
                    ? 'success'
                    : formData.type === 'element'
                    ? 'warning'
                    : 'info'
                }
              >
                {formData.type}
              </n-tag>
            )
          }
        },
      },
    },

    {
      type: 'Base:TreeSelect',
      formProp: {
        path: 'pid',
      },
      componentProp: {
        // @ts-ignore
        options: treeData,
        keyField: '_id',
        labelField: 'title',
        // @ts-ignore
        expandedKeys: getTreeSelectExpandKeys,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'status',
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form:menu:divider2',
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'path',
      },
      componentProp: {
        clearable: true,
        prefix: getRoutePathPrefix,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    // when type is `catalog`, it's just input
    // when type is `menu`, it's select
    {
      type: 'Base:Render',
      formProp: {
        path: 'name',
        labelHelpMessage: true,
        baseRuleApplied: true,
      },
      componentProp: {
        render: ({ formData }) => {
          if (
            formData.type === MenuTypeConst.CATALOG ||
            formData.ternal !== MenuTernalConst.NONE
          ) {
            return (
              <w-input
                v-model={[formData.name, 'value']}
                clearable
                valueModifiers={{ capitalize: true }}
              />
            )
          }

          if (
            formData.type === MenuTypeConst.MENU &&
            formData.ternal === MenuTernalConst.NONE
          ) {
            return (
              <n-select
                v-model={[formData.name, 'value']}
                clearable
                filterable
                disabled
                options={nameOptions}
              />
            )
          }
        },
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    // Auto bump `views` children vue file
    // To avoid to appear in options, you can set `defaultView: false` in the same level of `setup`
    {
      type: 'Base:Select',
      formProp: {
        path: 'component',
        labelHelpMessage: true,
      },
      componentProp: {
        clearable: true,
        options: viewOptions,
        filterable: true,
        onUpdateValue: (val: string) => {
          // Get the name property automatically from vue `name` property
          const target = viewOptions.find((item) => item.value === val)
          formData.value.name = target?.name
        },
      },
      extraProp: {
        vIf: ({ formData }) =>
          formData.type === MenuTypeConst.MENU &&
          formData.ternal === MenuTernalConst.NONE,
      },
    },

    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form:menu:divider3',
      },
    },

    {
      type: 'Base:Select',
      formProp: {
        path: 'title',
        labelHelpMessage: true,
      },
      componentProp: {
        clearable: true,
        filterable: true,
        options: getTitleList.value,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    {
      type: 'Extend:IconPicker',
      formProp: {
        path: 'icon',
        baseRuleApplied: true,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type !== MenuTypeConst.ELEMENT,
      },
    },

    {
      type: 'Base:InputNumber',
      formProp: {
        path: 'order',
      },
      componentProp: {
        clearable: true,
      },
    },

    {
      type: 'Base:Radio',
      formProp: {
        path: 'ternal',
      },
      componentProp: {
        options: menuTernalOptions,
      },
      extraProp: {
        vIf: ({ formData }) =>
          formData.type === MenuTypeConst.MENU && actionType.value === 'create',
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'url',
      },
      componentProp: {
        clearable: true,
      },
      extraProp: {
        vIf: ({ formData }) =>
          formData.type === MenuTypeConst.MENU &&
          formData.ternal !== MenuTernalConst.NONE,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'cache',
        labelHelpMessage: true,
        rule: false,
      },
      extraProp: {
        vIf: ({ formData }) =>
          formData.type === MenuTypeConst.MENU &&
          formData.ternal === MenuTernalConst.NONE,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'show',
        labelHelpMessage: true,
        rule: false,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type === MenuTypeConst.MENU,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'affix',
        labelHelpMessage: true,
        rule: false,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type === MenuTypeConst.MENU,
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'permission',
        rule: false,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type === MenuTypeConst.ELEMENT,
      },
    },

    {
      type: 'Base:Select',
      formProp: {
        path: 'menuActiveName',
        rule: false,
      },
      componentProp: {
        options: nameOptions,
        filterable: true,
        clearable: true,
      },
      extraProp: {
        vIf: ({ formData }) => formData.type === MenuTypeConst.MENU,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'menuActiveSameTab',
        rule: false,
      },
      extraProp: {
        vIf: ({ formData }) =>
          formData.type === MenuTypeConst.MENU && !!formData.menuActiveName,
      },
    },
  ]
}
