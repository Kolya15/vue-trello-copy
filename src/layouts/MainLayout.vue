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
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 50px 30px;
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