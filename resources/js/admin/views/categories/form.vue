<template>
    <div class="card container padding">
        <div v-if="complete != '1'">
            <form v-on:submit.prevent="uploadCategory" id="category">
                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <div class="form-group">
                            <label for="category">Category</label>
                            <input type="text" id="category" class="form-control" name="name" v-model="form.name" :class="{ is_invalid: error.name }">
                            <small class="text-danger" v-if="error.name">{{ error.name[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="slug">Slug</label>
                            <input type="text" id="slug" class="form-control" name="slug" v-model="form.slug" :class="{ is_invalid: error.slug }">
                            <small class="text-danger" v-if="error.slug">{{ error.slug[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="upload-file">Image</label>
                            <input id="upload-file" type="file" class="form-control" @change="fileChange" :class="{ is_invalid: error.image }">
                            <small class="text-danger" v-if="error.image">{{ error.image[0] }}</small><br>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12">
                        <div class="row">
                            <div class="col-sm-12" v-for="category in categories" :key="category.id">
                                <input type="radio"
                                    name="category_radio"
                                    :id="category.id"
                                    :value="category.id"
                                    v-model="form.category_radio"
                                   />
                                <label :for="category.name">{{ category.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center-button">
                    <div v-if="loading != '1'">
                        <button class="btn btn-default button-size" type="submit">Upload</button>
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
            You have successfully {{action}} your category!
        </div>
    </div>
</template>

<script>
import { get, post } from "../../helpers/api";
export default {
  data() {
    return {
      form: {
        category_radio: "",
        image: {},
        name: "",
        slug: ""
      },
      categories: "",
      error: "",
      action: "Create",
      storeURL: `/api/categories`,
      loading: 0,
      complete: 0
    };
  },
  created() {
    axios
      .get("/api/categories", {
        params: {
          pagination: false
        }
      })
      .then(result => {
        this.categories = result.data.categories;
      });
    if (this.$route.meta.mode === "edit") {
      this.initializeURL = `/api/categories/${this.$route.params.id}`;
      this.storeURL = `/api/categories/${this.$route.params.id}?_method=PUT`;
      this.action = "Update";
      get(this.initializeURL).then(res => {
        this.form = res.data.category;
        this.form.category_radio = this.form.category_id;
      });
    }
  },
  methods: {
    fileChange(e) {
      let selectedFile = e.target.files[0];
      this.form.image = selectedFile;
    },
    uploadCategory() {
      let content = document.getElementById("category");
      let form = new FormData(content);
      form.append("image", this.form.image);
      axios
        .post(this.storeURL, form)
        .then(result => {
          this.complete = 1;
        })
        .catch(err => {
          if (err.response.status === 422) {
            this.loading = 0;
            this.error = err.response.data.errors;
          }
        });
    }
  }
};
</script>
