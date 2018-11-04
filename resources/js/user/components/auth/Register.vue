<template>
    <b-form @submit.prevent="Register" @reset="onReset" class="form-center">
      <h3>Register</h3>
            <b-form-group label="Name:" label-for="email">
        <b-form-input id="name" v-model="form.name" type="text" required placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Email address:" label-for="email" >
        <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email" :class="{is_valid :error.email}">
        </b-form-input>
        <span class="text-danger" v-if="error.email">{{ error.email[0] }}</span>
      </b-form-group>
      <b-form-group label="Your Name:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required placeholder="Enter password" :class="{is_valid :error.password}">
        </b-form-input>
        <span class="text-danger" v-if="error.password">{{ error.password[0] }}</span>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
</template>
<script>
import { register } from "../../helpers/api.js";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    Register() {
      this.$store.dispatch("init");
      register(this.$data.form)
        .then(response => {
          this.$route.push("/login");
        })
        .catch(error => {
          this.$store.commit("RegisterFailed", error);
        });
    },
    onReset() {
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
.is_valid {
  border-color: red;
}

.form-center {
  width: 35%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .form-center {
    width: 50%;
  }
}

@media only screen and (max-width: 767px) {
  .form-center {
    width: 90%;
  }
}
</style>
