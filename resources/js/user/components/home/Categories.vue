<template>
    <div>
        <div v-for="(category, i) in categories" :key="i">
            <router-link :to="`/shop/${category.slug}`" v-if="category.children">
                <h4>{{ category.name }}</h4>
            </router-link>
            <!-- ##### Top Catagory Area Start ##### -->
            <div class="top_catagory_area section-padding-80 clearfix">
                <div class="container">
                    <div class="row justify-content-center">
                        <!-- Single Catagory -->
                        <div class="col-12 col-sm-6 col-md-4" v-for="(category_children, i) in category.children" :key="i">
                            <template v-if="i < 3">
                                <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img"
                                    :style="{ backgroundImage: `url('/storage/category_image/${category_children.image}')` }">
                                    <div class="catagory-content">
                                        <router-link :to="`/shop/${category_children.slug}`" v-if="category.children">{{
                                            category_children.name }}</router-link>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ##### Top Catagory Area End ##### -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "categories",
        computed: {
            categories() {
                return this.$store.getters.Allcategories;
            }
        }
    };
</script>
