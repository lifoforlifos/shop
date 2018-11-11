<template>
    <div class="container card padding">
        <h3>New Brand:</h3>
        <div v-if="complete != '1'">
            <form id="brand" v-on:submit.prevent="creatBrand">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="brand_name" type="text" id="name" v-model="form.brand_name" class="form-control" v-bind:class="{ is_invalid: error.brand_name }">
                    <small class="text-danger" v-if="error.brand_name">{{error.brand_name[0]}}</small>
                </div>
                <div class="form-group">
                    <label for="image">Image</label>
                    <input name="image" type="file" id="image" class="form-control" v-bind:class="{ is_invalid: error.image }">
                    <small class="text-danger" v-if="error.image">{{error.image[0]}}</small>
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
            You have successfully {{action}} your brand!
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        brand_name: "",
        image: ""
      },
      error: "",
      loading: 0,
      complete: 0,
      action: "Create",
      storeURL: `/api/brands`
    };
  },
  created() {
    if (this.$route.meta.mode === "edit") {
      this.initializeURL = `/api/brands/${this.$route.params.id}`;
      this.storeURL = `/api/brands/${this.$route.params.id}?_method=PUT`;
      this.action = "Update";
      axios
        .get(this.initializeURL, {
          params: {
            pagination: true
          }
        })
        .then(res => {
          this.form = res.data.brand;
        });
    }
  },
  methods: {
    fileChange(e) {
      let selectedFile = e.target.files[0];
      this.form.image = selectedFile;
    },
    creatBrand() {
      let brand = document.getElementById("brand");
      let form = new FormData(brand);
      form.append("image", this.form.image);
      axios
        .post(this.storeURL, form)
        .then(res => {
          this.complete = 1;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.loading = 0;
            this.error = error.response.data.errors;
          }
        });
    }
  }
};
</script>
