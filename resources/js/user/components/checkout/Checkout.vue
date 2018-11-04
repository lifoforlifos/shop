<template>
  <div>

    <!-- ##### Breadcumb Area Start ##### -->
    <div class="breadcumb_area bg-img">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="page-title text-center">
              <h2>Checkout</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Breadcumb Area End ##### -->

    <!-- ##### Checkout Area Start ##### -->
    <div class="checkout_area section-padding-80">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <app-payement-info></app-payement-info>
          </div>

          <div class="col-12 col-md-6 col-lg-5 ml-lg-auto">
            <div class="order-details-confirmation">

              <div class="cart-page-heading">
                <h5>Your Order</h5>
                <p>The Details</p>
              </div>

              <ul class="order-details-form mb-4">
                <li><span>Qty</span> <span>Product</span> <span>Total</span></li>
                <li v-for="cart in carts" :key="cart.id"><span>{{
                    cart.count }}</span> <span>{{ cart.name }}</span>  <span>${{ cart.price * cart.count }}</span></li>
                <li><span>Subtotal</span> <span>${{ totalCost }}</span></li>
                <li><span>Shipping</span> <span>Free</span></li>
                <li v-if="couponValue"><span>Discount</span> <span>${{ couponValue }}</span></li>
                <li><span>Total</span> <span>${{ totalCost - couponValue }}</span></li>
              </ul>

              <div class="card" v-if="!couponValue">
                <div class="card-header" role="tab" id="headingOne">
                  <h6 class="mb-0">
                    <a data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><i></i>Do
                      you have
                      Coupon?</a>
                  </h6>
                </div>
                <div class="card-body">
                  <div class="col-12 mb-3">
                    <label for="coupon">Coupon <span>*</span></label><br>
                    <small class="text-danger" v-if="error_coupon.coupon">{{ error_coupon.coupon[0]}}</small>
                    <small v-else class="text-danger">{{ error_coupon }}</small>
                    <input type="text" v-model="couponCodes"  class="form-control mb-3" id="coupon">
                    <a class="btn essence-btn" @click="checkCoupon()">Apply</a>
                  </div>
                </div>
              </div>
              <div v-else>
                You have successfully applied your coupon: {{ couponCode }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Checkout Area End ##### -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PayementInfo from "./PayementInfo";
export default {
  components: {
    appPayementInfo: PayementInfo
  },
  data() {
    return {
      coupon_codes: "",
      error: ""
    };
  },
  computed: {
    ...mapGetters(["carts", "totalCost", "couponCode", "couponValue"])
  },
  methods: {
    checkCoupon() {
      this.$store.dispatch("checkCoupon", this.couponCodes);
    }
  }
};
</script>
