<template>
    <div class="issue">
        <!--<div class="handler"><icon icon="grip-vertical"></icon></div>-->
        <button @click="addNewBlock({issue,payload:{type:'text'}})">text</button>
        <button @click="addNewBlock({issue,payload:{type:'image',src:'abc'}})">image</button>
        <button @click="addNewBlock({issue,payload:{type:'quote'}})">quote</button>

        {{issue.id}}

        <draggable class="blocks" v-model="blocks" :options="blockDraggableOption" >
            <block v-for="(block,index) in blocks" :value="block" :key="block.id"></block>
        </draggable>
    </div>
</template>


<script type="text/jsx">
    import {mapMutations} from 'vuex'

    export default {
        name: 'issue',
        props: {
            value: Object
        },
        data() {
            return {
                issue: this.value,

            }
        },
        computed: {
            blocks: {
                get() {
                    return this.$store.getters['blocks'](this.issue)
                },
                set(values) {
                    this.$store.commit('addBlocks', values);
                    this.issue.blocks = values.map(val => val.id)
                }
            },
        },

        components: {},
        methods: {
            ...mapMutations(['addNewBlock']),
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.issue{
    position: relative;
}

</style>
