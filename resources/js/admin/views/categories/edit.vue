<template>
  <div class="row">
    <!--/.col-->
    <div class="col-lg-12">
      <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Children</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id">
              <td>{{ category.name }}</td>
              <td>
                  <div v-for="children in category.children" :key="children.id">
                      *{{ children.name }}
                  </div>
                  </td>
              <td>
                <router-link class="recipe__inner" :to="`/categories/single-category/${category.id}`"><button class="btn btn-warning">Edit</button></router-link>
              </td>
              <td><button class="btn btn-danger" @click="deleteCategory(category.id, index)">Delete</button></td>
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
              class="page-item"><a href="#" class="page-link" @click="fetch(pagination.path_page + n)">{{ n }}</a></li>
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
import { get, del } from "../../helpers/api";

export default {
  data() {
    return {
      categories: "",
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
      (this.load = 1), (pagi = pagi || "/api/categories");
      get(pagi).then(res => {
        this.categories = res.data.categories.data;
        this.pagination = {
          current_page: res.data.categories.current_page,
          last_page: res.data.categories.last_page,
          from_page: res.data.categories.from,
          to_page: res.data.categories.to,
          total_page: res.data.categories.total,
          path_page: res.data.categories.path + "?page=",
          first_link: res.data.categories.first_page_url,
          last_link: res.data.categories.last_page_url,
          prev_link: res.data.categories.prev_page_url,
          next_link: res.data.categories.next_page_url
        };
      });
    },
    deleteCategory(category_id, index) {
      del("api/categories/" + category_id).then(res => {
        this.categories.splice(index, 1);
      });
    }
  }
};
</script>
