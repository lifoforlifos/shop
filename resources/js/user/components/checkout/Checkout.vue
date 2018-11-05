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
            <app-order-details></app-order-details>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Checkout Area End ##### -->
  </div>
</template>
<script>
import PayementInfo from "./PayementInfo";
import OrderDetail from "./OrderDatail";
export default {
  name: "checkout",
  components: {
    appPayementInfo: PayementInfo,
    appOrderDetails: OrderDetail
  }
};
</script>
