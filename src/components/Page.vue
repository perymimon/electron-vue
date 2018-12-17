<template>
    <div class="page">
        <h2>{{page.section}}</h2>
        <textarea class="preword" v-model="page.preword"></textarea>
        <button @click="addNewIssue(page)">add issue</button>

        <draggable v-model="page.issues" class="issues" :options="issueDraggableOption">
            <div class="issue"
                 v-for="(issue,index) in issues"
                 :key="issue.id">

                <div class="handler">...</div>
                <button @click="addNewBlock({issue,type:'text'})">text</button>
                <button @click="addNewBlock({issue,type:'image'})">image</button>
                <button @click="addNewBlock({issue,type:'quote'})">quote</button>
                {{issue.id}}
                <draggable v-model="issue.blocks" :options="blockDraggableOption">
                    <block v-for="(block,index) in blocks(issue)" :value="block" :key="block.id"></block>
                </draggable>
            </div>
        </draggable>
    </div>
</template>

<script type="text/jsx">
    import {mapMutations} from 'vuex'
    import Vue from "vue";

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
        computed: {
            issues: {
                get() {
                    return this.$store.getters['issues'](this.page)
                },
                set(values) {
                    this.page.issues = values.map(val => val.id)
                }
            },
            // blocks:{
            //
            // }

        },
        props: {
            value: Object
        },
        components: {        },
        methods: {
            ...mapMutations(['addNewPage', 'addNewIssue', 'addNewBlock']),
            blocks(issue){
                return this.$store.getters['blocks'](issue )
            }
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
