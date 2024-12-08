<script setup>

</script>

<template>
  <div class="container container404 flex flex-col gap-10 justify-start  items-center h-screen absolute left-0 right-0 to">
    <h3 class="font-semibold text-9xl mt-[10%] no-select w-full text-center">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> 404</h3>
    <h2 class="font-normal text-4xl text-center no-select w-full">Извините, но такой страницы не существует</h2>
    <router-link to="/main" id="on-main" class="no-select">На главную</router-link>
  </div>

</template>

<style scoped>
*{
  font-family: "Roboto", sans-serif;
}
.container404{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  --font-size-button:  1.3rem;

}
.container404 a {
  font-size: calc(var(--font-size-button));
  padding: calc(var(--font-size-button) * 0.7) calc(var(--font-size-button) * 1.5);
  border-radius: 30px;
  box-shadow: inset 0 -2px 15px -9px #2D2D2D;
  transition: filter 1s ease;
}

.container404 a:hover {
  filter: brightness(115%);
  -webkit-filter: brightness(115%);
  transition: filter 1s ease;
}
#on-main {
  background: #649bff linear-gradient(to right, #649bff, #3f6bbb);
  color: #fff;
}
</style>