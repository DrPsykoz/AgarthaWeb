<template>
  <div id="nav" :class="nav_class">
    <div class="burger" @click="smallHidden = !smallHidden">
      <img src="https://image.flaticon.com/icons/svg/2099/2099153.svg" alt />
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="/">ACCUEIL</router-link>
      </li>
      <li>
        <router-link to="/boutique">BOUTIQUE</router-link>
      </li>
      <li>
        <router-link to="/statistiques">STATISTIQUES</router-link>
      </li>
    </ul>
    <div class="nav-logo"></div>
    <div class="nav-ip">
      <button @click="copyToClipboard('play.drpsykoz.fr')">
        {{ button_ip }}
      </button>
      <div class="flex flex-column nav-ip-info">
        <h1>PLAY.DRPSYKOZ.FR</h1>
        <h3>Serveur disponible de la 1.8 a la 1.15</h3>
      </div>
    </div>

    <div :class="smallHidden ? 'nav-fixed hide' : 'nav-fixed '">
      <div class="nav-fixed-close">
        <img
          src="https://image.flaticon.com/icons/png/512/1828/1828774.png"
          @click="smallHidden = !smallHidden"
        />
      </div>
      <ul class="nav-fixed-links">
        <li @click="smallHidden = !smallHidden">
          <router-link to="/">ACCUEIL</router-link>
        </li>
        <li @click="smallHidden = !smallHidden">
          <router-link to="/boutique">BOUTIQUE</router-link>
        </li>
        <li @click="smallHidden = !smallHidden">
          <router-link to="/statistiques">STATISTIQUES</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      button_ip: "Copier l'ip",
      nav_class: "notsticky",
      smallHidden: true
    };
  },
  methods: {
    copyToClipboard(str) {
      const el = document.createElement("textarea");
      el.addEventListener("focusin", e => e.stopPropagation());
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.button_ip = "IP Copiée !";
      setTimeout(() => {
        this.button_ip = "Copier l'ip";
      }, 1500);
    }
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.getElementById("nav");
      if (window.scrollY > navBar.offsetTop) {
        this.nav_class = "sticky";
      } else {
        this.nav_class = "notsticky";
      }
    };
  }
};
</script>

<style lang="scss">
#nav {
  display: flex;
  z-index: 900;
  position: fixed;
  top: 0;
  height: 90px;
  width: 100vw;
  color: white;
  line-height: 90px;
  margin: 0;
  outline: none;

  .nav-fixed {
    position: fixed;
    background-color: #2f3640;
    width: 100%;
    height: 100%;
    z-index: 1000;

    .nav-fixed-close {
      display: flex;
      justify-content: space-evenly;
      img {
        filter: invert(1);
        height: 50px;
        width: 50px;
        padding: 10px;
        cursor: pointer;
      }
    }

    .nav-fixed-links {
      display: flex;
      flex-direction: column;

      li {
        text-align: left;
        list-style: none;
        a {
          text-decoration: none;
          color: white;
          font-weight: bold;
          font-size: 25px;
        }
      }
    }
  }

  .burger {
    display: none;
  }

  .nav-links {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin: auto;
    flex-grow: 2;

    li {
      list-style: none;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-weight: bold;
        font-size: 25px;
        color: white;

        &.router-link-exact-active {
          color: #fbc531;
        }

        &:hover {
          color: #fbc531;
        }
      }
    }
  }

  .nav-logo {
    flex-grow: 3;
    display: flex;
    justify-content: center;
  }

  .nav-ip {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .nav-ip-info {
      padding-right: 5px;
      h1,
      h3 {
        line-height: 35px;
        margin: 0;
      }

      h1 {
        font-size: 30px;
        font-weight: 500;
        margin-bottom: -5px;
        margin-top: 15px;
      }

      h3 {
        font-size: 17px;
        font-weight: 100;
      }
    }
  }

  @media screen and (max-width: 1300px) {
    height: 60px;
    line-height: 60px;

    .nav-links {
      li {
        a {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }

    button {
      height: 40px;
      line-height: 40px;
      font-size: 15px;
    }

    .nav-ip {
      .nav-ip-info {
        h1 {
          font-size: 26px;
          line-height: 20px;
        }

        h3 {
          font-size: 15px;
          line-height: 28px;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    .nav-links {
      flex-grow: 1;
      justify-content: space-around;
    }
    .nav-logo {
      flex-grow: 0;
    }
    .nav-ip {
      display: none;
      flex-grow: 0;
    }
  }

  @media screen and (max-width: 600px) {
    .burger {
      display: block;
      img {
        height: 60px;
        padding: 10px;
        filter: invert(1);
        cursor: pointer;
      }
    }
    .nav-links {
      display: none;
    }
  }
}

.notsticky {
  transition: 0.5s;
  background-color: transparent;
}

.sticky {
  box-shadow: rgba($color: #000000, $alpha: 0.5) 0px 0px 25px 0px;
  background-color: #2f3640;
  transition: 0.5s;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.hide {
  display: none;
}

button {
  background-color: #fbc531;
  height: 55px;
  border-radius: 50px;
  border: none;
  color: #2f3640;
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 30px;
  align-self: center;
  transition: 0.3s;
  position: relative;
  line-height: 55px;

  &:hover {
    background-color: #e1b12c;
    transition: 0.3s;
    color: white;
  }
}
</style>
