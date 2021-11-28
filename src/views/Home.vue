<template>
  <div class="accueil">
    <section class="description">
      <div class="image"></div>
      <div class="content">
        <h1>AGARTHA</h1>
        <h3>
          les
          <span>UHCHOST</span> à la demande
          <span>GRATUITEMENT</span>
        </h3>
      </div>
      <img
        class="arrow"
        src="https://img.icons8.com/android/24/000000/expand-arrow.png"
      />
    </section>
    <section class="discord">
      <h1>Rejoignez notre Discord</h1>
      <h3>
        Pour être au courant des nouveautés dès leur sortie, trouver des amis
        avec qui jouer ou encore participer à des giveaways !
      </h3>
      <button @click="openDiscord">Rejoindre le discord</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      button_ip: "Copier l'ip",
    };
  },
  methods: {
    openDiscord() {
      window.open("https://discord.gg/43AqytY", "_blank");
    },
    buttonCopy() {
      this.button_ip = "IP Copiée !";
      setTimeout(() => {
        this.button_ip = "Copier l'ip";
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
.accueil {
  user-select: none;
  display: flex;
  flex-direction: column;

  .description {
    position: relative;
    width: 100%;
    min-height: calc(100vh);

    .image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      background-image: linear-gradient(
          to top,
          rgba(47, 54, 64, 1),
          transparent
        ),
        url("../assets/accueil/cave.jpg");
      background-size: cover;
    }

    .content {
      width: 550px;
      margin: 35vh auto 100px auto;
      justify-content: space-around;

      filter: blur(0);
      color: white;
      border: solid white 3px;
      padding: 0px 20px 0 20px;

      h1 {
        font-weight: 900;
        font-size: 5em;
      }

      h3 {
        font-weight: 300;
        span {
          color: #fbc531;
          font-weight: 900;
        }
      }

      @media screen and (max-width: 700px) {
        width: 90%;

        h1 {
          font-size: 15vw;
        }

        h3 {
          font-size: 5vw;
        }
      }
    }

    .arrow {
      position: absolute;
      bottom: 15px;
      filter: invert(100%);
      transform: scale(1.5);

      animation: up-and-down 1s infinite;
    }
  }
  .discord {
    background-color: #2f3640;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 0;

    h3 {
      font-weight: 100;
      font-size: 20px;
      max-width: 600px;
      text-align: center;
      margin: auto;
    }

    button {
      margin: 20px 0;
    }

    @media screen and (max-width: 650px) {
      h1 {
        font-size: 35px;
      }

      h3 {
        padding: 10px 20px;
        font-size: 18px;
      }
    }
  }
}

@keyframes up-and-down {
  0% {
    bottom: 15px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 15px;
  }
}
</style>
