<template>
    <div class="container card padding">
        <span class="order_style"><b>Random</b>: {{ order.random }}</span>
        <span class="order_style"><b>first name</b>: {{ order.first_name }}</span>
        <span class="order_style"><b>last name</b>: {{ order.last_name }}</span>
        <span class="order_style"><b>billing address</b>: {{ order.billing_address }}</span>
        <span class="order_style"><b>billing city</b>: {{ order.billing_city }}</span>
        <span class="order_style"><b>billing productalcode</b>: {{ order.billing_productalcode }}</span>
        <span class="order_style"><b>billing phone</b>: {{ order.billing_phone }}</span>
        <span class="order_style"><b>billing discount</b>: {{ order.billing_discount }}</span>
        <span class="order_style"><b>billing discount_code</b>: {{ order.billing_discount_code }}</span>
        <span class="order_style"><b>billing subtotal</b>: {{ order.billing_subtotal }}</span>
        <span class="order_style"><b>billing total</b>: {{ order.billing_total }}</span>
        <span class="order_style"><b>status</b>: {{ order.status }}</span>

        <span class="order_style"><b>Update Status</b>
            <select v-model="status" id="">
                <option value=""></option>
                <option value="verified">Verified</option>
                <option value="sent">Sent</option>
                <option value="problem">Problem</option>
            </select>
        </span>
        <div class="row">
            <div class="col-12">
                <b-card header="<i class='fa fa-align-justify'></i> Products">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in order.products" :key="product.id">
                                <td>
                                    <router-link class="recipe__inner" :to="`/products/${product.id}`">
                                        <img :src="'/images_product/' + product.images[0].file" alt="" class="img-fluids">
                                    </router-link>
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>
                                    <span class="badge badge-success">{{ product.pivot.quantity }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-card>
            </div>
            <!--/.col-->
        </div>
        <!--/.row-->
        <button class="btn btn-success" @click='updateStatus(order.id)'>Send</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      order: "",
      status: ""
    };
  },
  created() {
    axios.get(`/api/orders/${this.$route.params.id}`).then(res => {
      this.order = res.data.order;
    });
  },
  methods: {
    updateStatus(id) {
      axios
        .put(`/api/orders/${id}`, {
          status: this.status,
          id: id
        })
        .then(res => {
          this.$router.push("/orders/");
        })
        .catch(res => {});
    }
  }
};
</script>
<style>
.order_style {
  font-size: 17px;
  margin-bottom: 18px;
}

.img-fluids {
  width: 100px;
  height: 100px;
}
</style>
