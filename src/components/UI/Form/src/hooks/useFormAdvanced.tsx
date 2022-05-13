import type { WForm } from '../types'
import type { DrawerProps } from 'naive-ui'

export const useFormAdvanced = (
  render: Fn,
  props: ComputedRef<WForm.Props>,
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>
) => {
  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  const show = ref(false)
  const loading = ref(false)

  const done = () => (loading.value = false)

  const onOpen = async (beforeHook?: Fn) => {
    loading.value = true

    await beforeHook!(done)

    show.value = true
  }

  const onClose = () => {
    show.value = false

    return false
  }

  const onYes = async () => {
    await formRef.value!.validate()

    loading.value = true

    // if error, we want loading stop, but drawer do not disappear
    // so `loading.value = false` is always excuting
    // only when have ret, close drawer and show message
    const apiHandler = async (apiFn: Fn, params: Recordable) => {
      try {
        const ret = await apiFn(params)

        if (ret) {
          onClose()
          AppSuccess()
        } else {
          return Promise.reject()
        }
      } finally {
        done()
      }
    }

    props.value.advancedProps?.onYes(apiHandler, () => {
      done()
      onClose()
    })
  }

  const onNo = () => {
    if (!props.value.useDescription) {
      formRef.value!.restoreValidation()
    }
    props.value.advancedProps?.onNo(onClose)
  }

  const onGetTitle = (title: string) => {
    const uniqueKey = props.value.localeUniqueKey

    if (props.value.useDescription && uniqueKey) {
      return (
        t(`table:${uniqueKey}:advancedTitle`) + ' ' + t('app:button:detail')
      )
    }

    const actionType = unref(props.value?.advancedProps?.actionType)

    return uniqueKey && actionType
      ? t(`app:button:${actionType}`) +
          ' ' +
          t(`table:${uniqueKey}:advancedTitle`)
      : title
  }

  const renderAdvanced = () => {
    if (props.value.preset === 'modal') {
      return (
        <w-modal
          v-model={[show.value, 'show']}
          title={onGetTitle(props.value.advancedProps?.title as string)}
          maskClosable={
            props.value.advancedProps?.maskClosable && !loading.value
          }
          closable={!loading.value}
          onYes={onYes}
          onNo={onNo}
          loading={loading.value}
          defaultButton={props.value.advancedProps?.defaultButton}
          closable={props.value.advancedProps?.closable}
        >
          {render()}
        </w-modal>
      )
    }

    if (props.value.preset === 'drawer') {
      return (
        <w-drawer
          v-model={[show.value, 'show']}
          title={onGetTitle(props.value.advancedProps?.title as string)}
          width={(props.value.advancedProps as DrawerProps)?.width}
          maskClosable={
            props.value.advancedProps?.maskClosable && !loading.value
          }
          onUpdateShow={(show: boolean) => {
            !show && onNo()
          }}
          onYes={onYes}
          onNo={onNo}
          loading={loading.value}
          defaultButton={props.value.advancedProps?.defaultButton}
          closable={props.value.advancedProps?.closable}
        >
          {render()}
        </w-drawer>
      )
    }
  }

  return {
    onOpen,
    onClose,
    onYes,
    onNo,
    renderAdvanced,
  }
}
