<template>

  <!-- ##### Single Product Details Area Start ##### -->
  <section class="single_product_details_area d-flex align-items-center" v-if="product">

    <!-- Single Product Thumb -->
    <div class="single_product_thumb clearfix">
      <div class="product_thumbnail_slides owl-carousel">
        <swiper :options="swiperOption" v-for="image in product.images" :key="image.id">
          <swiper-slide> <img :src="`https://immense-mesa-40058.herokuapp.com/storage/images_product/${image.file}`"
              alt="">
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>

    <!-- Single Product Description -->
    <div class="single_product_desc clearfix">
      <span>{{ product.brands[0].brand_name }}</span>
        <h2>{{ product.name }}</h2>
      <p class="product-price"><span class="old-price">{{
          currency_info.currency
          }} {{ (product.old_price * currency_info.rate).toFixed(0)}}</span> {{
        currency_info.currency
        }} {{ (product.price * currency_info.rate).toFixed(0)}}</p>
      <p class="product-desc">{{ product.description }}</p>
      <!-- Cart & Favourite Box -->
      <div class="cart-fav-box d-flex align-items-center">
        <!-- Cart -->
        <button name="addtocart" class="btn essence-btn" @click="addToCart(product.name, product.price, product.images[0].file, product.id)">Add
          to cart</button>
        <!-- Favourite -->
        <div class="product-favourite ml-4">
          <a href="#" @click="wishlist(product.id)" class="favme fa fa-heart"></a>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <h5 class="text-center">There is no product with this name! please try later</h5>
  </section>
  <!-- ##### Single Product Details Area End ##### -->
</template>
<script>
import axios from "axios";
import { addItemToCart, countCart, loadCart } from "../../helpers/cart";
export default {
  created() {
    if (this.products.length) {
      this.product = this.products.find(
        product => product.id == this.$route.params.id
      );
    } else {
      axios.get(`/api/products/${this.$route.params.id}`).then(response => {
        this.product = response.data.product;
      });
    }
  },
  data() {
    return {
      product: "",
      currency_info: "",
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    }
  },
  methods: {
    addToCart(name, price, img, id) {
      this.$store.commit("addToCart", {
        name: name,
        price: price,
        img: img,
        id: id,
        count: 1
      });
    }
  }
};
</script>
