<template>
    <div class="card container padding">
        <div v-if="complete != '1'">
            <form v-on:submit.prevent="uploadCategory" id="slider" enctype="multipart/form-data">
                                <h2>{{action}} slider</h2>

                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <div class="form-group">
                            <label for="p">Short paragraph</label>
                            <input type="text" id="p" class="form-control" name="paragraph" v-model="form.paragraph"
                                v-bind:class="{ is_invalid: error.paragraph }">
                            <small class="text-danger" v-if="error.paragraph">{{ error.paragraph[0]}}</small>
                        </div>
                        <div class="form-group">
                            <label for="headline">Headline</label>
                            <input type="text" id="headline" class="form-control" name="headline" v-model="form.headline"
                                v-bind:class="{ is_invalid: error.headline }">
                            <small class="text-danger" v-if="error.headline">{{ error.headline[0]}}</small>
                        </div>
                        <div class="form-group">
                            <label for="upload-file">Image</label>
                            <input id="upload-file" type="file" class="form-control" @change="fileChange" v-bind:class="{ is_invalid: error.image }">
                            <small class="text-danger" v-if="error.image">{{ error.image[0]}}</small><br>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12">
                        <div class="row">
                            <div class="col-sm-12" v-for="category in categories" :key="category.id">
                                <input type="radio" :id="category.name" v-model="form.category_slug" name="category_slug"
                                    :value="category.slug" />
                                <label :for="category.name">{{ category.name }}</label>
                            </div>
                            <small class="text-danger" v-if="error.category_slug">{{ error.category_slug[0]}}</small><br>
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
            You have successfully {{action}} your slider!
        </div>
    </div>
</template>

<script>
import { get, post } from "../../helpers/api";
export default {
  data() {
    return {
      form: {
        category_slug: "",
        image: "",
        paragraph: "",
        headline: ""
      },
      categories: "",
      action: "Create",
      storeURL: `/api/sliders`,
      error: "",
      loading: "",
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
      this.initializeURL = `/api/sliders/${this.$route.params.id}`;
      this.storeURL = `/api/sliders/${this.$route.params.id}?_method=PUT`;
      this.action = "Update";
      get(this.initializeURL).then(res => {
        this.form = res.data.slider;
      });
    }
  },
  methods: {
    fileChange(e) {
      this.form.image = e.target.files[0];
    },
    uploadCategory() {
      let slider = document.getElementById("slider");
      let form = new FormData(slider);
      form.append("image", this.form.image);
      post(this.storeURL, form)
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
