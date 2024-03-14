<template>
    <div>
        <h2 class="title">Vue 的标题</h2>
        <p class="content_vue">刀锋</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '我是 VUE 的标题'
            }
        }
    }
</script>

<style>
    .title {
        color: green;
        font-size: 28px
    }
    .content_vue {
        color: greenyellow;
        font-size: 36px
    }
</style>