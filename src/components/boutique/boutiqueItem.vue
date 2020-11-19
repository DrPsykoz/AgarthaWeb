<template>
  <div class="boutique-item">
    <div class="boutique-item-image">
      <h2 class="boutique-item-image-title-price">{{ item.price }}€</h2>
      <h2>{{ item.title }}</h2>
      <h2 class="boutique-item-promotion" v-if="item.offer">{{ item.offer }}</h2>
      <img :src="item.img" alt />
      <p>{{ item.description }}</p>
    </div>
    <h3 @click="$emit('buy')">ACHETER</h3>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style lang="scss">
.boutique-item {
  display: flex;
  position: relative;
  justify-content: space-around;
  margin: 0 10px 70px 10px;

  @media screen and (max-width: 600px) {
    margin: 0;
  }

  .boutique-item-image {
    position: relative;
    width: 300px;
    height: 300px;
    background-color: rgba($color: #000000, $alpha: 0.1);
    color: white;

    .boutique-item-image-title-price {
      position: absolute;
      background-color: #e1b12c;
      color: black;
      flex-grow: 1;
      top: 0;
      right: 0;
      font-size: 25px;
      line-height: 25px;
      margin: -15px;
      padding: 5px 10px;

      border-radius: 20px;
      border-bottom-left-radius: 0;
    }

    h2 {
      font-weight: 900;
      flex-grow: 9;
    }

    .boutique-item-promotion {
      position: absolute;
      top: 30px;
      right: 10px;
      font-size: 20px;
      color: white;
      background-color: #27ae60;
      padding: 2px 5px;
      border-radius: 5px;
      font-weight: 500;
    }

    img {
      height: 55%;
    }
  }

  h3 {
    font-weight: bold;
    position: absolute;
    bottom: -25px;
    padding: 5px 20px;
    background-color: #fbc531;
    border-radius: 20px;
    text-align: center;
    box-shadow: rgba($color: #000000, $alpha: 0.2) 0 0 5px 5px;
    cursor: pointer;
    transition: 0.2s;

    &:active,
    &:hover {
      transition: 0.2s;
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 600px) {
    transform: scale(0.7);

    h3 {
      transform: scale(1.4);
    }
  }
}
</style>