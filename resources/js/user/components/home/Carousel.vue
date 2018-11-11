<template>
    <!-- ##### Welcome Area Start ##### -->
    <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab"
        :interval="4000" img-width="1024" img-height="200">
        <!-- Text slides with image -->
        <b-carousel-slide v-for="slider in sliders" :key="slider.id" :img-src="`/storage/slider_image/${slider.file}`">
            <router-link :to="`/shop/${slider.category_slug}`">
                <div class="slider-content">
                    <h5>{{ slider.headline }}</h5>
                    <p>{{ slider.paragraph }}</p>
                    <button class="btn essence-btn">Shop Now</button>
                </div>
            </router-link>
        </b-carousel-slide>
    </b-carousel>
    <!-- ##### Welcome Area End ##### -->
</template>

<script>
export default {
  name: "carousel",
  computed: {
    sliders() {
      return this.$store.getters.sliders;
    }
  }
};
</script>
