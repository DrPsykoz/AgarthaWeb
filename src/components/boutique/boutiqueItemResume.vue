<template>
  <div class="boutique-basket-content-item" v-if="selected_product != null">
    <span>{{ selected_product.categorie }}</span>
    <p>{{ selected_product.title }}</p>
    <p>{{ selected_product.price }}€</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>