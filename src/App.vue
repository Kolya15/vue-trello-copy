<template>
    <div id="app" ref="main">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
    import MainLayout from "./layouts/MainLayout";

    export default {
        computed: {
            layout() {
                return 'main-layout';
            },
        },
        components: {
            MainLayout
        },
      created(){
        this.$store.dispatch('SET_BOARDS');
      }
    }
</script>

<style>
    html,
    body {
        margin: 0;
        height: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
</style>
