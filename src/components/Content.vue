<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="content-container">
    <div class="content-area">
      <div class="content box-shadow">
        <table class="bg-header">
          <thead>
            <tr>
              <th style="min-width: 20px;" class="">#</th>
              <th style="min-width: 40px;">Data Tipi</th>
              <th style="min-width: 40px;">Satır İsmi</th>
              <th style="min-width: 40px;">Örnek</th>
            </tr>
          </thead>
          <tr :key="row.id" v-for="(row, index) in rows">
            <td style="font-size: 12px;"> {{ index + 1 }} </td>
            <!-- <td style="font-size: 12px;">  <selectbox :dataTypes="dataTypes"/> </td> -->
            <td>
              <select @change="onDataTypeChanged(index), isDisabled(rows[index].dataType)" v-model="rows[index].dataType"
                name="dataType" id="">
                <option value="" selected disabled>Seçiniz
                </option>
                <option v-for="dataType in dataTypes" :key="dataType.id" :value="dataType.value"
                  :disabled="dataType.isDisabled">
                  {{ dataType.text }}
                </option>
              </select>
            </td>
            <td>
              <input type="text" v-model="rows[index].propertyName" @change="onPropertyNameChanged(index)"
                name="propertyName" id="propertyName" />
            </td>
            <td>
              <input v-model="rows[index].example" type="text" name="example" id="example" disabled>
            </td>
            <td><button @click="deleteRow(index)" class="svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-x-circle">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </button></td>
          </tr>
        </table>
      </div>
      <!--<div class="row-area">
        <div class="add-row">
          <input type="number">
          <span>Satır</span>
          <button class="download-btn" @click="addNewRow">Ekle</button>
        </div>
      </div>-->
    </div>
    <div class="preview box-shadow">
      <div class="preview-header bg-header">
        <span>Önizleme</span>
      </div>
      <div class="preview-detail-area">
        <div class="preview-detail bg-2">
          <select name="" id="">
            <option value="">JSON</option>
          </select>
          <button><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg></button>
        </div>
      </div>
      <div class="preview-content">
        <vue-json-pretty s v-model="generatedData" />
        <div class="export-area bg-2">
          <div class="export">
            <div class="save-data-area">
              <span @mouseover="showAlertMessage" @mouseout="showAlertMessage">
                <span class="alert-template">?</span>
                <span v-if="saveAlertMessage" class="hover-alert">Eğer seçtiğiniz kayıtların
                  tarayıcı üzerinde kaydedilip ekrana daha sonraki girişlerinizde gelmesini istiyorsanız kaydet butonuna
                  tıklayınız.
                  <br>
                  Eğer daha önce kaydettiğiniz verileri temizlemek istiyorsanız temizle butonuna tıklayınız.
                </span>
              </span>
              <button class="btn-preview" style="background-color: #e67e22;" @click="saveSelectedListInLocalStorage">
                <div class="loader-container">
                  <div class="loader"></div>
                  <div class="tick"></div>
                </div>
                Kaydet
              </button>
              <button class="btn-preview" style="background-color: red;"
                @click="clearSelectedListInLocalStorage">Temizle</button>
            </div>
            <button class="btn-preview" @click="changePopupVisibility">İndir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import VueJsonPretty from 'vue-json-pretty';
