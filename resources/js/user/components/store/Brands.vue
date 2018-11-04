<template>
    <!-- Widget Title 2 -->
    <div>
        <p class="widget-title2 mb-30">Brands</p>
        <div class="widget-desc">
            <ul>
                <li v-for="(brand, index) in brands" :key="brand.id">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" :id="index" v-model="brand_name" @change="filter()"
                            :value="brand.brand_name">
                        <label class="custom-control-label" :for="index">{{
                            brand.brand_name }}</label>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
export default {
  name: "brands",
  computed: {
    brand_name: {
      get() {
        return this.$store.state.brand_name;
      },
      set(value) {
        this.$store.commit("brandName", value);
      }
    },
    brands() {
      return this.$store.getters.brands;
    }
  },
  methods: {
    filter() {
      this.$store.dispatch("getProducts");
    }
  }
};
</script>
