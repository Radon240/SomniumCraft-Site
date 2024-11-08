<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const submenuExpanded = ref(true); // Контролирует состояние меню

// Методы
const goToUsers = () => {
  // Логика для перехода на страницу пользователей
};

const toggleSubmenu = () => {
  submenuExpanded.value = !submenuExpanded.value;
};

const goToRoles = () => {
  // Логика для перехода на страницу ролей
};

const goToRolesList = () => {
  // Логика для перехода на список ролей
};
</script>

<template>

  <aside class="navigation fixed mt-28 ml-10 w-auto max-w-64 h-full">

  <Menu as="div" class="inline-block text-left w-full h-auto">
    <div class="w-full">
      <MenuButton class="md:text-base lg:text-lg xl:text-xl text-nowrap inline-flex w-full justify-start gap-x-1.5 rounded-md px-3 py-2 text-sm font-bold text-white-900 shadow-sm ring-inset  hover:bg-pastel-blauw">
          <span class="text-xs md:text-base lg:text-lg xl:text-xl text-nowrap ">

            <font-awesome-icon :icon="['fass', 'lines-leaning']" />
            На этой странице
           <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-gray-400 text-xs md:text-base lg:text-lg xl:text-xl text-nowrap"/></span>
      </MenuButton>
    </div>

    <transition enter-active-class="w-full transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="w-full z-10 mt-2 origin-top-left rounded-md  focus:outline-none">
        <div class="py-1 ">
          <MenuItem v-slot="{ active }">
            <a href="#Общие правила" :class="[active ? 'text-pastel-blauw outline-none' : 'text-white-900', 'block px-4 py-2 text-sm']" class="md:text-base lg:text-lg xl:text-xl ">
              Общие правила</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#Правила общения" :class="[active ? 'text-pastel-blauw outline-none' : 'text-white-900', 'block px-4 py-2 text-sm']" class="md:text-base lg:text-lg xl:text-xl ">
              Правила общения</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="#Правила игры на сервере" :class="[active ? 'text-pastel-blauw outline-none' : 'text-white-900', 'block px-4 py-2 text-sm']" class="md:text-base lg:text-lg xl:text-xl ">
              Правила игры на сервере</a>
          </MenuItem>

        </div>
      </MenuItems>
    </transition>
  </Menu>
</aside>
  <div class="containerRules mr-64 pl-10">

    <div class="content ml-80 ">
    <ol class="level-1 sm:4xl md:4xl lg:text-4xl xl:text-3xl">
      <li id="Общие правила">Общие правила
        <ol class="level-2 md:text-base lg:text-1xl xl:text-2xl">
          <li>Играть можно только с модификациями, которые перечислены в этом списке. Модификации и форки, не указанные в списке разрешенных, нельзя использовать на сервере. По всем вопросам о легальности интересующего мода обращайтесь к модераторам.</li>
          <li>Ответственность всегда несет владелец аккаунта, независимо от того, кто совершал действия под данным аккаунтом.</li>
          <li>Запрещено:
            <ol class="level-3">
              <li>Использовать в никнейме нецензурные выражения, оскорбления, а также выражения, нарушающие правила серверов PepeLand.</li>
              <li>Намеренное использование никнейма, схожего на никнейм другого игрока с целью выдачи себя за другое лицо.</li>
              <li>Продажа и покупка товаров, услуг за неигровой контент (за денежные средства, криптовалюту и прочее).</li>
              <li>Действия, направленные на возбуждение ненависти либо вражды, а также на унижение достоинства человека либо группы лиц по признакам пола, расы, национальности, языка, происхождения, отношения к религии, а также принадлежности к какой-либо социальной группе.</li>
              <li>Доксинг (поиск и опубликование персональной или конфиденциальной информации о человеке без его согласия).</li>
              <li>Использование дополнительных аккаунтов для обхода ограничений.</li>
              <li>Нарушение правил сервера, условия использования, правил (Terms of Service) платформы Twitch.tv.</li>

          </ol></li>

        </ol>
      </li>
      <li id="Правила общения">Правила общения
        <ol class="level-2 md:text-base lg:text-lg xl:text-xl">
          <li>Строительство нецензурных слов и символов, а также фигур, несущих порнографический характер.
            <ol class="level-3">
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
            </ol>
          </li>
        </ol>
      </li>
      <li id="Правила игры на сервере">Правила игры на сервере
        <ol class="level-2 md:text-base lg:text-lg xl:text-xl">
          <li>Строительство нецензурных слов и символов, а также фигур, несущих порнографический характер.
            <ol class="level-3">
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>
              <li>Скин, содержащий нецензурные слова или имеет порнографический характер.</li>

            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>
  </div>
</template>

<style scoped>

.containerRules {
  margin-top: 4rem;
  display: flex;
  gap: 5rem;
  width: 100%;
  height: auto;
  align-items: start;
  justify-content: center;
  padding: 3rem 5rem 3rem 3rem;

}
.navigation {
  width: 15%;
}

.content {
  width: auto;
  margin-left: 16rem;
  justify-content: center;
  height: auto;

}
.level-1 {
  counter-reset: level2;
  list-style: none;

}

.level-1 > li {
  counter-increment: level1;
}

.level-1 > li::before {
  content:counter(level1);
  text-align: center;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.70);
  border-color: hsla(240,5%,84%,.1);
  border-width: 1px;
  background-color: rgba(24, 21, 30, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 0.625rem;
  padding: 0.0625rem 0.625rem;
  margin: 1rem 1rem;

}

.level-2 {
  margin-top: 0.5rem;
  list-style: none;
  counter-reset: level2;
  padding-left: 4rem;

}

.level-2 > li {
  counter-increment: level2;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.90);

}

.level-2 > li::before {
  content: counter(level1) "." counter(level2) ". ";
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.70);
}

.level-3 {
  margin-top: 0.1rem;
  list-style: none;
  padding-left: 1.25rem;

}

.level-3 > li {
  counter-increment: level3;
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.90);

}

.level-3 > li::before {
  content: counter(level1) "." counter(level2) "." counter(level3) ". ";
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.70);
}
@media (max-width: 1280px) {
  aside{
    display:none;
    visibility: hidden;

  }
  .containerRules {
    justify-content: space-between;
    width: 100%;
    margin-left: 0;
    padding-left: 0;
  }
  .content {
    width: 100%;
    margin-left: 1rem;
  }
}
</style>
