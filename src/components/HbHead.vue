<template>
    <div class="header">
        <div v-if="goBack" class="goBack" @click="goback1">
            <i class="el-icon-back"></i>
        </div>
        <header class="center">{{title}}</header>
        <div class="headMargin"></div>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';

    import {XHeader} from 'vux'

    const MyHeader = {
        data() {
            return {}
        },
        components: {
            XHeader
        },
        props: {
            title: {
                type: String,
                default: '导航'
            },
            goBack: {
                type: Boolean,
                default: false
            }
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate() {


        },
        //在挂载开始之前被调用
        beforeMount() {


        },
        //已成功挂载，相当ready()
        mounted() {


        },
        //相关操作事件
        methods: {
            goback1() {
                this.$router.back()
            }
        }
    }
    export default MyHeader
</script>

<style lang="less" scoped>
    .header {
        padding-left: 20px;
        color: #fff;
        background: #409eff;
        width: 100%;
        top: 0;
        display: flex;
        height: 40px;
        align-items: center;
    }

    .goBack {
        cursor: pointer;
    }

    .center {
        flex: 1;
        text-align: center;
    }

    .headfix {
        position: fixed !important;
        z-index: 77;
        width: 100%;
        left: 0;
        top: 0;
    }

    .headMargin {
        clear: both;
        height: 50px;
    }

</style>
