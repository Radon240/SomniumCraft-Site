<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from "@/entities/Auth/AuthStore.ts";
import {keycloakService} from "@/shared/service/keycloakService.ts";

// Используем роутер
const route = useRoute();

// Получаем store из Pinia
const authStore = useAuthStore();

// Получаем nickname из store
const nickname = computed(() => authStore.username);

// Проверяем, является ли текущий маршрут частью Wiki
const isWikiRoute = computed(() =>
    route.path === '/wiki' ||
    route.path.startsWith('/categories/') ||
    route.path.startsWith('/articles/') ||
    route.path.startsWith('/review/')
);
const isPersonalAccountRoute = computed(() =>
  route.path.startsWith('/account')
);
const logout = () => {
  keycloakService.logout();
};
</script>


<template>
  <header class ="no-select fixed w-full h-20 top-0 left-0 bg-backgroundHeader/80 flex justify-between items-center z-[100] backdrop-blur-sm gap-[10%]">
    <a href="/main" class="logo text-white ">
      <div class="logo-img w-20 h-20 rounded-[2rem]">
        <img v-if="isWikiRoute" src="../../resources/images/CatHead24_nerd.svg" draggable="false"/>
        <img v-else src="../../resources/images/CatHead24.svg" draggable="false"/>
      </div>
    </a>

    <input type="checkbox" name="menu" id="menu">
    <label for="menu">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </label>
    <a href="/main" class="textLogo">
      <span class="font-semibold text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white text-nowrap">SomniumCraft</span>
    </a>

    <nav class="navbar flex gap-8">
      <router-link to="/main">Главная</router-link>
      <router-link to="/wiki">Вики</router-link>
      <a href="https://world.scmc.dev/" target="_blank">Карта</a>
      <router-link to="/rules">Правила</router-link>
      <router-link to="/other">Прочее</router-link>
    </nav>

    <div class="containerInfo w-auto">
      <!-- Аватар -->
      <div class="avatar">
        <img
            :src="authStore.isAuthenticated === false
          ? '/steve.png'
          : `https://mineskin.eu/helm/${nickname}`"
            alt="Skin"
            draggable="true"
        />
      </div>

      <!-- Приветствие -->
      <div class="info mb-2">
        <span class="hello">Приветствуем, {{ authStore.isAuthenticated === false ? 'Незнакомец' : nickname }}</span>
        <div class="buttons">
          <a v-if="authStore.isAuthenticated && !isPersonalAccountRoute"  href="/account" target="_blank" class="w-full auth">

            <font-awesome-icon :icon="['fas', 'user']" class="personalLogo font-semibold text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-white text-nowrap mr-5"/>
            <button>Личный кабинет</button>
          </a>
          <a v-if="!authStore.isAuthenticated" href="/account" target="_blank" class="w-full auth">
            <font-awesome-icon :icon="['fas', 'user']"
                               class="personalLogo font-semibold text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-white text-nowrap mr-5"/>
            <button @click="keycloakService.login()">Войти</button>
          </a>
          <a v-if="authStore.isAuthenticated && isPersonalAccountRoute"
             target="_blank"
             class="w-full auth">
            <font-awesome-icon

                :icon="['fas', 'right-from-bracket']"
                class="personalLogo font-semibold text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-white text-nowrap mr-5"
                @click="keycloakService.logout()"/>
            <button @click="keycloakService.logout()">Выйти</button>
          </a>
        </div>
      </div>
    </div>
  </header>

</template>

<style scoped>

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  border: none;
  outline: none;
  text-decoration: none;
  list-style:none;
  text-transform: capitalize;
}

header {

  box-shadow: var(--box-shadow);
  padding: 2rem 8%;
  border-bottom: var(--border-header); /* Параметры линии внизу */

}

.logo {
  font-size: 2rem;
  transition: all 1s ease;
}
.personalLogo{
  display: none;
}
.logo-img {
  width: 5rem;
  height: 5rem;
  border-radius: 2rem;
  transition: all 1s ease;

}
.logo-img img{
  -webkit-filter: brightness(100%);
  width: 100%;
  height: auto;
  padding: 0.5rem;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;


}
.logo-img:hover img {
  -webkit-filter: brightness(70%);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
.navbar a{
  margin-right: auto;
  font-size: 1.5rem;
  color: var(--white);
  transition: all 0.5s ease;

}

.navbar a:hover{
  color: var(--pastel-blauw);
  transition: all 0.5s ease;
}

header input{
  display: none;
}
header label {
  font-size: 2rem;
  color: var(--white);
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  display: none;
}
.textLogo{
  display: none;
}
.containerInfo {
  display: flex;
  align-items: center;
  gap: 1rem;

}
img, video {
  max-width: none;
  height: auto;
}
.avatar img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 20%;
  border: var(--border-header);
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap:0.5rem
}
.info span {
  white-space: nowrap;
  font-size: 1rem;
  color: white;
  font-weight: bold;

}

.buttons {
  display: flex;


}


.buttons button, .buttonsMobile button {
  padding: 0.5rem 0.1%;
  border: 1px solid rgba(255,255,255, 0.1);
  background: transparent;
  color: white;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

.buttons button:hover, .buttonsMobile:hover {
  background-color: var(--pastel-blauw);
  transition: all 1s ease;

}
@media (max-width: 1280px) {
  header {
    gap: 1rem;

  }
}

/*media queries */
@media (max-width: 1200px) {
  html {
    font-size: 55%;

  }
}
@media (max-width: 768px) {
  header{
   justify-content: space-between;

  }
  .logo{
      display: none;
  }
  .textLogo{
    display: block;
  }
  header label {
    visibility: visible;
    opacity: 1;
    display: block;
    margin-left: 2rem;
  }
  .buttonsMobile{
    display: block;
  }
  .auth button{
    display: none;
    visibility:hidden;
    opacity: 0;
  }
  .hello{
    display: none;
    visibility:hidden;
    opacity: 0;
  }
  .personalLogo{
    display: block;
  }
  /* После клика на ссылку сбрасываем состояние чекбокса */
  .navbar a {
    pointer-events: all;
  }

  a:active + input[type="checkbox"] {
    display: none;
  }
  header .navbar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0.5rem 2rem;
    border-top: .1rem solid rgba(0,0,0, 0.1);
    box-shadow: var(--box-shadow);
    transform-origin: left;
    transform: scaleX(0);
    height: 100vh;
    opacity: 0;
    z-index: 999;
    background-color: rgba(14,15,20,1);
    backdrop-filter: blur(3px);
    transition: transform .2s ease;


  }
  header .navbar a {
    display: block;

    font-size: 100%;

  }
  header input:checked ~ .navbar {
    transform: scaleX(1);
    transition: transform .0s ease;
    opacity: 1;
  }
  .info p{
    display: none;
    visibility:hidden;
    opacity: 0;
  }

  .avatar {
    display: none;
    visibility:hidden;
    opacity: 0;
  }

}


@media (max-width: 450px) {
  html {
    font-size: 50%;
  }
  header{
    padding: 1rem 1%;
  }
}



</style>
