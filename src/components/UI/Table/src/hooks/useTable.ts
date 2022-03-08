import type { WTable } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useTable = <T>(
  props: DeepMaybeRefSelf<WTable.Props<T>>
): WTable.Hook.useTableReturnType => {
  isInSetup()

  const wTableRef = ref<Nullable<WTable.Inst.WTableInst>>(null)

  const register = (instance: WTable.Inst.WTableInst) => {
    wTableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    onApiTableList: () => wTableRef.value?.onApiTableList(),
    onApiTableDelete: (id: StringOrNumber) =>
      wTableRef.value?.onApiTableDelete(id),
    onApiTableDeleteMany: () => wTableRef.value?.onApiTableDeleteMany(),
  } as WTable.Inst.WTableInst

  return [register, methods]
}
