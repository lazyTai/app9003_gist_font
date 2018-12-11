<template>
    <div>
        <MyHeader title="gist 分享"></MyHeader>
        <Search placeholder="搜索 gist" position="fixed"
                v-model="searchValue"
                @on-submit="click_search"
        />

        <div class="btns">
            <el-button type="primary" round @click.native="click_add_modal">添加</el-button>
        </div>

        <div class="list groupItemlist" v-if="list.length>0">
            <div class="groupItem" v-for="(item,index) in list" :key="index"
                 :style="{backgroundColor:getRandomColor()}">
                <div @click="click_group_item(item)" class="name">
                    {{item.name}}
                </div>
                <div class="btn">
                    <span @click="updateGroupmodal(item)">
                        修改
                    </span>
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


        <v-modal title="添加"
                 :visible="addVisible"
                 @ok="addCustomTextOk"
                 @cancel="addcustomTextCancel"
                 ok-text="确定"
                 cancel-text="取消">
            <p>
                name: <input type="text" v-model="addGroup.name">
            </p>
        </v-modal>
        <v-modal title="修改"
                 :visible="updateVisible"
                 @ok="updateCustomTextOk"
                 @cancel="updatecustomTextCancel"
                 ok-text="确定"
                 cancel-text="取消">
            <p>
                name: <input type="text" v-model="updateGroup.name">
            </p>
        </v-modal>

    </div>
</template>

<script>
    import Lib from "assets/js/Lib";
    import {Grid, GridItem, GroupTitle} from "vux";
    import {Cell, Group, Divider} from "vux";
    import {Search} from "vux";
    import {get_groups} from "assets/apis/group.js";
    import {post_group, put_group} from "assets/apis/group";
    import MyAlert from 'assets/js/myAlert';
    import MyHeader from 'components/HbHead'
    import {getRandomColor} from 'assets/js/random'
    import {getRandomColor2} from "../../../../../assets/js/random";

    export default {
        name: "index",
        data() {
            return {
                searchValue: "",
                list: [],
                addVisible: false,
                addGroup: {
                    name: ""
                },
                updateGroup: {
                    name: ""
                },
                updateVisible: false,
            };
        },
        components: {
            MyHeader,
            Cell,
            Group,
            Divider,
            Search,
            Grid,
            GridItem
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate() {
        },
        //在挂载开始之前被调用
        beforeMount() {
        },
        //已成功挂载，相当ready()
        mounted() {
            this.relaodData()
        },
        //相关操作事件
        methods: {
            getRandomColor: getRandomColor2,
            updateGroupmodal(group) {
                this.$data.updateGroup = group
                this.$data.updateVisible = true;

            },
            click_add_modal() {
                this.$data.addGroup = {name: ""}
                this.$data.addVisible = true
            },
            updateCustomTextOk() {
                if (!this.$data.updateGroup.name) {
                    MyAlert.fail("name not null")
                    return false
                }
                this.$data.updateVisible = false
                put_group(this.$data.updateGroup).then(res => {
                    MyAlert.success("update success")
                })
            },
            updatecustomTextCancel() {
                this.$data.updateVisible = false
            },
            addCustomTextOk: function () {
                if (!this.$data.addGroup.name) {
                    MyAlert.fail("name not null")
                    return false
                }

                var self = this;
                this.$data.addVisible = false
                MyAlert.loading()
                post_group(this.$data.addGroup).then(res => {
                    MyAlert.clear()
                    MyAlert.success("保持成功")
                    self.relaodData()
                })
            },
            addcustomTextCancel() {
                this.$data.addVisible = false
            },
            relaodData() {
                var self = this;
                get_groups({name: this.$data.searchValue || undefined}).then(res => {
                    self.$data.list = res;
                });
            },
            click_search(value) {
                this.relaodData()
            },
            click_group_item(item) {
                this.$router.push({
                    path: `/group?groupId=${item.id}`, query: {
                        groupId: item.id
                    }
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .btns {
        margin-top: 20px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        height: 60px;
    }

    .groupItemlist {
        display: flex;
        flex-wrap: wrap;
        .groupItem {
            color: #fff;
            .name {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 90%;
                width: 100%;

            }
            .btn {
                text-align: center;
                width: 100%;
            }
            box-shadow: 1px 4px 1px #e0e0e0;
            background: #fff;
            border-radius: 5px;
            margin: 10px;
            cursor: pointer;
            width: 200px;
            flex-direction: column;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .list {
        margin-top: 20px;
        .grid-item {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
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
