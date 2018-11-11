<template>
  <div class="card container padding">
    <div v-if="complete != '1'">
      <h3>{{ action }} Product:</h3>
      <form v-on:submit.prevent="uploadProduct" id="myForm">

        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for="name">Name</label>
              <input name="name" type="text" id="name" class="form-control" v-model="product.name" v-bind:class="{ is_invalid: error.name }">
              <small class="text-danger" v-if="error.name">{{error.name[0]}}</small>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label for="slug">Slug</label>
              <input name="slug" type="text" id="slug" v-model="product.slug" class="form-control" v-bind:class="{ is_invalid: error.slug }">
              <small class="text-danger" v-if="error.slug">{{error.slug[0]}}</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea name="description" v-model="product.description" class="form-control" id="description" rows="5" v-bind:class="{ is_invalid: error.description }"></textarea>
          <small class="text-danger" v-if="error.description">{{error.description[0]}}</small>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label for="brand">Brand</label>
              <select class="form-control" id="brand" v-model="product.brand_id" v-bind:class="{ is_invalid: error.brand_id }">
                <option></option>
                <option v-for="item in brands" v-bind:value="item.id" :key="item.key" :selected="item.id === product.brand_id">
                  {{ item.brand_name }}
                </option>
              </select>
              <small class="text-danger" v-if="error.brand_id">{{error.brand_id[0]}}</small>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label for="brand">Category</label>
              <select class="form-control" id="brand" v-model="product.category_id" name="category_id" v-bind:class="{ is_invalid: error.category_id }">
                <option></option>
                <optgroup v-for="category in categories" :label="category.name" :key="category.id">
                  <option v-for="category_children in category.children" v-bind:value="category_children.id" :key="category_children.id" :selected="category_children.id === product.category_id">
                    {{ category_children.name }}
                  </option>
                </optgroup>
              </select>
              <small class="text-danger" v-if="error.category_id">{{error.category_id[0]}}</small>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label for="old_price">Old Price</label>
              <input name="old_price" type="number" v-model="product.old_price" id="price" class="form-control"  v-bind:class="{ is_invalid: error.old_price }">
              <small class="text-danger" v-if="error.old_price">{{error.old_price[0]}}</small>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label for="price">Price</label>
              <input name="price" type="number" id="price" v-model="product.price" class="form-control" v-bind:class="{ is_invalid: error.price }">
              <small class="text-danger" v-if="error.price">{{error.price[0]}}</small>
            </div>
          </div>

          <div class="col-12 imagebackground" v-if="product.length > 0">
            <div class="row">
              <div v-for="(image, index) in product.images" :key="image.id">
                <div class="col-2">
                  <img :src="'storage/images_product/' + image.file" class="image_style" alt="">
                  <a href="#" class="close-thik" @click="removeImage(index)"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <input id="upload-file" type="file" multiple class="form-control" @change="fileChange" v-bind:class="{ is_invalid: error.images }">
              <small class="text-danger" v-if="error.images">{{ error.images[0] }}</small><br>
              <div v-for="(row, index) in rows" :key="index">
                <input id="upload-file" type="file" multiple class="form-control" @change="fileChange">
              </div>
              <button type="button" class="btn btn-secondary" @click="addFile()">add new file</button>
            </div>
          </div>
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
      You have successfully upoloaded your product!
    </div>
  </div>
</template>

<script>
import { get, post } from "../../helpers/api";
export default {
  data() {
    return {
      brands: "",
      categories: "",
      product: {
        name: "",
        slug: "",
        description: "",
        price: "",
        brand_id: "",
        category_id: "",
        images: []
      },
      complete: 0,
      loading: 0,
      error: {},
      rows: [],
      action: "Create",
      storeURL: `/api/products`
    };
  },
  created() {
    axios
      .get("/api/brands", {
        params: {
          pagination: true
        }
      })
      .then(res => {
        this.brands = res.data.brands;
      });

    axios
      .get("/api/categories", {
        params: {
          pagination: false
        }
      })
      .then(res => {
        this.categories = res.data.categories;
      });

    if (this.$route.meta.mode === "edit") {
      this.initializeURL = `/api/products/${this.$route.params.id}`;
      this.storeURL = `/api/products/${this.$route.params.id}?_method=PUT`;
      this.action = "Update";
      get(this.initializeURL).then(res => {
        this.product = res.data.product;
        this.product.brand_id = res.data.product.brands[0].id;
        this.product.category_id = res.data.product.categories[0].id;
      });
    }
  },
  methods: {
    addFile() {
      this.rows.push({
        file: {
          name: "Choose File"
        }
      });
    },
    fileChange(e) {
      let selectedFiles = e.target.files;
      if (!selectedFiles.length) {
        return false;
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.product.images.push(selectedFiles[i]);
      }
    },
    uploadProduct() {
      this.loading = 1;
      post(this.storeURL, this.$data.product)
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
