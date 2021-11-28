<template>
  <div id="footer">
    <section class="pre-footer">
      <div class="serveur">
        <div class="logo">
          <img src="../assets/logo-discord.png" alt />
        </div>
        <div class="texte">
          <h1>AGARTHA</h1>
          <h2>play.agarthauhc.fr</h2>
          <h4>Connectez vous de la 1.8 à la 1.15 !</h4>
          <button @click="copyToClipboard('play.agarthauhc.fr')">
            {{ button_ip }}
          </button>
        </div>
      </div>
      <div class="liens-utiles">
        <h1>Liens utiles</h1>
        <div class="liens">
          <a href="https://twitter.com/AgarthaUHC" target="_blank">Twitter</a>
          <a href="https://discord.gg/43AqytY" target="_blank">Discord</a>
          <a href>Mentions légales</a>
        </div>
      </div>
    </section>
    <section class="footer">
      <h3>© 2020 Agartha | Agartha n'est pas affilié a Mojang</h3>
      <h3>
        Développé par
        <span>Théo Freville</span> (DrPsykoz)
      </h3>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      button_ip: "Copier l'ip",
    };
  },
  methods: {
    copyToClipboard(str) {
      const el = document.createElement("textarea");
      el.addEventListener("focusin", (e) => e.stopPropagation());
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.button_ip = "IP Copiée !";
      setTimeout(() => {
        this.button_ip = "Copier l'ip";
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
#footer {
  .pre-footer {
    min-height: 400px;
    max-height: 400px;
    background-image: linear-gradient(to top, rgba(47, 54, 64, 1), transparent),
      linear-gradient(to bottom, rgba(47, 54, 64, 1), transparent),
      url("../assets/accueil/background.jpg");
    color: white;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 50px 0;

    .serveur {
      display: flex;
      .logo {
        margin: auto;
        padding: 0 20px;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .texte {
        text-align: left;
        h1 {
          font-weight: 900;
        }
        button {
          margin-top: 15px;
        }
      }
    }

    .liens-utiles {
      text-align: left;
      max-width: 30vw;
      h1 {
        text-transform: uppercase;
        font-weight: 900;
      }
      .liens {
        display: flex;
        flex-wrap: wrap;

        a {
          display: inline-block;
          padding: 10px 20px;
          text-decoration: none;
          color: white;
          font-weight: 500;
          font-size: 18px;

          &::before {
            content: "⮞ ";
          }
        }
      }
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      max-height: 800px;
      .serveur {
        justify-content: center;

        .logo {
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
        }

        .texte {
          flex-grow: 1;
        }
      }

      .liens-utiles {
        text-align: center;
        margin: auto;
        margin-top: 20px;
        max-width: 80vw;
      }
    }

    @media screen and (max-width: 600px) {
      .serveur {
        .logo {
          display: none;
        }
        .texte {
          text-align: center;
        }
      }
    }
  }
  .footer {
    background-color: #2f3640;
    min-height: 80px;
    color: white;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-size: 18px;
      line-height: 0px;
      font-weight: 100;

      span {
        font-weight: 500;
      }
    }

    @media screen and (max-width: 450px) {
      min-height: 80px;
      h3 {
        font-size: 13px;
        line-height: 0;
      }
    }
  }
}
</style>
