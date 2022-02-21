import { dictDataAPI } from '/@/api/system/dict'

export const useDictDataRegister = (typeId: string) => {
  const { t } = useAppI18n()

  // locale unique key
  const key = 'dictData'

  const [registerDictData, { onCreateAndOpen, onReadAndOpen, onDelete }] =
    useCRUD<AppDictData>({
      baseAPI: dictDataAPI,

      tableProps: {
        localeUniqueKey: key,
        rowKey: (row) => row._id!,
        maxHeight: 600,
        striped: true,
        actionList: ['create'],

        onAction: ({ type }) => {
          switch (type) {
            case 'create':
              onCreateAndOpen()
              break

            default:
              break
          }
        },

        queryFormProps: {
          localeUniqueKey: key,
          localeWithTable: true,
          span: 8,
          showFeedback: false,
          labelWidth: 100,
          // query form schemas
          schemas: [
            {
              type: 'Base:Input',
              formProp: {
                path: 'typeId',
              },
              componentProp: {
                defaultValue: typeId,
              },
              extraProp: {
                vIf: false,
              },
            },

            {
              type: 'Base:Input',
              formProp: {
                path: 'value',
              },
              componentProp: {
                clearable: true,
              },
            },

            {
              type: 'Base:Input',
              formProp: {
                path: 'description',
              },
              componentProp: {
                clearable: true,
              },
            },

            {
              type: 'Extend:Query',
            },
          ],
        },

        columns: [
          {
            key: 'label',
            width: 120,
            extendType: 'formatter',
            formatter: (row) => t(row.label!),
          },

          {
            key: 'value',
            width: 120,
          },

          {
            ...WTablePresetOrderColumn,
            sorter: {
              multiple: 1,
            },
          },

          {
            key: 'description',
            width: 200,
          },

          {
            ...WTablePresetStatusColumn,
            sorter: {
              multiple: 2,
            },
          },

          {
            ...WTablePresetCreatedAtColumn,
            sorter: {
              multiple: 3,
            },
          },

          {
            ...WTablePresetUpdatedAtColumn,
            sorter: {
              multiple: 4,
            },
          },

          {
            key: 'action',
            width: 240,
            extendType: 'action',
            extendActionType: ['read', 'delete'],
            onRead: (row) => {
              onReadAndOpen(row._id!)
            },
            onDelete: (row) => {
              onDelete(row._id!)
            },
          },
        ],
      },

      formProps: {
        localeUniqueKey: key,
        localeWithTable: true,
        preset: 'modal',
        baseRules: true,
        labelWidth: 100,
        xGap: 0,

        // create/update form schemas
        schemas: [
          {
            type: 'Base:Input',
            formProp: {
              path: 'typeId',
            },
            componentProp: {
              clearable: true,
              defaultValue: typeId,
            },
            extraProp: {
              vShow: false,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'label',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'value',
            },
            componentProp: {
              clearable: true,
            },
          },

          {
            type: 'Base:InputNumber',
            formProp: {
              path: 'order',
            },
            componentProp: {
              clearable: true,
              defaultValue: 0,
            },
          },

          {
            type: 'Base:Switch',
            formProp: {
              path: 'status',
            },
            componentProp: {
              defaultValue: true,
            },
          },

          {
            type: 'Base:Input',
            formProp: {
              path: 'description',
              rule: false,
            },
            componentProp: {
              clearable: true,
              type: 'textarea',
            },
          },
        ],
      },
    })

  return registerDictData
}
