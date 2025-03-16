<template>
  <div class="wrap">
    <header>ヘッダーエリア</header>
    <main class="main">メインエリア</main>
    <footer>フッターエリア</footer>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}

.main {
  flex: 1;
  pad: 16px;
}
</style>
