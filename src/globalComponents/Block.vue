<template>
    <div class="block" :class="block.type">
        <div class="handler">
            <icon icon="grip-vertical"></icon>
        </div>

        <template v-if="block.type == 'text'">
            <medium-editor :text="block.comment"></medium-editor>
            <br> {{block.id}}
        </template>

        <template v-else-if="block.type=='quote'">
            quote block {{block.content}} {{block.id}}
        </template>

        <template v-else-if="block.type='image'">
            <figure>
                <img :src="block.src" draggable="false"/>
                <medium-editor :text="block.comment" custom-tag="figcaption"></medium-editor>
            </figure>
        </template>

        <template v-else>
            block {{block.id}}
        </template>
    </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .block {
        position: relative;
        padding-left: 15px;
    }

    figcaption textarea {
        width: 100%;
    }

    img, video {
        width: 100%;
    }

    .handler {
        position: absolute;
        left: 0.2em;
        top: .1em;
        bottom: .1em;
        width: 10px;
        border-radius: 0.2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: gray;
        justify-items: center;
        cursor: -webkit-grab;
    }

</style>

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
        watch: {
            value() {
                this.block = value;
            }
        },
    }
</script>

