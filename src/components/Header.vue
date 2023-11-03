<template>
  <div class="header-container box-shadow bg-3">
    <div class="header">
      DataGenerator
      <ul>
        <li>
          <router-link to="/home"
          >Anasayfa</router-link>
        </li>
        <li>
          <router-link to="/about"
          >Api Kullanım Rehberi</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      Home: true,
      About: false,
    };
  },
  props: {
    isActive: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.057);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  .header {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    ul {
      display: flex;
      gap: 20px;

      li {
        list-style: none;
        .active{
          font-weight: 600;
          color: #3498db;
        }
      }

      a {
        text-decoration: none;
      }
    }

    .language {
      display: flex;
      gap: 10px;
    }
  }
}

</style>
