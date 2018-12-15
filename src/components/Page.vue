<template>
    <div class="page">
        <h2>{{page.section}}</h2>
        <textarea class="preword" v-model="page.preword"></textarea>
        <button @click="addNewIssue(page)">add issue</button>
        <draggable v-model="page.issues" class="issues" :options="issueDraggableOption">
            <div class="issue"
                 v-for="(issue,index) in issues(page)"
                 :key="issue.id">

                <div class="handler">...</div>
                <button @click="addNewBlock({issue,type:'text'})">text</button>
                <button @click="addNewBlock({issue,type:'image'})">image</button>
                <button @click="addNewBlock({issue,type:'quote'})">quote</button>
                {{issue.id}}
                <draggable v-model="issue.blocks" :options="blockDraggableOption">
                    <div class="block"
                         v-for="block in blocks(issue)"
                         :key="block.id"
                         :is="block.type+'Block'" :value="block">
                        block {{block.id}}
                    </div>
                </draggable>
            </div>
        </draggable>
    </div>
</template>

<script type="text/jsx">
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Vue from "vue";

    const TextBlock = Vue.component('TextBlock', {
            functional: true,
            render(h, {props: value}) {
                return <div class="block">
                    <div class="handler">...</div>
                    quote block {value.content} {value.id}
                </div>

            }
        }),
        QuoteBlock = Vue.component('TextBlock', {
            functional: true,
            render(h, {props: value}) {
                return <div class="block">
                    <div class="handler">...</div>
                    quote block {value.content} {value.id}
                </div>
            }
        }),
        ImageBlock = Vue.component('ImageBlock', {
            functional: true,
            render(h, {props}) {
                return <div className="block">
                    <div class="handler">...</div>
                    <figure>
                        <img /*src={props.block.src}*/ draggable="false"/>
                        <figcaption></figcaption>
                    </figure>
                </div>
            }
        })
    ;


    export default {
        name: 'page',
        data() {
            return {
                page: this.$props.value,
                issueDraggableOption: {
                    draggable: '.issue',
                    handle: '.handler',
                    group: {
                        name: 'issues'
                    }
                },
                blockDraggableOption: {
                    draggable: '.block',
                    group: {
                        name: 'blocks'
                    }
                }
            }
        },
        computed:{
            ...mapGetters('pages', ['pages', 'issues', 'blocks'])
        },
        props: {
            value: Object
        },
        components: {
            TextBlock, ImageBlock, QuoteBlock
        },
        methods: {
            ...mapMutations('pages', ['addNewPage', 'addNewIssue', 'addNewBlock']),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .page {
        border: 1px solid;
        min-height: 20rem;
    }

    .handler {
        display: block;
        clear: both;
        float: left;
        height: 100%;
        padding: 2px 0;
        background: #5b626f;
    }

    .issues {
        min-height: 10rem;
        background-color: lightgray;

        .issue {
            min-height: 5rem;
            background-color: cornflowerblue;
            margin: 0.1em 0;
        }
    }

    .block {
        overflow: hidden;
        border: 1px solid white;
    }

</style>
