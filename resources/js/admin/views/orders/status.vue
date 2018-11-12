<template>
  <div class="row">
    <!--/.col-->
    <div class="col-lg-12">
      <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Random</th>
              <th>User Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.random }}</td>
              <td>{{ order.billing_email }}</td>
              <td>
                <router-link class="recipe__inner" :to="`/orders/single-order/${order.id}`"><button class="btn btn-warning">Edit</button></router-link>
              </td>
              <td><button class="btn btn-danger" @click="deleteProduct(order.id, index)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </div>
    <!--/.col-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: ""
    };
  },
  created() {
    axios.get("/api/order/status/" + this.$route.meta.status).then(res => {
      this.orders = res.data.order;
    });
  }
};
</script>
