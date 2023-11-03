<!-- eslint-disable max-len -->
<template>
    <div class="welcome-page">
        <div class="welcome-image">
            <img src="../assets/welcome.png" alt="">
        </div>
        <div class="wolcome-right">
            <span class="logo">DataGenerator</span>
            <div class="text-content">
                <h1>
                    Veri Dünyasının Sihirbazı Olun!
                </h1>
                <h2>
                    Test Verilerinizi Yaratmanın Yeni Yolu.
                </h2>
                <p>
                    Veri testi, her projenin temelini oluşturur. Siz de veri dünyasının sihirbazı olabilir ve veri
                    testlerinizi
                    kolayca, hızlıca ve güvenle oluşturabilirsiniz. Uygulamamız size sınırsız seçenekler sunar ve özel test
                    verilerinizi anında üretmenizi sağlar. Sizi veri oluşturmanın yeni yoluna davet ediyoruz. Başlayın ve
                    veri
                    testlerinizi dönüştürün!
                </p>
                <div class="to-direct-buttons">
                    <router-link class="welcome-btn" to="/home">Hemen Başla!</router-link>
                    <router-link class="welcome-btn" to="/about">Rehber</router-link>
                </div>
            </div>
            <div class="welcome-page-social">Social
                <div class="div">Social</div>
                <div class="div">Social</div>
                <div class="div">Social</div>
                <div class="div">Social</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome-page {
    width: 100%;
    max-height: 100vh;
    display: flex;

    .welcome-image {
        display: flex;
        width: 55%;
        object-fit: contain;

        img {
            width: 100%;
            max-height: 100vh;
        }
    }

    .wolcome-right {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 40px;

        .logo {
            font-size: 50px;
            font-weight: 900;
        }

        .text-content {
            display: flex;
            flex-direction: column;
            gap: 20px;

            h1 {
                font-size: 32px;
                font-weight: 700;
                color: #7bed9f;
                ;
            }

            h2 {
                font-size: 22px;
                font-weight: 400;
                color: #ff7f50;
            }

            p {
                word-spacing: 4px;
                font-size: 16px;
                font-weight: 400;
                color: #57606f;
            }

            .to-direct-buttons {
                display: flex;
                min-height: 55px;
                justify-content: space-between;
                width: 100%;

                .welcome-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    width: 45%;
                    height: 45px;
                    font-size: 16px;
                    font-weight: 500;
                    background: none;
                    border: 1px solid;
                    color: #74b9ff;
                    border-radius: 4px;
                    transition: .3s;
                    background-color: #ff7f50;
                    color: #fff;
                    cursor: pointer;

                    &:first-child {
                        background-color: #1abc9c;
                        color: #fff;

                        &:hover {
                            background-color: #7bed9f;
                            height: 50px;
                            color: #fff;
                        }
                    }

                    &:hover {
                        background-color: #f39c12;
                        height: 50px;
                    }
                }
            }
        }

        .welcome-page-social {
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>
