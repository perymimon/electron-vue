<template>
    <div class="page">
        <h2>{{page.section}}</h2>
        <medium-editor class="preword" text=""></medium-editor>
        <button @click="addNewIssue(page)">add issue</button>

        <!--<draggable v-model="page.issues"-->
                   <!--class="issues" :options="issueDraggableOption">-->
            <issue  v-for="(issue,index) in issues"
                    :value="issue"
                    :key="issue.id"></issue>
        <!--</draggable>-->
    </div>
</template>



<script type="text/jsx">
    import {mapMutations} from 'vuex'
    import './Page.style.scss'
    import Issue from './Issue';

    export default {
        name: 'page',
        props: {
            value: Object
        },
        data() {
            return {
                page: this.$props.value,
                issueDraggableOption: {
                    draggable: '.issue',
                    handle: '.handler',
                    group: {
                        name: 'issues'
                    },


                },
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
        },

        components: {   Issue     },
        methods: {
            ...mapMutations(['addNewIssue']),
        }
    }
</script>

