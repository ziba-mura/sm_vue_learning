import { ref } from 'vue'

export const useTodoList = () => {
  const todoList = ref<{ id: number; task: string }[]>([])
  const ls = localStorage.todoList

  todoList.value = ls ? JSON.parse(ls) : []

  const findById = (id: number) => {
    return todoList.value.find((todo) => todo.id == id)
  }
  const findIndexById = (id: number) => {
    return todoList.value.findIndex((todo) => todo.id == id)
  }
  const add = (task: string) => {
    const id = new Date().getTime() //IDは仮でデータ登録時刻を設定
    todoList.value.push({ id: id, task: task })

    // ローカルストレージに登録
    localStorage.todoList = JSON.stringify(todoList.value)
  }
  const editId = ref(-1)

  const show = (id: number) => {
    const todo = findById(id)
    editId.value = id
    return todo?.task
  }

  const edit = (task: string) => {
    const todo = findById(editId.value)
    const idx = findIndexById(editId.value)

    // 編集後の内容で更新
    if (todo) {
      todo.task = task
      todoList.value.splice(idx, 1, todo)

      localStorage.todoList = JSON.stringify(todoList.value)

      //初期値に戻す
      editId.value = -1
    }
  }

  // deleteは変数名に使用できないためdel
  const del = (id: number) => {
    const todo = findById(id)

    if (todo) {
      const delMsg = `「${todo.task}」を削除しますか`
      if (!confirm(delMsg)) return

      const idx = findIndexById(id)
      todoList.value.splice(idx, 1)
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  return { todoList, add, show, edit, del }
}
