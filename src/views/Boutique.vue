<template>
  <div class="boutique">
    <section class="title">
      <div class="image"></div>
      <div class="content">
        <h1>BOUTIQUE</h1>
        <h3>
          aide a
          <span>FINANCER</span> le serveur en achetant des
          <span>GRADES, COINS</span> ou grace aux
          <span>DONS</span>
        </h3>
      </div>
      <a href="#boutique-section">
        <img class="arrow" src="https://img.icons8.com/android/24/000000/expand-arrow.png" />
      </a>
    </section>
    <section class="boutique-section" id="boutique-section">
      <div :class="username === null ? 'user-selection' : 'user-selection hide'">
        <h1>Pseudo Minecraft:</h1>
        <input type="text" v-model="input_username" />
        <a href="#boutique-section">
          <button @click="username = input_username">Continuer</button>
        </a>
      </div>
      <div :class="username === null ? 'hide' : ''">
        <div class="boutique-login-infos">
          <h3>
            Connecté en tant que :
            <span>{{ username }}</span>
          </h3>
          <button @click="username = null">Changer de pseudo</button>
        </div>
        <div v-if="selected_product == null">
          <div class="boutique-categories">
            <button
              v-for="categorie in categories"
              :key="categorie.title"
              :class="selected_categorie === categorie.title ? 'selected' : ''"
              @click="selected_categorie = categorie.title"
            >{{ categorie.title }}</button>
          </div>
          <div class="boutique-items">
            <boutiqueItem
              v-for="item in products.filter(
                x => x.categorie === selected_categorie
              )"
              :key="item.title"
              :item="item"
              @buy="selected_product = item"
            />
          </div>
        </div>
        <div
          :class="
            selected_product == null
              ? 'boutique-basket hide'
              : 'boutique-basket'
          "
        >
          <div
            :class="
              paypal.paid
                ? 'boutique-basket-content hide'
                : 'boutique-basket-content'
            "
          >
            <button @click="selected_product = null">Annuler</button>
            <h1>Résumé de la commande:</h1>
            <div class="boutique-basket-content-item" v-if="selected_product != null">
              <span>{{ selected_product.categorie }}</span>
              <p>{{ selected_product.title }}</p>
              <p>{{ selected_product.price }}€</p>
            </div>
            <h3></h3>
            <div ref="paypal" class="paypal-buttons"></div>
          </div>
          <div v-if="paypal.paid" class="boutique-basket-confirm">
            <div v-if="paypal.success" class="boutique-basket-confirm-success">
              <h1>Achat effectué !</h1>
              <h3>Connecte toi sur le serveur pour recevoir ton achat !</h3>
              <div class="boutique-basket-content-item" v-if="selected_product != null">
                <span>{{ selected_product.categorie }}</span>
                <p>{{ selected_product.title }}</p>
                <p>{{ selected_product.price }}€</p>
              </div>
            </div>
            <div v-else class="boutique-basket-confirm-failed">
              <h1>Achat non effectué !</h1>
              <h3>Il y a eu un probléme lors du paiement merci de reesayer.</h3>
              <div class="boutique-basket-content-item" v-if="selected_product != null">
                <span>{{ selected_product.categorie }}</span>
                <p>{{ selected_product.title }}</p>
                <p>{{ selected_product.price }}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Api from "@/services/Api";

import boutiqueItem from "../components/boutique/boutiqueItem";

