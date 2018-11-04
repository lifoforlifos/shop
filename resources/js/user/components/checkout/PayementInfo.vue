<template>
                <div class="checkout_details_area mt-50 clearfix">

              <div class="cart-page-heading mb-30">
                <h5>Billing Address</h5>
              </div>

              <form id="checkout">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="first_name">First Name <span>*</span></label>
                    <input type="text" class="form-control" id="first_name" v-model="info.first_name" required>
                    <small class="text-danger" v-if="errors.first_name">{{errors.first_name[0]}}</small>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="last_name">Last Name <span>*</span></label>
                    <input type="text" class="form-control" id="last_name" v-model="info.last_name" required>
                    <small class="text-danger" v-if="errors.last_name">{{errors.last_name[0]}}</small>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="street_address">Address <span>*</span></label>
                    <input type="text" class="form-control mb-3" id="street_address" v-model="info.street_address">
                    <small class="text-danger" v-if="errors.street_address">{{errors.street_address[0]}}</small>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="postcode">Postcode <span>*</span></label>
                    <input type="text" class="form-control" id="postcode" v-model="info.postcode">
                    <small class="text-danger" v-if="errors.postcode">{{errors.postcode[0]}}</small>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="city">Town/City <span>*</span></label>
                    <input type="text" class="form-control" id="city" v-model="info.city">
                    <small class="text-danger" v-if="errors.city">{{errors.city[0]}}</small>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="phone_number">Phone No <span>*</span></label>
                    <input type="number" class="form-control" id="phone_number" min="0" v-model="info.phone_number">
                  </div>
                  <div class="col-12">
                    <div class="custom-control custom-checkbox d-block mb-2">
                      <input type="checkbox" class="custom-control-input" id="customCheck1">
                      <label class="custom-control-label" for="customCheck1">Terms and conitions</label>
                    </div>
                  </div><br>
                  <hr>
                  <a class="btn essence-btn" @click="submitOrder()">Place Order</a>
                </div>
              </form>
            </div>
</template>

<script>
import axios from "axios";
export default {
  name: "payementinfo",
  data() {
    return {
      info: {
        first_name: "",
        last_name: "",
        city: "",
        postcode: "",
        street_address: "",
        phone_number: "",
        session_cart: JSON.stringify(this.$store.getters.carts)
      }
    };
  },
  computed: {
    errors() {
      return this.$store.getters.errors;
    }
  },
  methods: {
    submitOrder() {
      this.$store.dispatch("submitOrder", this.$data.info);
    }
  }
};
</script>
