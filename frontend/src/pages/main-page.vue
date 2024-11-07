<template>
  <main>
    <div class="top-content">
      <span>SomniumCraft</span>
      <div class="button-container">
        <a href="https://discord.com/invite/CEDEQU6n6Y" id="start-play" target="_blank">Начать играть</a>
        <button id="ip-server" @click="copyIP">ip:play.somnium-craft.su</button>
      </div>
    </div>
    <div class="features-content">
      <News />
      <Blog/>


    </div>
    <!-- Кастомное уведомление -->
    <div v-if="showNotification" class="custom-toast">
      IP адрес скопирован!
    </div>
  </main>
</template>

<script>
import News from '@/features/news/news.vue';
import Blog from '@/features/blog/blog.vue';

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



main {
  width: 100%;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  position: absolute;
  flex-direction: column;
  flex-grow: 1;
}

main .top-content {
  position: static;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: calc(var(--font-size-button) * 4);
  width: 100%;
  z-index: 10;
  min-height: 60vh;
  background-color: rgba(4, 4, 4, 0.4);
  backdrop-filter: blur(4px);


}

main .top-content .button-container {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 2rem;
}

main .top-content .button-container button,
main .top-content .button-container a {
  font-style: normal;
  text-decoration: none;
  font-size: calc(var(--font-size-button));
  font-weight: 600;
  padding: calc(var(--font-size-button) * 0.7) calc(var(--font-size-button) * 1.5);
  border: 0;
  border-radius: 30px;
  display: inline-block;
  box-shadow: inset 0 -2px 15px -9px #2D2D2D;
  cursor: pointer;
}

main .top-content .button-container button:hover {
  -webkit-filter: brightness(115%);
  transition: all 1s ease;
}

#start-play {
  background: #649bff linear-gradient(to right, #649bff, #3f6bbb);
  color: #fff;
}

#ip-server {
  background: #1a1c25 linear-gradient(to right, #1a1c25, #222532);
  color: #fff;
}

main .features-content {
  background-color: var(--background);
  max-height: 10%!important;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-right: 10rem;
  padding-left: 10rem;
  padding-bottom: 5%;
  gap: 3rem;
}

.custom-toast {
  position: fixed;
  bottom: var(--font-size-button);
  left: 50%;
  transform: translateX(-50%) translateY(50px);
  /* background-color: rgba(29, 30, 38, 0.7); */
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: calc(var(--font-size-button) / 2) calc(var(--font-size-button) * 2);
  border-radius: calc(var(--font-size-button) * 2);
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
  :root {
    --font-size-button: 1.5rem;
  }
  .custom-toast {
    font-size: 90%;
  }


}

@media (max-width: 770px) {
  :root {
    --font-size-button: 0.8rem;
  }
  .custom-toast {
    font-size: 70%;
  }
}
</style>
