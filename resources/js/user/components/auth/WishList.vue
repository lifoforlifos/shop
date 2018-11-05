<template>
    <div class="container">
            <div v-if="wishlists.length > 0">

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>image</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in wishlists" :key="post.id">
                    <td>
                        <router-link class="recipe__inner" :to="`/posts/${post.id}`">
                            <img :src="'/storage/images_product/' + post.images[0].file" alt="" class="img-fluids">
                        </router-link>
                    </td>
                    <td>{{ post.name }}</td>
                    <td>{{ post.slug }}</td>
                    <td>{{ post.price }}</td>
                </tr>
            </tbody>
        </table>
            </div>
        <div v-else>
            You have no favorite items
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      wishlists: ""
    };
  },
  created() {
    axios
      .get("/api/wishlists/", {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.currentUser.token}`
        }
      })
      .then(res => {
        this.wishlists = res.data.wishlists;
      });
  }
};
</script>
<style>
.img-fluids {
  width: 100px;
  height: 100px;
}
</style>
