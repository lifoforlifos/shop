<template>
    <div>
        <app-header-nav></app-header-nav>
        <transition name="fade">
            <router-view :key="$route.fullPath" />
        </transition>
    </div>
</template>
<script>
    import HeaderNav from './components/navigation/HeaderNav'
    export default {
        components: {
            appHeaderNav: HeaderNav
        },
    }

</script>
