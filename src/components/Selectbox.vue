<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable max-len -->
<template>
  <div class="custom-select-container">
    <div class="select-header" @click="toggleDropdown">
      {{ selectedOption }}
      <i :class="{ 'fa-chevron-up': !showOptions, 'fa-chevron-down': showOptions }"></i>
    </div>
    <ul class="select-options" v-show="showOptions">
      <li class="select-option">
        <span class="list-header">
          <span class="list-header-hr"></span>
          <span class="list-text">
            İnsan</span>
        </span>
      </li>
      <li class="select-option" @click="triggerOption" v-for="dataType in dataTypes" :key="dataType.id"
        style="padding: 10px;">
        {{ dataType.text }}
      </li>
    </ul>
  </div>
</template>

<script >
export default {
  data() {
    return {
      showOptions: false,
      selectedOption: 'Seçiniz',
    };
  },
  props: {
    dataTypes: Array,
  },
  methods: {
    toggleDropdown() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.showDropdown = false;
    },
    triggerOption() {
      console.log('clicked');
    },
  },
};
</script>

<style scoped lang="scss">
.custom-select-container {
  display: flex;

  .select-header {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  select {
    border: 1px solid black;
  }

  ul {
    width: 200px;
    margin-top: 40px;
    position: fixed;
    display: flex;
    flex-direction: column;
    max-height: 350px;
    overflow-x: auto;

    li {
      &:hover {
        background-color: #3498db;
        color: #fff;
      }
    }

    i {
      position: relative;
      background-color: #fff;
      width: 100%;

      svg {
        position: relative;
      }
    }

    .select-option {
      list-style: none;
      background-color: #fff;
      z-index: 2;
    }
  }
}

.fa-chevron-up::before {
  content: "▲";
}

.fa-chevron-down::before {
  content: "▼";
}

.list-text {
  display: flex;
  justify-content: center;
  height: 20px;
  width: 60px;
  padding: 6px;
  background-color: #3498db;
  color: #fff;
  border-radius: 4px;
  z-index: 1;
  position: relative;
  top: 7px;
  left: 12px;
  padding: 1px;
}

  .list-header {
    font-size: 14px;
    background: #fff !important;
    display: flex;
    flex-direction: column;
    height: 35px;
  }

.list-header-hr {
  border: .4px solid #3498db;
  display: flex;
  position: relative;
  top: 20px;
}

.select-body {
  display: flex;
  flex-direction: column;
}

.select-options{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
