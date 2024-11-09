<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const isWikiRoute = computed(() => route.path === '/wiki');

    return {
      isWikiRoute
    };
  }
};
</script>

<template>
  <header class = "no-select" >
    <a href="/main" class="logo">
      <div class="logo-img">
        <img v-if="isWikiRoute" src="@/resources/images/CatHead24_nerd.svg" draggable="false"/>
        <img v-else src="@/resources/images/CatHead24.svg" draggable="false"/>
      </div>
    </a>

    <input type="checkbox" name="menu" id="menu">
    <label for="menu">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </label>

    <nav class="navbar">

      <router-link to="/main">Главная</router-link>
      <router-link to="/wiki">Вики</router-link>
      <a href="https://world.scmc.dev/" target="_blank">Карта</a>
      <router-link to="/rules">Правила</router-link>
      <router-link to="/other">Прочее</router-link>

    </nav>

    <div class="containerInfo">
      <div class="avatar">
        <img src="@/resources/images/steve.png" draggable="false"/>
      </div>
      <div class="info">
        <span>Приветствуем, Незнакомец</span>
        <div class="buttons">
          <button>Личный кабинет</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style>

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
  position:fixed;
  width: 100%;
  height: 5rem;
  top: 0;
  left: 0;
  background: rgba(var(--background-header));
  box-shadow: var(--box-shadow);
  padding: 2rem 8%;
  display: flex;
  justify-content: center;

  align-items: center;
  z-index: 100;
  border-bottom: var(--border-header); /* Параметры линии внизу */
  backdrop-filter: blur(3px);
  gap: 10%;
}
header .logo {
  font-size: 2rem;
  color: var(--white);
  transition: 0.5s;
}
header .logo span{
  color: var(--white);
  cursor: pointer;
  visibility: hidden;
  opacity: 0;


}
header .logo-img {
  width: 5rem;
  height: 5rem;
  border-radius: 2rem;

}
header .logo-img img{
  -webkit-filter: brightness(100%);
  width: 100%;
  height: auto;
  padding: 0.5rem;
  transition: transform 0.5s ease; /* Плавная анимация */ /* Анимация для изменения размера */


}
header .logo-img:hover img {
  -webkit-filter: brightness(70%);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
header .navbar{
  display: flex;
  gap: 2rem;
}
header .navbar a{
  margin-right: auto;
  font-size: 1.5rem;
  color: var(--white);
  transition: 0.5s;

}

header .navbar a:hover{
  color: var(--pastel-blauw);
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

header .containerInfo {
  display: flex;
  align-items: center;
  gap: 1rem;

}
img, video {
  max-width: none;
  height: auto;
}
header .avatar img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 20%;
  border: var(--border-header);
}
header .info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap:0.5rem
}
header .info span {
  white-space: nowrap;
  font-size: 1rem;
  color: white;
  font-weight: bold;

}

header .info .buttons {
  display: flex;


}

header .info .buttons button {
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

header .buttons button:hover {
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
  header label {
    visibility: visible;
    opacity: 1;
    display: block;
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
    transform-origin: top;
    transform: scale(0);
    opacity: 0;
    background-color: rgba(var(--background-header));
    backdrop-filter: blur(3px);


  }
  header .navbar a {
    display: block;

    font-size: 100%;

  }
  header input:checked ~ .navbar {
    transform: scale(1);
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
}



</style>
