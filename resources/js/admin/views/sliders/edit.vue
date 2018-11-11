<template>
  <div class="row">
    <!--/.col-->
    <div class="col-lg-12">
      <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Paragraph</th>
              <th>Headline</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slider, index) in sliders" :key="slider.id">
              <td>{{ slider.paragraph }}</td>
              <td>{{ slider.headline }}</td>
              <td>
                <router-link class="recipe__inner" :to="`/sliders/single-slider/${slider.id}`"><button class="btn btn-warning">Edit</button></router-link>
              </td>
              <td><button class="btn btn-danger" @click="deleteslider(slider.id, index)">Delete</button></td>
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
      sliders: "",
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
      (this.load = 1), (pagi = pagi || "/api/sliders");
      get(pagi, {
        params: {
          q: this.q
        }
      }).then(res => {
        this.sliders = res.data.sliders.data;
        this.pagination = {
          current_page: res.data.sliders.current_page,
          last_page: res.data.sliders.last_page,
          from_page: res.data.sliders.from,
          to_page: res.data.sliders.to,
          total_page: res.data.sliders.total,
          path_page: res.data.sliders.path + "?page=",
          first_link: res.data.sliders.first_page_url,
          last_link: res.data.sliders.last_page_url,
          prev_link: res.data.sliders.prev_page_url,
          next_link: res.data.sliders.next_page_url
        };
      });
    },
    deleteslider(slider_id, index) {
      del("api/sliders/" + slider_id).then(res => {
        this.sliders.splice(index, 1);
      });
    }
  }
};
</script>
