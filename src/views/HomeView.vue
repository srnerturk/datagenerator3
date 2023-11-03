<!-- eslint-disable max-len -->
<template>
  <div class="main">
    <ContentComponent :generatedData="generatedData" :rows="rows" :dataTypes="dataTypes" :testData="testData"
      @onDataTypeChanged="onDataTypeChanged" @onPropertyNameChanged="onPropertyNameChanged" @addNewRow="addNewRow"
      @changePopupVisibility="changePopupVisibility" @deleteRow="deleteRow" />
    <PopupComponent @closePopup="closePopup" @downloadJson="downloadJson" v-if="popupVisible"
      :maksimumDataExport="maksimumDataExport" :dataCount="dataCount" />
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import download from 'downloadjs';
import ContentComponent from '@/components/Content.vue';
import PopupComponent from '@/components/Popup.vue';

export default {
  name: 'HomeView',
  components: {
    ContentComponent,
    PopupComponent,
  },
  data() {
    return {
      popupVisible: false,
      generatedData: [],
      exampleDatas: [],
      oldKey: '',
      isFetched: false,
      maksimumDataExport: 100,
      dataTypes: [
        {
          id: 0,
          text: 'İsim',
          value: 'Ad',
          req: 'includeAd',
          category: 'human',
          isDisabled: false,
          key: 'adKeyName',
        },
        {
          id: 1,
          text: 'Soyisim',
          value: 'soyAd',
          req: 'includeSoyAd',
          isDisabled: false,
          key: 'soyadKeyName',
        },
        {
          id: 2,
          text: 'İsim Soyisim',
          value: 'isimSoyİsim',
          req: 'includeAdVeSoyAd',
          isDisabled: false,
          key: 'adVeSoyadKeyName',
        },
        {
          id: 3,
          text: 'Doğum Tarihi',
          value: 'DogumTarihi',
          req: 'includeDogumTarihi',
          isDisabled: false,
          key: 'dTarihiKeyName',
        },
        {
          id: 4,
          text: 'Şehir',
          value: 'Sehir',
          req: 'includeSehir',
          isDisabled: false,
          key: 'sehirKeyName',
        },
        {
          id: 5,
          text: 'E-Mail',
          value: 'GmailAccount',
          req: 'includeGmailAccount',
          isDisabled: false,
          key: 'mailKeyName',
        },
        {
          id: 6,
          text: 'Tutar',
          value: 'Tutar',
          req: 'includeTutar',
          isDisabled: false,
          key: 'tutarKeyName',
        },
        {
          id: 7,
          text: 'Cüzdan Numarası',
          value: 'WalletNumber',
          req: 'includeWalletNumber',
          isDisabled: false,
          key: 'walletKeyName',
        },
        {
          id: 8,
          text: 'Eğitim',
          value: 'RastgeleEgitimDuzeyi',
          req: 'includeRastgeleEgitimDuzeyi',
          isDisabled: false,
          key: 'egitimKeyName',
        },
        {
          id: 9,
          text: 'Telefon Numarası',
          value: 'TelefonNumarasi',
          req: 'includeTelefonNumarasi',
          isDisabled: false,
          key: 'telefonKeyName',
        },
        {
          id: 10,
          text: 'Iban',
          value: 'Iban',
          req: 'includeIban',
          isDisabled: false,
          key: 'ibanKeyName',
        },
        {
          id: 11,
          text: 'Şifre',
          value: 'Password',
          req: 'includePassword',
          isDisabled: false,
          key: 'passwordKeyName',
        },
        {
          id: 12,
          text: 'Epin',
          value: 'Epin',
          req: 'includeEpin',
          isDisabled: false,
          key: 'epinKeyName',
        },
        {
          id: 13,
          text: 'Meslek',
          value: 'Job',
          req: 'includeJob',
          isDisabled: false,
          key: 'jobKeyName',
        },
        {
          id: 14,
          text: 'Pasaport Numarası',
          value: 'Passport',
          req: 'includePassport',
          isDisabled: false,
          key: 'passportKeyName',
        },
        {
          id: 15,
          text: 'TC Kimlik Numarası',
          value: 'Tc Kimlik Numarası',
          req: 'includeTcNum',
          isDisabled: false,
          key: 'tcNumKeyName',
        },
      ],
      dataCount: 3,
      rows: [{
        id: 0, dataType: '', propertyName: '', example: '', oldKey: '',
      }],
      url: 'http://localhost:8080',
      testData: [],
    };
  },
  methods: {
    async onDataTypeChanged(index) {
      // eslint-disable-next-line no-alert
      let sampleData = [];
      this.rows[index].propertyName = '';
      // eslint-disable-next-line no-plusplus
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.dataCount; i++) {
        // eslint-disable-next-line no-await-in-loop
        const awaitCode = await this.generateCode(this.rows[index], i);
        const code = awaitCode;
        sampleData = [...sampleData, code];
      }
      // console.log('', sampleData);
      this.generatedData = [];
      this.generatedData = [...this.generatedData, ...sampleData];
      this.isFetched = false;
      if (this.rows.length - index <= 1) {
        this.addNewRow();
      }
      // console.log(index);
    },
    onPropertyNameChanged(index) {
      // let arr = [];
      // eslint-disable-next-line no-alert
      // const code = {};
      // eslint-disable-next-line no-plusplus
      // eslint-disable-next-line no-plusplus
      let key = '';
      const { propertyName } = this.rows[index];
      const { dataType } = this.rows[index];
      // if (propertyName) {
      //   key = propertyName;
      // } else if (dataType) {
      //   key = dataType;
      // } else if (oldKey) {
      //   key = oldKey;
      // }
      if (dataType) {
        key = dataType;
      }
      if (propertyName) {
        key = propertyName;
      }
      let keys = [];
      if (key !== '') {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < this.dataCount; j++) {
          const obj = this.generatedData[j];
          // console.log(obj);
          keys = Object.keys(obj).filter((x) => x === propertyName || x === dataType);
          if (keys.length === 0) {
            keys = [propertyName];
          }
          // console.log(keys);
          // console.log(keys);
          // eslint-disable-next-line no-const-assign, no-plusplus
          for (let i = 0; i < keys.length; i++) {
            keys.forEach((k) => {
              console.log(k);
              // console.log('old-data', prop);
              // console.log('old-obj', obj[key]);
              // obj[prop] = obj[k];
              // delete obj[k];
            });
          }
          // this.oldKey = key;
          // console.log(keys);
        }
        // console.log(key);
      }
      this.generatedData = [...this.generatedData];
    },
    async generateCode(row, index) {
      const code = {};
      // eslint-disable-next-line no-unreachable-loop, no-plusplus
      for (let i = 0; i < this.rows.length; i++) {
        let randomName = null;
        const key = this.rows[i].propertyName || this.rows[i].dataType;
        this.rows[i].oldKey = key;
        if (row.id === i && key !== '') {
          // eslint-disable-next-line no-await-in-loop
          await this.generateRandom(key);
          randomName = this.exampleDatas[index];
        }
        if (randomName != null) {
          this.rows[i].example = randomName;
        }
        if (key !== '') {
          if (key !== row.dataType) {
            code[key] = this.generatedData[index][key];
          } else {
            code[key] = this.rows[i].example;
          }
        }
      }
      return code;
    },

    // eslint-disable-next-line consistent-return
    async generateRandom(key) {
      if (this.isFetched) return;
      // eslint-disable-next-line no-shadow, max-len
      const findKey = this.dataTypes.find((findKey) => findKey.value === key);
      findKey.isDisabled = true;
      if (findKey == null || undefined) return;
      let spesicifData = findKey.req.replace('include', '');
      spesicifData = spesicifData.charAt(0).toLowerCase() + spesicifData.slice(1);
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await axios.get(`${this.url}/generateData?${findKey.req}=true&repeat=${this.dataCount}`);
        // eslint-disable-next-line no-unused-vars
        // const response = res.data[0].filter(item => item.ad === spesicifData);
        // eslint-disable-next-line no-unreachable-loop, no-plusplus
        const arr = [];
        res.data.forEach((element) => {
          arr.push(element[spesicifData]);
        });
        this.isFetched = true;
        this.exampleDatas = arr;
        // this.dataTypes[key].isDisabled = true;
        // return res.data[0][spesicifData];
      } catch (error) {
        throw error;
      }
    },
    async downloadJson(value) {
      // http://localhost:8080/generateData?includeIban=true&ibanKeyName=test&repeat=3
      const dataType = 'dataType';
      const propertyName = 'propertyName';
      let request = '';
      // eslint-disable-next-line max-len, no-shadow
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.rows.length - 1; i++) {
        // eslint-disable-next-line max-len, no-shadow
        const findKey = this.dataTypes.find((findKey) => findKey.value === this.rows[i][dataType]);
        // eslint-disable-next-line no-unused-vars, no-undef, no-const-assign
        request += `include${this.rows[i][dataType]}=true&${findKey.key}=${this.rows[i][propertyName]}&`;
      }
      const res = await axios.get(`${this.url}/generateData?${request}repeat=${value}`);
      // eslint-disable-next-line no-undef
      const exportData = JSON.stringify(res.data, null, 2);
      console.log(exportData);
      // download(exportData, 'veri.json', 'application/json;charset=utf-8');
      this.changePopupVisibility();
    },
    addNewRow() {
      this.rows = [
        ...this.rows,
        {
          id: this.rows.length, dataType: '', propertyName: '', example: '', oldKey: '',
        },
      ];
    },
    changePopupVisibility() {
      this.$emit('bgactive');
      this.popupVisible = !this.popupVisible;
    },
    closePopup() {
      this.$emit('bgactive');
      this.popupVisible = false;
    },
    deleteRow(index) {
      if (this.rows.length > 1) {
        // const deletedValue = this.rows[index].dataType;
        // eslint-disable-next-line no-plusplus, max-len
        for (let i = 0; i < this.generatedData.length; i++) {
          const list = this.generatedData[i];
          const elem = this.rows[index].dataType;
          delete list[elem];
        }
        this.rows.splice(index, 1);
      }
    },
  },
  computed: {
    // eslint-disable-next-line vue/no-async-in-computed-properties
  },
  mounted() {
    if (localStorage.getItem('generatedData') !== null) {
      const rows = localStorage.getItem('rows');
      const objRows = JSON.parse(rows);
      const generatedData = localStorage.getItem('generatedData');
      const objGeneratedData = JSON.parse(generatedData);
      this.rows = objRows;
      this.generatedData = objGeneratedData;
      this.rows.forEach((element) => {
        // console.log(element.dataType);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.dataTypes.length; i++) {
          if (this.dataTypes[i].value === element.dataType) {
            this.dataTypes[i].isDisabled = true;
          }
        }
      });
    }
  },
};
</script>

<style  scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
