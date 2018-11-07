<template>
  <div class="container">
    <div v-if="orders.length > 0">
      <table class="table table-striped" v-for="order in orders" :key="order.id">
        <thead>
          Your order: {{ order.created_at }}
          <tr>
            <th class="col">Name</th>
            <th class="col">Price</th>
            <th class="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in order.products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.pivot.quantity }}</td>
          </tr>
        </tbody><br><br><br>
      </table>
    </div>
    <div v-else>
      You have no order so far, care to add some???
    </div>
    <hr>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: ""
    };
  },
  created() {
    axios.get("/api/auth/profile").then(res => {
      this.orders = res.data.orders;
    });
  }
};
</script>
