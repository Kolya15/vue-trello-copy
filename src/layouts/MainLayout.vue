<template>
    <div class="wrapper-layout">
        <div class="wrapper-logo">
            <router-link to="/">
                <svg class="logo"></svg>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "MainLayout"
    }
</script>

<style scoped>
    .wrapper-layout {
        /*width:100%;*/
        min-height:100%;
        padding: 50px 0 0 30px;
        background-color: #eae7e7;
    }
    .wrapper-logo{
        margin-bottom: 50px;
    }
    .logo {
        background-image: url("../assets/images/logo.svg");
        width: 55px;
        height: 55px;
    }
</style>