<template>
    <!--  Catagories  -->
    <div class="catagories-menu">
        <ul id="menu-content2" class="menu-content collapse show">
            <!-- Single Item -->
            <li data-toggle="collapse" data-target="#clothing">
                <a href="#">Categories</a>
                <ul class="sub-menu collapse show" id="clothing">
                    <div v-for="category in categories" :key="category.id">
                        <li v-if="category.slug === category_slug">{{ category.name }}</li>
                        <li>
                            <router-link :to="`/shop/${category.slug}`" v-if="category.slug !== category_slug">{{
                                category.name }}</router-link>
                        </li>
                    </div>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "category",
        data() {
            return {
                category_slug: this.$route.params.category_slug
            };
        },
        computed: {
            categories() {
                return this.$store.getters.categories;
            }
        }
    };

</script>
