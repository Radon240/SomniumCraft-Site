<template>
  <div>
    <!-- canvas, на котором будет отображаться скин -->
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, defineProps } from "vue";
import * as skinview3d from "skinview3d";

// Определяем пропсы, чтобы передавать ник
export default {
  name: "SkinViewer",
  props: {
    nick: {
      type: String,
      required: true, // Ник обязателен
    },
  },
  setup(props) {
    // Инициализация SkinViewer при монтировании компонента
    onMounted(() => {
      const element = document.getElementById("canvas");
      if (element) {
        new skinview3d.SkinViewer({
          canvas: element, // Используем элемент canvas напрямую
          width: 300,
          height: 400,
          skin: `https://mineskin.eu/skin/${props.nick}`, // Используем переданный ник
          enableControls: true,
        });
      }
    });
  },
};
</script>

<style scoped>
canvas {
  display: block;
  visibility: visible;
  opacity: 1;
}
</style>