export default {
  components: {
    boutiqueItem
  },
  data() {
    return {
      paypal: {
        loaded: false,
        paid: false,
        success: false
      },

      input_username: "",
      username: null,

      categories: [{ title: "Grades" }, { title: "Coins" }, { title: "Dons" }],
      products: [
        {
          title: "VIP",
          categorie: "Grades",
          price: 10,
          description: "Grade VIP valable a vie",
          img: require("../assets/boutique/vip.png"),
          key: "rank_vip",
          amount: 1
        },
        {
          title: "Reptilien",
          categorie: "Grades",
          price: 30,
          description: "Grade Reptilien valable a vie",
          img: require("../assets/boutique/reptilien.png"),
          key: "rank_reptilien",
          amount: 1
        },
        {
          title: "Pack de 250 coins",
          categorie: "Coins",
          price: 0,
          description: "Un petit tas de coins",
          img: require("../assets/boutique/coins-tiny.png"),
          key: "coins",
          amount: 250
        },
        {
          title: "Pack de 500 coins",
          offer: "+ 50 gratuits",
          categorie: "Coins",
          price: 1,
          description: "Un tas de coins",
          img: require("../assets/boutique/coins-small.png"),
          key: "coins",
          amount: 550
        },
        {
          title: "Pack de 1000 coins",
          offer: "+ 200 gratuits",
          categorie: "Coins",
          price: 2,
          description: "Un gros tas de coins",
          img: require("../assets/boutique/coins-medium.jpg"),
          key: "coins",
          amount: 1200
        },
        {
          title: "Pack de 2500 coins",
          offer: "+ 600 gratuits",
          categorie: "Coins",
          price: 5,
          description: "Un coffre de coins",
          img: require("../assets/boutique/coins-large.png"),
          key: "coins",
          amount: 3100
        },
        {
          title: "Pack de 5000 coins",
          offer: "+ 2500 gratuits",
          categorie: "Coins",
          price: 10,
          description: "Deux coffres de coins",
          img: require("../assets/boutique/coins-extreme.png"),
          key: "coins",
          amount: 7500
        }
      ],

      selected_product: null,
      selected_categorie: "Grades"
    };
  },
  mounted: function() {
    const script = document.createElement("script");

    let inDev = true;
    let client_dev =
      "AeaZZ736T4eOgbuvohs1EZRYJe6QuT0eHTTAdZHBOl961_5L4Zv13B0PUFaTg3zs2eP2wsvY46TndlcR";
    let client_prod =
      "AU2UIvwMfFI4JUg6t1CLxW16o-QDVKo1VydRn2Z3ea7Kmmqv4iMfkUIpoe3Fl_jICvTY3rSb0L-GsZ7W";

    let source =
      "https://www.paypal.com/sdk/js?currency=EUR&client-id=" +
      (inDev ? client_dev : client_prod);
    console.log(source);
    script.src = source;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.paypal.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.selected_product.description,
                  amount: {
                    currency_code: "EUR",
                    value: this.selected_product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paypal.paid = true;
            this.paypal.success = true;
            console.log(order);
            this.createSale();
          },
          onError: err => {
            this.paypal.paid = true;
            this.paypal.success = false;
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    createSale: function() {
      Api().post("/webitems", {
        username: this.username,
        key: this.selected_product.key,
        amount: this.selected_product.amount
      });
    }
  }
};
</script>

<style lang="scss">
* {
  outline: none;
}

.boutique {
  user-select: none;
  display: flex;
  flex-direction: column;

  .title {
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
        url("../assets/boutique/background.jpg");
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

  .boutique-section {
    background-color: #2f3640;
    display: flex;
    flex-direction: column;
    padding: 200px 0;

    @media screen and (max-width: 600px) {
      padding: 100px 0;
    }

    .user-selection {
      border: solid 3px white;
      padding: 30px 50px;
      width: 500px;
      margin: auto;
      display: flex;
      flex-direction: column;
      text-align: center;

      h1 {
        text-transform: uppercase;
        color: white;
        font-weight: 900;
        line-height: 30px;
        margin-top: 0;
        margin-bottom: 30px;
      }

      input {
        border: none;
        border-radius: 20px;
        font-size: 20px;
        padding: 5px 0;
        text-align: center;
        font-weight: 100;
        outline: none;
        &:active {
          box-shadow: rgba($color: #000000, $alpha: 0.2) 0 0 5px 5px;
        }

        &:focus {
          box-shadow: rgba($color: #000000, $alpha: 0.2) 0 0 5px 5px;
        }
      }

      button {
        margin-top: 30px;
      }

      @media screen and (max-width: 600px) {
        width: 95%;
        padding: 30px 10px;
      }
    }

    .boutique-login-infos {
      color: white;
      display: flex;
      width: 100%;
      padding: 10px 20px;
      margin: auto;
      text-align: center;
      justify-content: flex-start;
      background-color: rgba($color: #000000, $alpha: 0.05);
      margin-bottom: 20px;

      h3 {
        font-weight: 100;

        span {
          font-weight: 500;
        }
      }

      button {
        margin: 0 20px;
        height: 40px;
        line-height: 42px;
      }

      @media screen and (max-width: 600px) {
        flex-direction: column;

        button {
          margin-bottom: 20px;
          width: 100%;
        }
      }
    }

    .boutique-categories {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      button {
        border-radius: 0;
        border-bottom: 5px #fbc531 solid;
        outline: none;
        cursor: pointer;
      }

      .selected {
        background-color: #e1b12c;
        color: white;
        &::after {
          outline: none;
          content: "";
          position: absolute;
          left: calc(50% - 20px);
          bottom: -20px;

          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;

          border-top: 20px solid #fbc531;
        }
      }

      @media screen and (max-width: 600px) {
        button {
          flex-grow: 1;
          padding: 0 0;
        }
      }
    }

    .boutique-items {
      margin: 100px auto;
      display: flex;
      justify-content: space-around;
      max-width: 1000px;
      flex-wrap: wrap;

      @media screen and (max-width: 600px) {
        flex-direction: column;
        margin: 20px 0;
        .boutique-item {
          transform: scale(0.7);

          h3 {
            transform: scale(1.4);
          }
        }
      }
    }

    .boutique-basket {
      .boutique-basket-content {
        display: flex;
        flex-direction: column;
        text-align: left;
        color: white;
        width: 80%;
        margin: auto;
        justify-content: flex-start;

        button {
          height: 30px;
          line-height: 30px;
          background-color: #c0392b;
        }

        .boutique-basket-content-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          background-color: rgba($color: #000000, $alpha: 0.1);
          font-weight: 100;
          padding: 5px 5px;
          text-align: center;
          line-height: 20px;
          margin: 50px 0;

          p {
            font-size: 25px;
            text-align: center;
            margin: 0;
            padding: 5px 30px;
            background-color: rgba($color: #000000, $alpha: 0.1);
            margin: 0 0 0 10px;
            flex-grow: 1;
          }

          span {
            background-color: #fbc531;
            padding: 5px;
            font-size: 20px;
            min-width: 100px;
          }
        }

        .paypal-buttons {
          width: 500px;
          margin: auto;
          display: flex;
          flex-direction: row;
        }

        @media screen and (max-width: 600px) {
          width: 100%;
          h1 {
            width: 80%;
            margin: auto;
            margin-top: 10px;
          }

          .boutique-basket-content-item {
            margin: 30px 0;

            span {
              min-width: 20px;
              flex-grow: 1;
            }
          }

          .paypal-buttons {
            width: 95%;
          }
        }
      }

      .boutique-basket-confirm {
        color: white;
        padding: 50px 0;

        .boutique-basket-confirm-success {
          h1 {
            text-transform: uppercase;
            font-weight: 900;
            color: #2ecc71;
          }

          h3 {
            font-weight: 100;
          }

          .boutique-basket-content-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            background-color: rgba($color: #2ecc71, $alpha: 0.1);
            font-weight: 100;
            padding: 5px 5px;
            text-align: center;
            line-height: 20px;
            width: 100%;
            margin: auto;
            max-width: 600px;

            p {
              font-size: 25px;
              text-align: center;
              margin: 0;
              padding: 5px 30px;
              background-color: rgba($color: #2ecc71, $alpha: 0.2);
              margin: 0 0 0 10px;
              flex-grow: 1;
            }

            span {
              background-color: #2ecc71;
              padding: 5px;
              font-size: 20px;
              min-width: 100px;
            }
          }

          @media screen and (max-width: 600px) {
            .boutique-basket-content-item {
              margin: 30px 0;

              span {
                min-width: 20px;
                flex-grow: 1;
              }
            }
          }
        }

        .boutique-basket-confirm-failed {
          h1 {
            text-transform: uppercase;
            font-weight: 900;
            color: #c0392b;
          }

          h3 {
            font-weight: 100;
          }

          .boutique-basket-content-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            background-color: rgba($color: #c0392b, $alpha: 0.1);
            font-weight: 100;
            padding: 5px 5px;
            text-align: center;
            line-height: 20px;
            width: 100%;
            margin: auto;
            max-width: 600px;

            p {
              font-size: 25px;
              text-align: center;
              margin: 0;
              padding: 5px 30px;
              background-color: rgba($color: #c0392b, $alpha: 0.2);
              margin: 0 0 0 10px;
              flex-grow: 1;
            }

            span {
              background-color: #c0392b;
              padding: 5px;
              font-size: 20px;
              min-width: 100px;
            }
          }

          @media screen and (max-width: 600px) {
            .boutique-basket-content-item {
              margin: 30px 0;

              span {
                min-width: 20px;
                flex-grow: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
