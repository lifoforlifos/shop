<template>
    <div class="order-details-confirmation">

        <div class="cart-page-heading">
            <h5>Your Order</h5>
            <p>The Details</p>
        </div>

        <ul class="order-details-form mb-4">
            <li><span>Qty</span> <span>Product</span> <span>Total</span></li>
            <li v-for="cart in carts" :key="cart.id"><span>{{
                    cart.count }}</span> <span>
                    <router-link :to="`/shop/single-product/${cart.id}`">{{ cart.name }}</router-link>
                </span> <span>${{ cart.price * cart.count }}</span></li>
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
                    <small class="text-danger" v-if="errorCoupon.coupon">{{ errorCoupon.coupon[0]}}</small>
                    <small v-else class="text-danger">{{ errorCoupon }}</small>
                    <input type="text" v-model="coupon_codes" class="form-control mb-3" id="coupon">
                    <a class="btn essence-btn" @click="checkCoupon()" :disabled="loading">Apply</a>
                </div>
            </div>
        </div>
        <div v-else>
            You have successfully applied your coupon: {{ couponCode }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      coupon_codes: ""
    };
  },
  computed: {
    ...mapGetters([
      "carts",
      "totalCost",
      "couponCode",
      "couponValue",
      "errorCoupon",
      "loading"
    ])
  },
  methods: {
    checkCoupon() {
      this.$store.dispatch("loadingState");
      this.$store.dispatch("checkCoupon", this.coupon_codes);
    }
  }
};
</script>

<style>
.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}

.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  margin: -3px 0 0 -3px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}

.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
