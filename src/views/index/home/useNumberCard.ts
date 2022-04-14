import type { WHomeNumberCardProps } from './components/types'
import { getRandomInt } from 'easy-fns-ts'

const n = (t: number) => getRandomInt(10 ** t, 10 ** (t + 1))

const onGetCards = (
  ns: number[],
  loading: Ref<boolean>
): WHomeNumberCardProps[] => [
  {
    title: 'Vue3',
    headerExtra: {
      text: 'Day',
      tagProps: {
        type: 'primary',
        round: true,
      },
    },
    number: ns[0],
    icon: 'emojione:winking-face',
    loading: loading.value,
  },
  {
    title: 'Vite',
    headerExtra: {
      text: 'Week',
      tagProps: {
        type: 'info',
        round: true,
      },
    },
    number: ns[1],
    icon: 'emojione-v1:winking-face-with-tongue',
    loading: loading.value,
  },
  {
    title: 'TS',
    headerExtra: {
      text: 'Season',
      tagProps: {
        type: 'warning',
        round: true,
      },
    },
    number: ns[2],
    icon: 'emojione-v1:upside-down-face',
    loading: loading.value,
  },
  {
    title: 'NaiveUI',
    headerExtra: {
      text: 'Month',
      tagProps: {
        type: 'error',
        round: true,
      },
    },
    number: ns[3],
    icon: 'emojione-v1:thinking-face',
    loading: loading.value,
  },
  {
    title: 'Vueuse',
    headerExtra: {
      text: 'Year',
      tagProps: {
        type: 'warning',
        round: true,
      },
    },
    number: ns[4],
    icon: 'emojione-v1:smiling-face-with-heart-eyes',
    loading: loading.value,
  },
  {
    title: 'Nestjs',
    headerExtra: {
      text: 'Decade',
      tagProps: {
        type: 'info',
        round: true,
      },
    },
    number: ns[5],
    icon: 'emojione-v1:smiling-face-with-sunglasses',
    loading: loading.value,
  },
]

export const useNumberCard = () => {
  const cards = ref<WHomeNumberCardProps[]>(Array.from({ length: 6 }))
  const loading = ref(false)

  const onCallApi = (): Promise<number[]> => {
    return new Promise((res) => {
      setTimeout(() => {
        res([n(6), n(3), n(4), n(5), n(2), n(7)])
      }, 2000)
    })
  }

  const { pause, resume, isActive } = useIntervalFn(
    async () => {
      loading.value = true
      const res = await onCallApi()
      cards.value = onGetCards(res, loading)
      loading.value = false
    },
    10000,
    { immediate: true, immediateCallback: true }
  )

  return { cards, loading }
}
