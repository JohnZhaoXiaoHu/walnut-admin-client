import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
import { menuAPI } from '/@/api/system/menu'

export const useMenuTree = () => {
  const rootId = ref<string>()
  const menuTreeData = ref<TreeNodeItem<AppMenu>[]>([])

  const onInit = async () => {
    const res = await menuAPI.list()

    // build, order and format
    const data = formatTree<AppMenu>(
      orderTree<AppMenu>(arrToTree<AppMenu>(res.data, { id: '_id' })),
      {
        format: (node) =>
          node.children!.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    menuTreeData.value = data[0].children!
    rootId.value = data[0]._id
  }

  onMounted(() => {
    onInit()
  })

  return { rootId, menuTreeData, onInit }
}
