<template>
    <div class="CodeBlock">
        <div class="center">
            <div v-html="html" class="center"></div>
        </div>
        <div class="title">
            {{gist.title}}
            <div>
                <span @click="xiugai(gist)">修改</span>
                <span @click="delete1(gist)">删除</span>
            </div>
        </div>

    </div>
</template>

<script>
    import Lib from "assets/js/Lib";
    import showdown from "showdown";
    import MyAlert from "../../assets/js/myAlert";
    import {delete_gist} from "../../assets/apis/gist";

    const CodeBlock = {
        data() {
            return {
                html: ""
            };
        },
        components: {},
        props: {
            gist: {
                type: Object,
                default: function () {
                    return {
                        title: "title",
                        content: `### 1asdasd
        *   list
        *   list
      `
                    };
                }
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
            let converter = new showdown.Converter();
            let text = this.$props.gist.content.toString();
            this.html = converter.makeHtml(text);
        },
        //相关操作事件
        methods: {
            xiugai(gist) {
                this.$router.push({
                    path: `/update-gist?gistId=${gist.id}&groupId=${gist.group_id}`,
                    query: {
                        gistId: gist.id,
                        groupId: gist.group_id
                    }
                })
                // window.location.href = `http://${document.domain}:9003/views/home/updateGist.html`
            },
            delete1(gist) {
                MyAlert.confirm("确定删除？").then(res => {
                    if (res) {
                        delete_gist(gist.id).then(res => {
                            MyAlert.success("删除成功")
                            setTimeout(() => {
                                window.location.reload()
                            }, 500)

                        })
                    }
                })
            }
        }
    };

    export default CodeBlock
</script>

<style lang="less" scoped>
    @import "./code.css";

    .CodeBlock {
        background: #fff;
        box-shadow: 1px 3px 1px #eee;
        padding-top: 10px;
        .center {
            margin: 10px;
        }
        .title {
            background: #dfe3e6;
            color: #6e8092;
            padding: 16px;
            margin: 0;
            span {
                cursor: pointer;
            }
        }
    }
</style>
