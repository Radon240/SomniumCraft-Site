<script lang="ts">


</script>

<template>
  <header>
    <a href="/main" class="logo">
      <div class="logo-img">
        <img src="../../assets/CatHead24.svg" draggable="false" />
      </div>
    </a>

    <nav class="navbar">
      <router-link to="/main">Test</router-link>
      <router-link :to="{name:'wiki'}">Wiki</router-link>
    </nav>

    <div class="container">
      <div class="avatar">
        <img src="../../assets/steve.png" draggable="false"/>
      </div>
      <div class="info">
        <span>Приветствуем, Незнакомец</span>
        <div class="buttons">
          <button>Войти</button>
          <button>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
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

header{
  position:fixed;
  width: 100%;
  height: 7rem;
  top: 0;
  left: 0;
  background: var(--background);
  box-shadow: var(--box-shadow);
  padding: 2rem 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  opacity: 80%;
  border-bottom: 2px solid rgba(255,255,255, 0.1); /* Параметры линии внизу */

  .logo {
    font-size: 3rem;
    color: var(--white);
    transition: 0.5s;

    span {
      color: var(--white);
      cursor: pointer;
      visibility: hidden;
      opacity: 0;
    }
  }
  .logo-img {
    width: 6rem;
    height: 6rem;
    border-radius: 2rem;

    :hover img {
      -webkit-filter: brightness(70%);
      -webkit-transition: all 1s ease;
      -moz-transition: all 1s ease;
      -o-transition: all 1s ease;
      -ms-transition: all 1s ease;
      transition: all 1s ease;
    }

    img {
      -webkit-filter: brightness(100%);
      width: 100%;
      height: auto;
      padding: 0.5rem;
      transition: transform 0.5s ease;
    }
  }
  .navbar {
    a {
      margin-right: auto;
      font-size: 1.7rem;
      margin-left: 2rem;
      color: var(--white);
      transition: 0.5s;

      &:hover {
        text-decoration: none;
        padding: 0.5rem 0.5rem;
        border-radius: 20px;
        transition: background-color 0.5s;
        background-color: lightgray;
      }
    }
  }
}

.container {
  display: flex;
  align-items: center;
}

.avatar img {
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  margin-right: 1rem;
  border: 2px solid rgba(255,255,255, 0.1);
}

.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  span {
    font-size: 1.6rem;
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}

.buttons {
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1.5rem;
    border: 1px solid rgba(255,255,255, 0.1);
    background: transparent;
    color: white;
    font-size: 1.4rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      background-color: var(--pastel-blauw);
    }
  }
}

</style>