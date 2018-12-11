<template>
    <div id="app">
        <MyHeader :title="'具体代码'+group.name" :goBack="true"></MyHeader>
        <divider></divider>
        <Search placeholder="搜索 具体代码" position="fixed"
                v-model="searchValue"
                @on-submit="click_search"
        />
        <div class="btns">
            <el-button @click.native="add_gist" type="primary" round>添加</el-button>
        </div>
        <div class="list" v-if="list.length>0">
            <!--label-->
            <div v-for="label in list">
                <div class="label">
                    <divider> {{label[0].label.name}}</divider>
                </div>
                <div class="label-content">
                    <CodeBlock class="block" :key="item.id" :gist="item" v-for="item in label"/>
                </div>

            </div>

        </div>
        <div class="list" v-if="list.length==0">
            <div class="p404">
                <img src="http://qn.diyeetech.com/18-12-4/6184417.jpg"/>
                <h4 v-if="!searchValue">等待搜索</h4>
                <h4 v-if="searchValue">换个关键字试试！！</h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from "assets/js/Lib";
    import {Grid, GridItem, GroupTitle, XButton} from "vux";
    import {Cell, Group, Divider} from "vux";
    import {Search} from "vux";
    import {get_groups} from "assets/apis/group.js";
    import {get_gists} from "assets/apis/gist.js";

    import {getUrlParams} from "assets/js/url.js";
    import CodeBlock from 'components/codeBlock/CodeBlock'
    import {get_group_one} from "assets/apis/group";
    import {GroupBy, MyMap} from "../../../../../assets/js/lodash";
    import MyHeader from 'components/HbHead'

    export default {
        data() {
            return {
                searchValue: undefined,
                group: {id: "", name: ""},
                list: []
            };
        },
        components: {
            CodeBlock,
            Cell,
            Group,
            Divider,
            Search,
            Grid,
            GridItem,
            XButton,
            MyHeader
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate() {
        },
        //在挂载开始之前被调用
        beforeMount() {
        },
        //已成功挂载，相当ready()
        mounted() {
            var self = this;
            this.get_data();
            this.get_group()
        },
        //相关操作事件
        methods: {
            get_group() {
                var self = this;
                get_group_one(self.$route.query.groupId).then(res => {
                    self.$data.group = res
                })
            },
            get_data() {
                var self = this;
                get_gists({
                    groupId: self.$route.query.groupId || undefined,
                    title: this.$data.searchValue || undefined
                }).then(res => {
                    self.$data.list = MyMap(GroupBy(res, (item) => item.label_id), _item => _item);
                });
            },
            click_search(value) {
                if (!value) value = undefined;
                this.$data.searchValue = value;
                this.get_data();
            },
            add_gist(item) {
                this.$router.push({
                    path: `/add-gist?groupId=${this.$route.query['groupId']}`
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .btns {
        height: 50px;
        padding-left: 20px;
        display: flex;
        align-content: center;
        align-items: center;
    }

    .row {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .list {
        margin-top: 10px;

        .label {
            margin-top: 10px;
            height: 40px;
            font-size: 20px;
        }
        .label-content {
            column-count: 3;
            column-gap: 0;
            .grid-item {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .block {
                break-inside: avoid;
                box-sizing: border-box;
                margin: 10px;
                &:first-child {
                    margin-top: 0px;
                }
            }
        }

        .p404 {
            text-align: center;
            h4 {
                margin-top: 20px;
                padding-bottom: 20px;
            }
            img {
            }
        }
    }
</style>
