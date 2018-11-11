<template>
    <div class="container card padding">
        <h3>New Coupon:</h3>
        <div v-if="complete != '1'">
            <form id="myForm" v-on:submit.prevent="creatCoupon">
                <div class="form-group">
                    <label for="name">Coupon</label>
                    <input name="coupon" v-model="form.coupon" type="text" id="name" class="form-control" v-bind:class="{ is_invalid: error.coupon }">
                    <small class="text-danger" v-if="error.coupon">{{error.coupon[0]}}</small>
                </div>
                <div class="form-group">
                    <label for="value">Value</label>
                    <input name="value" v-model="form.value" type="text" id="value" class="form-control" v-bind:class="{ is_invalid: error.value }">
                    <small class="text-danger" v-if="error.value">{{error.value[0]}}</small>
                </div>
                <div class="center-button">
                    <div v-if="loading != '1'">
                        <button type="submit" class="btn btn-default button-size">Upload</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-default button-size">
                            <div class="lds-circle"></div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div v-else>
            You have successfully uploaded your coupon!<a href="#" @click="newUpload">Upload again</a>
        </div>
    </div>
</template>
<script>
import { get, post } from "../../helpers/api";

export default {
  data() {
    return {
      form: {
        coupon: "",
        value: ""
      },
      action: "Create",
      storeURL: `/api/coupons`,
      error: "",
      loading: 0,
      complete: 0
    };
  },
  created() {
    if (this.$route.meta.mode === "edit") {
      this.initializeURL = `/api/coupons/${this.$route.params.id}`;
      this.storeURL = `/api/coupons/${this.$route.params.id}?_method=PUT`;
      this.action = "Update";
      get(this.initializeURL).then(res => {
        this.form = res.data.coupon;
      });
    }
  },
  methods: {
    creatCoupon() {
      post(this.storeURL, this.$data.form)
        .then(res => {
          this.complete = 1;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.loading = 0;
            this.error = error.response.data.errors;
          }
        });
    },
    newUpload() {
      this.complete = 0;
      this.loading = 0;
    }
  }
};
</script>
