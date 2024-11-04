<script setup>

</script>

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-top-container">
        <span>Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.</span>
        <div class="icons">
          <ul>
            <li><a href="https://www.youtube.com/@somnium-craft" target="_blank" >
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </a></li>
            <li><a href="https://discord.com/invite/CEDEQU6n6Y" target="_blank">
              <font-awesome-icon :icon="['fab', 'discord']" />
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>



<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  line-height: 1.5;
  text-transform: capitalize;
  list-style: none;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  color: var(--white);

}
html{
  font-size: 62.5%;


}

footer{
  background-image: url("@resources/images/backgroundIce.png"); /* Фон для основного контейнера */
  background-repeat: no-repeat; /* Запрещаем повторение изображения */
  background-position: bottom center;
  background-size: cover; /* Масштабируем изображение по ширине контейнера */
  margin: auto;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 5rem;



}
footer .footer-content{
  padding: 1rem;
  width: 100%;
  height: 100%;
  opacity: 80%;
  background-color: var(--background);
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(5px);
  border-top: 2px solid rgba(255,255,255, 0.1);
}
footer .footer-content .footer-top-container{

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: auto;
  font-weight: lighter  ;
  flex-direction: column;
  justify-content: center; /* Центрирует элементы по вертикали */
  text-align: center; /* Центрирует текст внутри span */

}
footer .footer-content .footer-top-container span{
  font-weight: 300;
}
footer .footer-content .footer-top-container .icons ul {
  list-style: none; /* Убирает маркеры списка */
  padding: 0; /* Убирает отступы */
  display: flex; /* Располагает элементы в ряд */
  gap: 5rem; /* Пробел между иконками */
}

footer .footer-content .footer-top-container .icons li {
  display: inline-block; /* Чтобы элементы списка располагались в ряд */
  font-size: 4rem;
}
footer .icons li:hover {
  -webkit-filter: brightness(70%);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
@media (max-width: 1200px) {
  html {
    font-size: 55%;
  }
}
@media (max-width: 750px) {
  html {
    font-size: 35%;
  }
}
</style>