// import selectbox from '@/components/Selectbox.vue';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'ContentComponent',
  data() {
    return {
      options: {
        lineHeight: 14,
        language: 'json',
        fontSize: 14,
        lineNumbers: 'off',
        contextmenu: false,
        wrappingIndent: 'indent',
        minimap: {
          enabled: false,
        },
      },
      textareaContent: '',
      data: Object,
      saveAlertMessage: false,
    };
  },
  components: {
    VueJsonPretty,
    // selectbox,
  },
  props: {
    generatedData: Array,
    rows: Array,
    dataTypes: Array,
  },
  methods: {
    onDataTypeChanged(index) {
      this.$emit('onDataTypeChanged', index);
    },
    onPropertyNameChanged(index) {
      this.$emit('onPropertyNameChanged', index);
    },
    addNewRow() {
      this.$emit('addNewRow');
    },
    changePopupVisibility() {
      this.$emit('changePopupVisibility');
    },
    deleteRow(index) {
      this.$emit('deleteRow', index);
    },
    isDisabled(index) {
      console.log('row', index);
    },
    saveSelectedListInLocalStorage() {
      localStorage.setItem('rows', JSON.stringify(this.rows));
      localStorage.setItem('generatedData', JSON.stringify(this.generatedData));
    },
    clearSelectedListInLocalStorage() {
      localStorage.clear();
    },
    showAlertMessage() {
      this.saveAlertMessage = !this.saveAlertMessage;
    },
    mounted() {
      this.$watch('generatedData', () => {
        console.log('a thing changed');
      }, { deep: true });
    },
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-container {
  width: 80%;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10px;

  .content-area {
    width: 50%;
    height: 98%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .content {
      display: flex;
      max-height: 85%;
      overflow-x: auto;
    }

    table {
      border-collapse: collapse;
      max-height: 40px;
      width: 100%;

      th {
        text-align: start;
        font-weight: 600;
        font-size: 14px;
        padding: 8px;
        height: 28px;
        min-width: 20px;
        color: #fff;
      }

      td {
        padding: 8px;
        height: 30px;
        min-width: 20px;
        background-color: #fff;
      }

      tr {
        height: 25px;
      }

      select,
      input {
        outline: none;
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.526);
        width: 90%;
        border: 1px solid rgba(0, 0, 0, 0.226);
        border-radius: 4px;
      }

      select {
        padding: 4px;
      }

      input {
        padding: 6px;
      }
    }

    .row-area {
      width: 100%;
      display: flex;

      .add-row {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        gap: 4px;
        border: 1px solid rgba(0, 0, 0, 0.226);
        background-color: #ffffff;

        span {
          font-size: 14px;
          font-weight: 400;
        }

        input {
          width: 40px;
          padding: 4px;
        }
      }
    }
  }

  .preview {
    width: 48%;
    max-height: 90%;
    margin-left: 2%;
    max-height: 98%;
    display: flex;
    flex-direction: column;

    .preview-detail-area {
      display: flex;
      width: 100%;
      align-items: center;

      button {
        background: none;
        border: none;
        cursor: pointer;
      }

      .preview-detail {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
      }
    }

    .preview-header {
      min-height: 44px;
      display: flex;
      align-items: center;

      span {
        padding-left: 10px;
        font-size: 14px;
        color: #fff;
        font-weight: 600;
      }
    }

    .preview-content {
      display: flex;
      flex-direction: column;
      height: 95%;
      max-height: 90%;
      justify-content: space-between;
      background-color: #fff;

      .export-area {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        height: 60px;

        .export {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 10px;
          gap: 10px;

          .save-data-area {
            display: flex;
            gap: 10px;
            position: relative;
            align-items: center;

            .alert-template {
              font-weight: 500;
              display: flex;
              width: 12px;
              height: 12px;
              align-items: center;
              justify-content: center;
              background-color: #95a5a6;
              padding: 4px;
              border-radius: 50%;
              color: #34495e;
            }

            .hover-alert {
              background-color: #95a5a6;
              color: #fff;
              border-radius: 8px;
              padding: 14px;
              position: absolute;
              bottom: 50px;
              right: -90px;
              z-index: 0;
              width: 400px;
            }
          }
        }
      }
    }

    .vjs-tree {
      display: flex;
      padding: 0px;
      width: 100%;
      font-size: 12px;
      max-height: 80%;
      overflow-x: auto;
    }
  }
}

.vjs-tree-list {
  max-height: 80%;
  position: fixed;
}

.vjs-tree-list-holder {
  max-height: 80%;
  position: fixed;
}

.vjs-tree-list-holder-inner {
  max-height: 90%;
  position: fixed;
}

@media screen and (max-width: 600px) {
  .content-container {
    width: 98%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .content-area {
      width: 100%;
      max-height: 280px;
      margin: 0;
      padding: 0;

      .row-area {
        position: absolute;
        bottom: 0;
        left: 175px;
      }
    }

    .preview {
      width: 100%;
      max-height: 300px;
      margin: 0;
      margin-bottom: 50px;

      .preview-header {
        display: none;
      }
    }
  }
}
</style>
