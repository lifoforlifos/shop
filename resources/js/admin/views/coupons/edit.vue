<template>
  <div class="row">
    <!--/.col-->
    <div class="col-lg-12">
      <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Coupon</th>
              <th>value</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coupon, index) in coupons" :key="coupon.id">
              <td>{{ coupon.coupon }}</td>
              <td>{{ coupon.value }}</td>
              <td>
                <router-link class="recipe__inner" :to="`/coupons/single-coupon/${coupon.id}`"><button class="btn btn-warning">Edit</button></router-link>
              </td>
              <td><button class="btn btn-danger" @click="deleteCoupon(coupon.id, index)">Delete</button></td>
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
import { del, get } from "../../helpers/api";

export default {
  data() {
    return {
      coupons: "",
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
      (this.load = 1), (pagi = pagi || "/api/coupons/");

      get(pagi, {
        params: {
          q: this.q
        }
      }).then(res => {
        this.coupons = res.data.coupons.data;
        this.pagination = {
          current_page: res.data.coupons.current_page,
          last_page: res.data.coupons.last_page,
          from_page: res.data.coupons.from,
          to_page: res.data.coupons.to,
          total_page: res.data.coupons.total,
          path_page: res.data.coupons.path + "?page=",
          first_link: res.data.coupons.first_page_url,
          last_link: res.data.coupons.last_page_url,
          prev_link: res.data.coupons.prev_page_url,
          next_link: res.data.coupons.next_page_url
        };
      });
    },
    deleteCoupon(coupon_id, index) {
      del("api/coupons/" + coupon_id).then(res => {
        this.coupons.splice(index, 1);
      });
    }
  }
};
</script>
