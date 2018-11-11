<template>
  <div class="row">
    <!--/.col-->
    <div class="col-lg-12">
      <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.slug }}</td>
              <td>{{ product.price }}</td>
              <td>
                <router-link class="recipe__inner" :to="`/posts/single-post/${product.id}`"><button class="btn btn-warning">Edit</button></router-link>
              </td>
              <td><button class="btn btn-danger" @click="deleteProduct(product.id, index)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <nav class="center-pagination">
          <ul class="pagination">
            <li v-bind:class="{ disabled: !pagination.first_link} " class="page-item"><a class="page-link"
                @click="fetch(pagination.first_link)">&laquo;</a></li>
            <li v-bind:class="{ disabled: !pagination.prev_link} " class="page-item"><a class="page-link"
                @click="fetch(pagination.prev_link)">&lt;</a></li>
            <li v-for="n in pagination.last_page" v-bind:key="n" v-bind:class="{ active: pagination.current_page == n} "
              class="page-item"><a class="page-link" @click="fetch(pagination.path_page + n)">{{ n }}</a></li>
            <li v-bind:class="{ disabled: !pagination.next_link} " class="page-item"><a class="page-link"
                @click="fetch(pagination.next_link)">&gt;</a></li>
            <li v-bind:class="{ disabled: !pagination.last_link} " class="page-item"><a class="page-link"
                @click="fetch(pagination.last_link)">&raquo;</a></li>
          </ul>
        </nav>
      </b-card>
    </div>
    <!--/.col-->
  </div>
  <!--/.row-->
</template>

<script>
import { get, del } from "../../helpers/api";

export default {
  data() {
    return {
      products: "",
      pagination: ""
    };
  },
  watch: {
    q(after, before) {
      this.fetch();
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch(pagi) {
      (this.load = 1), (pagi = pagi || "/api/products");
      get(pagi, {
        params: {
          q: this.q
        }
      }).then(res => {
        this.products = res.data.products.data;
        this.pagination = {
          current_page: res.data.products.current_page,
          last_page: res.data.products.last_page,
          from_page: res.data.products.from,
          to_page: res.data.products.to,
          total_page: res.data.products.total,
          path_page: res.data.products.path + "?page=",
          first_link: res.data.products.first_page_url,
          last_link: res.data.products.last_page_url,
          prev_link: res.data.products.prev_page_url,
          next_link: res.data.products.next_page_url
        };
      });
    },
    deleteProduct(product_id, index) {
      del("api/products/" + product_id).then(res => {
        this.products.splice(index, 1);
      });
    }
  }
};
</script>
