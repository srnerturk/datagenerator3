<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="popup-container">
    <div class="popup">
      <div class="popup-header">
        <span>Data İndir</span>
        <button @click="closePopUp" class="svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </div>
      <div class="popup-content">
        <span>Kaç adet data indirmek istiyorsunuz?
        </span>
        <input type="number"
        v-model="defaultExportData"
        @change="changeDataCount(defaultExportData)" />
        <div class="alert-content">
          <span class="alert">!</span>
          <span class="alert-message">{{ maksimumAlertMessage }}</span>
        </div>
      </div>
      <div class="popup-export">
        <button class="back-btn" @click="closePopUp">Vazgeç</button>
        <button class="download-btn" @click="downloadJson">İndir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  data() {
    return {
      maksimumAlertMessage: 'Normal sürümde maksimum 100 adet data indirilebilir.',
      defaultExportData: 5,
    };
  },
  props: {
    maksimumDataExport: Number,
  },
  methods: {
    closePopUp() {
      this.$emit('closePopup');
    },
    downloadJson() {
      this.$emit('downloadJson', this.defaultExportData);
    },
    changeDataCount(value) {
      console.log(value);
      this.$emit('changeDataCount', value);
    },
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.popup-container {
  padding: 0;
  margin: 0;
  top: 40vh;
  width: 100%;
  max-height: 95.5vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  .popup {
    width: 500px;
    height: 240px;
    position: relative;
    bottom: 30px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      height: 30px;
      background-color: #a4b0be;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0px;
      font-weight: 600;

      span {
        color: #fff;
      }
    }

    .popup-content {
      display: flex;
      gap: 10px;
      flex-direction: column;
      align-items: center;
      padding: 10px;

      span {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      input {
        outline: none;
        width: 80px;
        padding: 4px;
        margin-top: 6px;
      }
      .alert-content {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-direction: row;
        padding: 4px;
        color: #fff;
        font-size: 14px;
        border-radius: 12px;
        .alert{
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(245, 5, 5);
          color: #fff;
          font-size: 18px;
          border-radius: 50%;
          height: 20px;
          width: 20px;
        }
        .alert-message{
          background-color: #fff;
          color: rgb(245, 5, 5);
        }
      }
    }

    .popup-export {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 50px;
      gap: 20px;
    }
  }
}</style>
