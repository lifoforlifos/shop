<template>
    <!-- Single Product -->
    <div class="row">
        <div class="col-12 col-sm-6 col-lg-4" v-for="product in products" :key="product.id">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img">
                    <div v-for="(img, index) in product.images" :key="img.id">
                        <div v-if="index === 0">
                            <img :src="'https://immense-mesa-40058.herokuapp.com/storage/images_product/' + img.file"
                                alt="">
                        </div>
                        <!-- Hover Thumb -->
                        <div v-else-if="index === 1">
                            <img class="hover-img" :src="'https://immense-mesa-40058.herokuapp.com/storage/images_product/' + img.file"
                                alt="">
                        </div>
                        <!-- Product Badge -->
                        <div class="product-badge offer-badge" v-if="product.old_price">
                            <span>{{ product.percentage_off }}%</span>
                        </div>
                        <!-- Favourite -->
                        <div class="product-favourite">
                            <a class="favme fa fa-heart" @click="wishlist(product.id)"></a>
                        </div>
                    </div>
                </div>

                <!-- Product Description -->
                <div class="product-description">
                    <span>topshop</span>
                    <router-link :to="`/shop/single-product/${product.id}`">
                        <h6>{{ product.name }}</h6>
                    </router-link>

                    <div class="hover-content">
                        <!-- Add to Cart -->
                        <div class="add-to-cart-btn">
                            <button @click="addToCart(product.name, product.price, product.images[0].file, product.id)"
                                class="btn essence-btn">Add
                                to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  name: "products",
  computed: {
    products() {
      return this.$store.getters.products;
    }
  }
};
</script>
