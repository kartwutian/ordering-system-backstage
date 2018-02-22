<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import VHead from 'render/headTop'
    import VSidebar from 'render/sidebar.vue';
    export default {
        components:{
            VHead, VSidebar
        }
    }
</script>
