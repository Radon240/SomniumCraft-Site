<script setup>
import Header from '@/widgets/header/Header.vue';
import Footer from '@/widgets/Footer.vue';
import {computed} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const isMainRoute = computed(() => route.path === '/main');
</script>

<template>


  <div id="app" class="w-vdw">
    <div v-show="isMainRoute" class="background-image"></div>
    <Header />
    <main>
      <transition name ="fade" mode="out-in" appear>
        <router-view />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html, body{
  width: 100%;
  margin: 0;

}
#app {

  min-width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden

}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url("@/resources/images/backgroundIce.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
}

header {
  /* Styling for the header if needed */
}

main {
  position: relative;
  min-height: 100dvh;
}

footer {

}

</style>
