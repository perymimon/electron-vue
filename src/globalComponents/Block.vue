<template>
    <div class="block" :class="block.type">
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

    .block{
        position: relative;
    }
    .handler{
        position: absolute;
        left: 0.2em;
        top:.1em;
        bottom: .1em;
        width: 10px;
        background: cornflowerblue;
        cursor: move;
        border-radius: 0.2em;
    }
    img, video {
        width: 100%;
    }

</style>
