<template>
    <div>
        <div v-for="(category, i) in categories" :key="i">
            <router-link :to="`/shop/${category.slug}`" v-if="category.children">
                <h4>{{ category.name }}</h4>
            </router-link>
            <div class="row justify-content-center" style="position: relative;">
                <!-- Single Catagory -->
                <div class="col-12 col-sm-6 col-md-4" v-for="(category_children, i) in category.children" :key="i">
                    <div v-if="i < 3">
                        <img :src="`https://immense-mesa-40058.herokuapp.com/storage/category_image/${category_children.image}`"
                            class="justify-content-center" alt="" style="position: absolute;">
                        <div class="single_catagory_area d-flex align-items-center justify-content-center bg-img">
                            <div class="catagory-content">
                                <router-link :to="`/shop/${category_children.slug}`" v-if="category.children">{{
                                    category_children.name }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "categories",
        computed: {
            categories() {
                return this.$store.getters.Allcategories
            }
        }
    }

</script>
