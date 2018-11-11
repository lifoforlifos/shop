<template>
    <div class="row">
        <!--/.col-->
        <div class="col-lg-12">
            <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(brand, index) in brands" :key="brand.id">
                            <td>{{ brand.brand_name }}</td>
                            <td>
                                <router-link class="recipe__inner" :to="`/brands/single-brand/${brand.id}`"><button
                                        class="btn btn-warning">Edit</button></router-link>
                            </td>
                            <td><button class="btn btn-danger" @click="deleteProduct(brand.id, index)">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <nav class="center-pagination">
                    <ul class="pagination">
                        <li v-bind:class="{ disabled: !pagination.first_link} " class="page-item"><a href="#" class="page-link"
                                @click="fetch(pagination.first_link)">&laquo;</a></li>
                        <li v-bind:class="{ disabled: !pagination.prev_link} " class="page-item"><a href="#" class="page-link"
                                @click="fetch(pagination.prev_link)">&lt;</a></li>
                        <li v-for="n in pagination.last_page" v-bind:key="n" v-bind:class="{ active: pagination.current_page == n} "
                            class="page-item"><a href="#" class="page-link" @click="fetch(pagination.path_page + n)">{{
                                n }}</a></li>
                        <li v-bind:class="{ disabled: !pagination.next_link} " class="page-item"><a href="#" class="page-link"
                                @click="fetch(pagination.next_link)">&gt;</a></li>
                        <li v-bind:class="{ disabled: !pagination.last_link} " class="page-item"><a href="#" class="page-link"
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
import { del, get } from "../../helpers/api";

export default {
  data() {
    return {
      brands: "",
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
      (this.load = 1), (pagi = pagi || "/api/brands");
      axios
        .get(pagi, {
          params: {
            q: this.q
          }
        })
        .then(res => {
          console.log(res);
          this.brands = res.data.brands.data;
          this.pagination = {
            current_page: res.data.current_page,
            last_page: res.data.last_page,
            from_page: res.data.from,
            to_page: res.data.to,
            total_page: res.data.total,
            path_page: res.data.path + "?page=",
            first_link: res.data.first_page_url,
            last_link: res.data.last_page_url,
            prev_link: res.data.prev_page_url,
            next_link: res.data.next_page_url
          };
        });
    },
    deleteProduct(brand_id, index) {
      axios.delete("/api/brands/" + brand_id).then(res => {
        this.brands.splice(index, 1);
      });
    }
  }
};
</script>
