<template>
    <section class="new_arrivals_area section-padding-80 clearfix">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-heading text-center">
                        <h2>Popular Products</h2>
                    </div>
                </div>
            </div>
        </div>
        <swiper :options="swiperOption" class="container">
            <swiper-slide v-for="product in popular_products" :key="product.id">
                <!-- Single Product -->
                <div class="single-product-wrapper">
                    <!-- Product Image -->
                    <div class="product-img">
                        <div v-for="(img, index) in product.images" :key="img.id">
                            <div v-if="index === 0">
                                <img :src="'/storage/images_product/' + img.file"
                                    alt="">
                            </div>
                            <!-- Hover Thumb -->
                            <div v-else-if="index === 1">
                                <img class="hover-img" :src="'/storage/images_product/' + img.file"
                                    alt="">
                            </div>
                            <!-- Product Badge -->
                            <div class="product-badge offer-badge" v-if="product.old_price">
                                <span>{{ product.percentage_off }}%</span>
                            </div>
                        </div>
                    </div>
                    <!-- Product Description -->
                    <div class="product-description">
                        <span>mango</span>
                        <router-link :to="`/shop/single-product/${product.id}`">
                            <h6>{{ product.name }}</h6>
                        </router-link>

                    </div>
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>
</template>

<script>
export default {
  name: "popular_product",
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed: {
    popular_products() {
      return this.$store.getters.popular_products;
    }
  }
};
</script>
