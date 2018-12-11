<template>
    <div id="app">
        <div class="row1">
            <input type="text" placeholder="title" id="title" ref="title" v-model="title_value">
            <div class="select_label">
                <el-select
                        v-model="label_value"
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择文章标签">
                    <el-option
                            v-for="item in label_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="btns">
                <div class="backBtn" @click="backBtn">
                    取消
                </div>
                <div class="updateBtn" @click="addBtn">
                    添加
                </div>
            </div>

        </div>
        <div class="row">
            <textarea name="" id="input_value" cols="30" rows="10" ref="input_value"
                      :value="input_value"
                      @input="change_input"
            ></textarea>
            <div id="show_text" ref="show_text" class="prettyprint"></div>
        </div>

    </div>
</template>

<script>
    import Lib from "assets/js/Lib";
    import {Grid, GridItem, GroupTitle, XButton} from "vux";
    import MyAlert from 'assets/js/myAlert'
    import {getUrlParams} from "assets/js/url.js";
    import {get_body_height, get_body_width} from "assets/js/dom";
    import {hightLight, mkToHmtl} from "assets/js/markdown/markdown";
    import {add_gist, get_gist_one, get_gists, put_gists} from "assets/apis/gist";
    import {clearNull} from "assets/js/str";
    import {ADD_POST_LABEL, GET_LABELS} from "../../../../../assets/apis/label";
    import {MyFilter, MyMap} from "../../../../../assets/js/lodash";

    export default {
        data() {
            return {
                searchValue: undefined,
                group: {id: "", name: ""},
                list: [],
                input_value: "",
                title_value: "",
                label_value: "",
                label_options: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
            };
        },
        components: {},
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate() {
        },
        //在挂载开始之前被调用
        beforeMount() {
        },
        //已成功挂载，相当ready()
        mounted() {

            this.$refs["input_value"].style.height = (get_body_height() - 169 - 40) + "px"
            this.$refs["show_text"].style.height = (get_body_height() - 169 - 40) + "px"

            this.$refs["input_value"].style.width = ((get_body_width() - 160) / 2) + "px"
            this.$refs["show_text"].style.width = ((get_body_width() - 160) / 2) + "px"


            /*get data*/
            var self = this;
            this.$refs["show_text"].innerHTML = mkToHmtl(this.$refs['input_value'].value)
            this.get_labels()
        },
        //相关操作事件
        methods: {
            get_labels() {
                var self = this;
                GET_LABELS({
                    groupId: getUrlParams()['groupId']
                }).then(res => {
                    self.$data.label_options = MyMap(res, item => {
                        return {
                            value: item.id + "",
                            label: item.name,
                        }
                    })
                })
            },
            async addBtn() {
                var self = this;
                var gist = {
                    "title": clearNull(this.$data.title_value),
                    "content": clearNull(this.$data.input_value),
                    "id": (getUrlParams())['gistId'],
                    "group_id": (getUrlParams())['groupId'],
                }
                if (!gist.title) {
                    MyAlert.fail("title  is   required  not null")
                    return false
                }
                if (!gist.content) {
                    MyAlert.fail("content  is  required not null")
                    return false
                }

                /*==========add label first*/
                if (!this.$data.label_value) {
                    MyAlert.fail("label 不能为空")
                    return false
                }
                /*============= 判断 select 是新的还是已经有的*/
                var isTrue = MyFilter(this.$data.label_options, item => item.value == clearNull(this.$data.label_value))[0]
                var label = {};
                if (!isTrue) {
                    /*========add new label*/
                    var _result = await ADD_POST_LABEL({
                        name: this.$data.label_value,
                        group_id: getUrlParams()['groupId']
                    })
                    label = _result.message
                } else {
                    label = {id: isTrue.value}
                }
                gist["label_id"] = label.id


                MyAlert.loading()
                add_gist(gist).then(res => {
                    MyAlert.clear()
                    MyAlert.success("add gist is success")
                    setTimeout(() => {
                        get_gist_one(res.message.id).then(res1 => {
                            self.$data.gist = res1;
                            self.$router.back()
                        })
                    }, 500)

                }).catch(e => {
                    MyAlert.clear()
                })
            },
            backBtn() {
                history.back()
            },
            change_input(e) {
                var value = e.target.value
                this.$data.input_value = value;
                this.$refs["show_text"].innerHTML = mkToHmtl(value)
                hightLight(this.$refs["show_text"])
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../../../assets/js/markdown/style.less";

    body {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        color: #FFF;
    }

    .row1 {
        display: flex;
        align-items: center;
        padding-right: 10px;
        #title {
            flex: 1
        }
        .select_label {
            width: 250px;
        }
        .btns {
            display: flex;
            align-items: center;
            .backBtn {
                cursor: pointer;
                background-color: #FEAE1B;
                border-color: #FEAE1B;
                color: #FFF;
                width: 100px;
                font-size: 28px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 54px;
            }
            .updateBtn {
                cursor: pointer;
                background-color: #ff7680;
                border-color: #ff7680;
                color: #FFF;
                width: 100px;
                font-size: 28px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 54px;
            }
        }
    }

    .row {
        display: flex;
        margin-bottom: 100px;
        #input_value {
            font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            position: fixed;
            top: 69px;
            overflow-y: scroll;
            border: none;
            padding-bottom: 90px;
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 40px;

            color: #333;
            background: #fcfaf2;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            border: none;
            outline: none;
        }
        #show_text {
            font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
            left: 51%;
            background: #fff;
            position: fixed;
            top: 69px;
            padding-bottom: 90px;
            overflow-y: scroll;
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 40px;
        }
    }

    #title {
        margin-top: 15px;
        padding: 10px;
        margin-bottom: 0;
        border: none;
        font-size: 30px;
        font-weight: 400;
        line-height: 30px;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: #595959;
        background-color: transparent;
        outline: none;
        border-radius: 0;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }


</style>
