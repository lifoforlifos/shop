<template>
  <div>
    <!-- ##### Breadcumb Area Start ##### -->
    <div class="breadcumb_area bg-img" style="background-image: url(/img/bg-img/breadcumb2.jpg);">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="page-title text-center">
              <h2>{{category_slug}}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Breadcumb Area End ##### -->

    <!-- ##### Shop Grid Area Start ##### -->
    <section class="shop_grid_area section-padding-80">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3">
            <div class="shop_sidebar_area">

              <!-- ##### Single Widget ##### -->
              <div class="widget catagory mb-50">
                <!-- Widget Title -->
                <h6 class="widget-title mb-30">Catagories</h6>
                <app-categories></app-categories>
              </div>
              <!-- ##### Single Widget ##### -->
              <div class="widget brands mb-50">
                  <app-brands></app-brands>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-8 col-lg-9">
            <div class="shop_grid_product_area">
              <div class="row">
                <div class="col-12">
                  <div class="product-topbar d-flex align-items-center justify-content-between">
                    <!-- Total Products -->
                    <div class="total-products">
                      <p><span></span> products found</p>
                    </div>
                    <app-sort-by></app-sort-by>
                  </div>
                </div>
              </div>
                  <app-products></app-products>
            </div>
                <app-paginations></app-paginations>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### Shop Grid Area End ##### -->
  </div>
</template>

<script>
import Brands from "./Brands";
import Categories from "./Categories";
import Products from "./Products";
import Paginations from "./Paginations";
import SortBy from "./SortBy";
export default {
  name: "shop",
  components: {
    appBrands: Brands,
    appCategories: Categories,
    AppProducts: Products,
    AppPaginations: Paginations,
    AppSortBy: SortBy
  },
  data() {
    return {
      category_slug: this.$route.params.category_slug
    };
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  methods: {
    filter() {
      this.$store.dispatch("getProducts");
    }
  }
};
</script>
