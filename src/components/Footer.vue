<template>
    <div class="footer-container bg-3">
        <div class="footer">
          <span>Mobven</span>
        </div>
    </div>
  </template>

<script>
export default {
  name: 'FooterComponent',
  props: {
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .footer-container {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .footer{
      width: 80%;
      display: flex;
      justify-content: space-between;
    }
  }
  </style>
