<template>
    <header>
        <b-navbar toggleable="md">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">
                <router-link to="/"><img src="/images/logo.png" class="logo" alt=""></router-link>
            </b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <a class="megaCategory" @mouseover="activeMega">Shop</a>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <template v-if="currentUser">
                        <b-nav-item href="#">
                            <div class="user-login-info">
                                <router-link to="/wishlist"><img class="user" src="/images/heart.svg" alt=""></router-link>
                            </div>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <div class="user-login-info">
                                <router-link to="/profile"><img class="user" src="/images/user.svg" alt=""></router-link>
                            </div>
                        </b-nav-item>
                    </template>
                    <b-nav-item>
                        <div class="cart-area" v-b-modal.ConfiShop id="essenceCartBtn">
                            <img class="user" src="/images/bag.svg" alt="">
                            <span>{{ count }}</span>
                        </div>
                    </b-nav-item>
                    <template v-if="!currentUser">
                        <b-nav-item href="#">
                            <div class="user-login-info">
                                <router-link to="/login">Login</router-link>
                            </div>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <div class="user-login-info">
                                <router-link to="/register">Register</router-link>
                            </div>
                        </b-nav-item>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!-- the modal -->
        <b-modal id="ConfiShop" ref="ConfiShop" size="lg" hide-footer>
            <div v-if="carts.length > 0">
                <div class="table-bordered table-responsive text-center">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(cart, i) in carts" :key=i>
                                <th scope="row">{{ i +1 }}</th>
                                <td><img :src="`/storage/images_product/${cart.img}`" class="cart_img"></td>
                                <td>{{ cart.name }}</td>
                                <td>$ {{ cart.price }}</td>
                                <td>{{ cart.count }}</td>
                                <td scop="col"><button class="btn btn-danger" @click="removeItemFromCart(cart.name)">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <button class="btn btn-primary float-right" @click="Checkout()">Checkout</button>
                <button class="btn btn-danger float-left" @click="clearAll()">Clear All</button>
            </div>
            <div v-else>
                <p class="text-center">you have no item in your cart</p>
            </div>
        </b-modal>
        <app-menu></app-menu>
    </header>
</template>
<script>
import MegaMenu from "./MegaMenu";
export default {
  name: "headerNav",
  components: {
    appMenu: MegaMenu
  },
  computed: {
    carts() {
      return this.$store.getters.carts;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    count() {
      return this.$store.getters.CountCart;
    }
  },
  methods: {
    activeMega() {
      this.$store.commit("activeMega");
    },
    removeItemFromCart(name) {
      this.$store.commit("removeItemFromCart", name);
    },
    clearAll() {
      this.$store.commit("clearAll");
    },
    Checkout() {
      if (!this.currentUser) {
        this.$router.push({
          name: "Login",
          query: {
            redirect: "/checkout"
          }
        });
      } else {
        this.$router.push({
          name: "Checkout"
        });
      }
      this.$refs.ConfiShop.hide();
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

.panel > .table-bordered,
.panel > .table-responsive > .table-bordered {
  border: 0;
}

.cart_img {
  width: 100px;
  height: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
    .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

a .logo {
  width: 100%;
}

.user-login-info a {
  position: relative;
  z-index: 1;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 90px;
  flex: 0 0 90px;
  width: 90px;
  display: block;
  text-align: center;
  border-left: 1px solid #ebebeb;
  height: 100%;
  line-height: 80px;
}

a .user {
  max-width: 20px;
}

.cart-area {
  position: relative;
  z-index: 1;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 90px;
  flex: 0 0 90px;
  width: 90px;
  display: block;
  text-align: center;
  border-left: 1px solid #ebebeb;
  height: 100%;
  line-height: 80px;
}

.cart-area span {
  font-family: "Ubuntu", sans-serif;
  font-size: 13px;
  color: #0315ff;
  font-weight: bolder;
  top: -10px;
}
</style>
