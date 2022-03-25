import { BaseAPI } from '../base'

export const dictTypeAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/type',
})

export const dictDataAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'dict/data',
})

export type AppDictTypeCommon = Pick<
  AppSystemDictData,
  'value' | 'label' | 'description' | 'order' | 'tagType'
>[]

// default all dict will cacahed for 10 minutes
export const getDictByType = (type: string) => {
  return AppAxios.get<AppDictTypeCommon>(
    {
      url: '/system/dict/data/s/' + type,
    },
    {
      cache: true,
      cachedMiliseconds: 600 * 1000,
    }
  )
}
