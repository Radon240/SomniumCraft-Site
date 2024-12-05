<template>
  <main class="w-full flex justify-start items-start flex-col flex-grow-1 relative">
    <div class="top-content w-full static flex flex-col justify-center items-center text-white/90 z-10 bg-backgroundMainPage-100/40 backdrop-blur-sm ">
      <span class="font-bold">SomniumCraft</span>
      <div class="button-container flex justify-center items-center gap-8">
        <a href="https://discord.com/invite/CEDEQU6n6Y" id="start-play" target="_blank"
        class="non-italic border-0 inline-block cursor-pointer font-bold">Начать играть</a>
        <button id="ip-server" @click="copyIP"
                class="non-italicborder-0 inline-block cursor-pointer font-bold">
          <p>IP : play.somnium-craft.su</p></button>
      </div>
    </div>
    <div class="features-content bg-background w-full min-h-screen flex justify-center gap-12">
      <News />
      <Blog/>


    </div>
    <!-- Кастомное уведомление -->
    <div v-if="showNotification" class="custom-toast font-semibold">
      IP адрес скопирован!
    </div>
  </main>
</template>

<script>
import News from '@/features/news/news.vue';
import Blog from '@/features/chat/chat.vue';

export default {
  components: {Blog, News},
  data() {
    return {
      showNotification: false
    };
  },
  methods: {
    copyIP() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('play.somnium-craft.su')
            .then(() => {
              console.log("IP скопирован!");

              // Показать уведомление
              this.showNotification = true;

              // Убрать уведомление с анимацией через 1.5 секунды
              setTimeout(() => {
                const toast = document.querySelector('.custom-toast');
                if (toast) {
                  toast.classList.add('fade-out');
                }
              }, 1500);

              // Полностью скрыть уведомление после завершения анимации
              setTimeout(() => {
                this.showNotification = false;
              }, 2000);
            })
            .catch(err => {
              console.error("Ошибка при копировании: ", err);
            });
      }
      // Если Clipboard API не поддерживается, ничего не выполняется.
    }

  }
}
</script>

<style>

.top-content{
  --font-size-button:  1.3rem;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  border: none;
  outline: none;
  text-decoration: none;
  list-style: none;
  text-transform: none;
}

html {
  height: 100%;
  margin: 0;
}

.top-content {
  font-size: calc(var(--font-size-button) * 4);
  min-height: 60lvh;
}

.button-container button,
.button-container a {
  font-size: calc(var(--font-size-button));
  padding: calc(var(--font-size-button) * 0.7) calc(var(--font-size-button) * 1.5);
  border-radius: 30px;
  box-shadow: inset 0 -2px 15px -9px #2D2D2D;
  transition: filter 1s ease;
}

.button-container button:hover, .button-container a:hover {
  filter: brightness(115%);
  -webkit-filter: brightness(115%);
  transition: filter 1s ease;
}

#start-play {
  background: #649bff linear-gradient(to right, #649bff, #3f6bbb);
  color: #fff;
}

#ip-server {
  background: #1a1c25 linear-gradient(to right, #1a1c25, #222532);
  color: #fff;
}

.features-content {
  padding-left: 10rem;
  padding-right: 10rem;
  padding-bottom: 5%;
}
.custom-toast {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(50px);
  /* background-color: rgba(29, 30, 38, 0.7); */
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: calc(1.3rem / 2) calc(1.3rem * 2);
  border-radius: calc(1.3rem * 2);
  box-shadow: var(--box-shadow);
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 9999;
  animation: fadeIn 0.5s ease forwards;
  backdrop-filter: blur(5px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(50px);
  }
}

.custom-toast.fade-out {
  animation: fadeOut 0.5s ease forwards;
}

@media (max-width: 1200px) {
  html {
    font-size: 62%;
  }
  .top-content {
    --font-size-button: 1.5rem;
  }
  .custom-toast {
    font-size: 90%;
  }


}
@media (max-width: 1024px) {
  .features-content{
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100vw;
    padding: 0;

  }

}
@media (max-width: 770px) {
  .top-content {
    --font-size-button: 0.9rem;
  }
  .custom-toast {
    font-size: 70%;
  }
}
</style>
