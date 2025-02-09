<script lang="ts" setup>
const props = defineProps({
  ...WithValueProps,

  listFn: {
    type: Function as PropType<
        (data?: WalnutBaseListParams<any>) => Promise<WalnutBaseListResponse<any>>
      >,
    required: true,
  },
  readFn: {
    type: Function as PropType<(id: StringOrNumber) => any>,
    required: true,
  },

  valueField: String as PropType<string>,
  labelField: String as PropType<string>,
})

const emit = defineEmits(['update:value'])

const loading = ref(false)
const total = ref(0)
const options = ref<OptionDataItem[]>([])
const valueOptions = ref<OptionDataItem[]>([])

const { stateRef: params, resetState } = useState<WalnutBaseListParams>({
  page: { page: 1, pageSize: 10 },
  query: {},
})

const getOptions = computed(() => valueOptions.value.concat(options.value))

const onGetOptionItem = (i: any) => ({
  value: i[props.valueField ?? 'value'],
  label: i[props.labelField ?? 'label'],
})

const onUpdateValue = async (val: StringOrNumber | StringOrNumber[]) => {
  emit('update:value', val)

  // empty value. reset to initial state and clean options
  if (!val || (val as StringOrNumber[]).length === 0)
    await onReset()

  // query is empty. reset to initial state
  if (Object.keys(params.value.query).length !== 0)
    await onReset(false)
}

const onScroll = async (e: Event) => {
  // reach bottom
  if (
  // @ts-expect-error
    e.target.firstElementChild.offsetHeight
      // @ts-expect-error
      === e.target.scrollTop + e.target.offsetHeight
  ) {
    if (params.value.page!.page! * 10 >= total.value) {
      useAppMessage().info('The End of the World')
      return
    }

    params.value.page!.page! += 1
    await onApiSelectList()
  }
}

const onApiSelectList = async (filter = false) => {
  loading.value = true

  try {
    const res = await props.listFn(params.value)

    total.value = res.total

    if (!filter) {
      options.value = options.value.concat(
        res.data
          .filter(
            i =>
              !valueOptions.value
                .map(i => i.value)
                .includes(onGetOptionItem(i).value),
          )
          .map(onGetOptionItem),
      )
    }
    else {
      valueOptions.value = valueOptions.value.concat(
        res.data.map(onGetOptionItem),
      )
    }

    loading.value = false
  }
  finally {
    loading.value = false
  }
}

const onSearch = async (query: string) => {
  params.value.page!.page = 1
  options.value.length = 0
  if (!props.multiple)
    valueOptions.value.length = 0

  params.value.query[props.labelField ?? 'label'] = query
  await onApiSelectList(true)
}

const onDebounceSearch = useDebounceFn(onSearch, 500)

const onReset = async (cleanOptions = true) => {
  if (cleanOptions) {
    options.value.length = 0
    valueOptions.value.length = 0
  }
  resetState()
  await onApiSelectList()
}

const onFeedback = async () => {
  if (props.multiple) {
    if (props.valueSeparator) {
      for (const item of (props.value as string).split(
        props.valueSeparator,
      ) as StringOrNumber[]) {
        const isExisted = options.value.some(i => i.value === item)

        if (!isExisted) {
          const res = await props.readFn(item)
          valueOptions.value = valueOptions.value.concat(onGetOptionItem(res))
        }
      }
    }
    else {
      for (const item of props.value as StringOrNumber[]) {
        const isExisted = options.value.some(i => i.value === item)

        if (!isExisted) {
          const res = await props.readFn(item)
          valueOptions.value = valueOptions.value.concat(onGetOptionItem(res))
        }
      }
    }
  }
  else {
    const isExisted = options.value.some(i => i.value === props.value)

    if (!isExisted) {
      const res = await props.readFn(props.value as StringOrNumber)
      valueOptions.value.push(onGetOptionItem(res))
    }
  }
}

onMounted(async () => {
  if (isFunction(props.listFn))
    await onApiSelectList()

  if (props.value)
    await onFeedback()
})
</script>

<script lang="ts">
import { isFunction } from '@vueuse/core'
import { WithValueProps } from '@/components/HOC/WithValue'

export default defineComponent({
  name: 'WApiSelect',
  inheritAttrs: false,
})
</script>

<template>
  <w-select
    :value="value"
    :options="getOptions"
    :multiple="multiple"
    :value-separator="valueSeparator"
    remote
    clearable
    filterable
    :loading="loading"
    @update:value="onUpdateValue"
    @scroll="onScroll"
    @search="onDebounceSearch"
  />
</template>
