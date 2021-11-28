<template>
  <div class="statistiques">
    <section class="title">
      <div class="image"></div>
      <div class="content">
        <h1>STATISTIQUES</h1>
        <h3>
          Tu pense etre le
          <span>MEILLEUR</span> joueur du serveur ? verifie le grace aux
          <span>STATISTIQUES</span> !
        </h3>
      </div>
      <a href="#classement">
        <img
          class="arrow"
          src="https://img.icons8.com/android/24/000000/expand-arrow.png"
        />
      </a>
    </section>
    <section id="classement">
      <h1>Les statistiques arrivent bientôt !</h1>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.statistiques {
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
        url("../assets/statistiques/background.jpg");
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

  #classement {
    min-height: calc(100vh);
    background-color: #2f3640;
    display: flex;
    flex-direction: row;
    padding: 200px 0;
    color: white;

    h1 {
      margin: auto;
    }
  }
}
</style>
