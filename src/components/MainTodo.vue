<script setup lang="ts">
import { ref } from 'vue'
// 編集用の設定
const isEdit = ref(false)
let editId = -1

const todo = ref('')
const todoList = ref<{ id: number; task: string }[]>([])

const ls = localStorage.todoList
todoList.value = ls ? JSON.parse(ls) : []

const addTodo = () => {
  const id = new Date().getTime() //IDは仮でデータ登録時刻を設定
  todoList.value.push({ id: id, task: todo.value })
  localStorage.todoList = JSON.stringify(todoList.value)

  todo.value = ''
}

const showTodo = (id: number) => {
  const findTodo = todoList.value.find((todo) => todo.id == id)

  if (findTodo) {
    todo.value = findTodo.task
    isEdit.value = true
    editId = id
  }
}

const editTodo = () => {
  // 編集対象のTODOとindexを取得
  const findTodo = todoList.value.find((todo) => todo.id == editId)
  const idx = todoList.value.findIndex((todo) => todo.id === editId)

  // 編集後の内容で更新
  if (findTodo) {
    findTodo.task = todo.value
    todoList.value.splice(idx, 1, findTodo)

    localStorage.todoList = JSON.stringify(todoList.value)

    //初期値に戻す
    isEdit.value = false
    editId = -1
    todo.value = ''
  }
}
</script>
<template>
  <div>
    <input type="text" class="todo_input" v-model="todo" placeholder="+ TODOを入力" />
    <button class="btn green" @click="editTodo" v-if="isEdit">変更</button>
    <button class="btn" @click="addTodo" v-else>追加</button>
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoList" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <div class="btn green" @click="showTodo(todo.id)">編</div>
        <div class="btn pink">削</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo_input {
  width: 250px;
  padding: 6px 8px;
  margin-right: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.btn {
  position: relative;
  padding: 6px 8px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: #03a9f4;
  border: 1px solid #eee;
  border-radius: 6px;
}
.btn:active {
  top: 1px;
}
.box_list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
}
.todo_list {
  display: flex;
  gap: 8px;
  align-items: center;
}
.todo {
  width: 250px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.check {
  margin-right: 12px;
  transform: scale(1.6);
}
.btns {
  display: flex;
  gap: 4px;
}
.green {
  background-color: #00c853;
}
.pink {
  background-color: #ff4081;
}
</style>
