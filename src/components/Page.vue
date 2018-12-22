<template>
    <div class="page">
        <h2>{{page.section}}</h2>
        <textarea class="preword" v-model="page.preword"></textarea>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">





</style>
