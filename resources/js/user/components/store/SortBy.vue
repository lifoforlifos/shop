<template>
                        <!-- Sorting -->
                    <div class="product-sorting d-flex">
                      <p>Sort by:</p>
                      <form action="#" method="get">
                        <select class="w-100" v-model="selected" @change="filter()" id="sortByselect">
                          <option value="highest">Highest Rated</option>
                          <option value="newest">Newest</option>
                          <option value="hight">Price: $$ - $</option>
                          <option value="low">Price: $ - $$</option>
                        </select>
                        <input type="submit" class="d-none" value="">
                      </form>
                    </div>
</template>

<script>
export default {
  name: "sortby",
  computed: {
    selected: {
      get() {
        return this.$store.state.selected;
      },
      set(value) {
        this.$store.commit("selected", value);
      }
    }
  },
  methods: {
    filter() {
      this.$store.dispatch("getProducts");
    }
  }
};
</script>

