<template>
    <div v-if="active">
      <div class="category_full_width" @mouseleave="activeMega">
        <div class="list">
          <b-row>
            <b-col lg="3" md="3" sm="12" class="left-line" v-for="category in categories" :key="category.id">
              <div class="title">
                <router-link :to="`/shop/${category.slug}`" v-if="category.children" ><span @click="activeMega">{{ category.name }}</span></router-link>
              </div>
              <ul class="sub_cat">
                <li class="sub_cat_list" v-for="category_child in category['children']" :key="category_child.id">
                  <router-link :to="`/shop/${category_child.slug}`"><span @click="activeMega">{{ category_child.name }}</span></router-link>
                </li>
              </ul>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "megaMenu",
  computed: {
    active() {
      return this.$store.getters.activeMega;
    },
    categories() {
      return this.$store.getters.Allcategories;
    }
  },
  mounted() {
    this.$store.dispatch("getCategories");
  },
  methods: {
    activeMega() {
      this.$store.commit("activeMega");
    }
  }
};
</script>

<style scoped>
.megaCategory {
  position: relative;
}

.category_full_width {
  position: relative;
  height: 80%;
  transition: all 10.5s;
  z-index: 1000;
}

.category_full_width .list {
  width: 100%;
  background-color: white;
  display: block;
  margin: 0 auto;
  position: absolute;
  float: none;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 18px;
  border-bottom: 1px solid #f2f4f8;
  padding: 8px 12px;
  font-family: "Roboto Condensed", sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}

.sub_cat {
  list-style: none;
  margin-left: -20px;
}

.sub_cat_list {
  font-size: 16px;
  padding: 8px 12px;
  font-family: "Roboto Condensed", sans-serif;
}

.sub_cat_list:first-child {
  margin-top: 5px;
}

.left-line:not(:last-child) {
  border-right: 1px solid #f2f4f8;
}
</style>
