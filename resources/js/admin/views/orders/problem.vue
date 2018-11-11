<template>

</template>

<script>
export default {
  data() {
    return {
      orders: ""
    };
  },
  created() {
    var status = "sent";
    axios.get("/api/orders/status/" + status).then(res => {
      console.log(res);
    });
  }
};
</script>
