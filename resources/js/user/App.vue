<template>
    <div>
        <app-header-nav></app-header-nav>
        <transition name="fade">
            <router-view :key="$route.fullPath" />
        </transition>
    </div>
</template>
<script>
import HeaderNav from "./components/navigation/HeaderNav";
import Footer from "./components/navigation/Footer";
export default {
  components: {
    appHeaderNav: HeaderNav,
    appFooter: Footer
  }
};
</script>
