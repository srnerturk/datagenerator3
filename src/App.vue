<template>
  <div id="app">
    <div class="bg" v-if="bg"></div>
    <HeaderComponent />
    <router-view @bgactive="bgactive" />
    <FooterComponent />
  </div>
</template>
<script>
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from './components/Footer.vue';
// import HomeView from './views/HomeView.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    FooterComponent,
    // HomeView,
  },
  data() {
    return {
      bg: false,
    };
  },
  methods: {
    bgactive() {
      this.bg = !this.bg;
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  color: #2c3e50;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  }
}

.download-btn {
  padding: 6px;
  width: 60px;
  height: 40px;
  background-color: #1abc9c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  padding: 6px;
  width: 60px;
  height: 40px;
  background-color: orange;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn {
  padding: 6px;
  width: 60px;
  height: 40px;
  color: #2c3e50;
  border: none;
  background: #fff;
  cursor: pointer;
}

.bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.174);
  position: absolute;
  z-index: 0;
}

.svg {
  background-color: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
}

.bg-header {
  background-color: #a4b0be;
}

.bg-2 {
  background-color: rgba(1, 26, 25, 0.2);
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.bg-3 {
  background-color: #f1f1f1;
}

.btn-preview {
  background-color: #1abc9c;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 10px;
  min-width: 60px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
