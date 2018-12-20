<template>
    <div class="block">
        <div class="handler">...</div>
        <template v-if="block.type=='text'">
            quote block {{block.content}} {{block}.id}
        </template>
        <template v-else-if="block.type=='quote'">
            quote block {{block.content}} {{block.id}}
        </template>
        <template v-else-if="block.type='image'">
            <figure>
                <img :src="block.src" draggable="false"/>
                <figcaption></figcaption>
            </figure>
        </template>
        <template v-else>
            block {{block.id}}
        </template>
    </div>
</template>

<script>
    export default {
        name: 'block',
        data() {
            return {
                block: this.value
            }
        },
        props: {
            value: Object
        },
        watch:{
          value() {this.block = value; }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .block {
        /*border: 1px solid black;*/
        padding: 2px;
        margin-top: 4px;
        box-shadow: 0px 2px 4px #00000026;

    }

    img, video {
        width: 100%;
    }

</style>
