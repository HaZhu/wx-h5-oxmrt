<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
   
  },
  created() {},
  mounted() {
  },
};
</script>

<style lang="scss">
@import "./assets/styles/reset.scss";
@import "./assets/styles/animate.css";
#app {
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.showlist-leave-active,
.showlist-enter-active {
  transition: all 0.5s;
}
.showlist-enter {
  opacity: 0;
  transform: translateX(100%);
}
.showlist-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
.page {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
