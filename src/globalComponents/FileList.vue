<script>
    const {promises: fsp} = require("fs");
    const path = require('path');
    const fastGlob = require('fast-glob');
    const mime = require('mime');

    export default {
        name: 'FileList',
        data() {
            const {value} = this;
            return {
                blocks: value,
                draggableOptions:{
                    draggable: '.block',
                    group: {
                        name: 'blocks'
                    }
                }
            }
        },
        props: {
            value: {
                type: Array,
                default: _ => []
            },
            extension: {
                type: String,
                default: 'jpg|png|avi',
            },
            folderPath: {
                type: String,
                default: './',
            }
        },
        asyncComputed: {
            async folderfiles({extension, folderPath}) {
                if (!folderPath) return [];
                const globTemplate = path.join(folderPath, `*.+(${extension})`);
                const files = (await fastGlob.async([globTemplate], {onlyFiles: true}));
                return files;
            },
        },
        watch: {
            /*update model with "block" */
            folderfiles: function (files) {
                this.blocks = files.map(path => {
                    const mimeType = mime.getType(path);
                    return {
                        type: mimeType.replace(/\/.+/, ''),
                        path,
                        mimeType,
                        comment: ''
                    }
                });
                this.$emit('input', this.blocks);
            }
        },
        methods: {},

    }


</script>

<template>
    <draggable v-model="blocks" class="file-list" :options="draggableOptions">
        <div v-for="(block,index) in blocks"
             class="block"
             :id="`file-list-${index}`"
             draggable="true" :key="block.path">

            <slot :file="block">

                <video v-if="block.type === 'video'" autoplay loop :src="block.path"></video>
                <figure v-else-if="block.type = 'image'">
                    <img :src="block.path" draggable="false"/>
                    <figcaption></figcaption>
                </figure>


                <span v-else>{{block.path}}</span>

            </slot>
        </div>
    </draggable>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .file-list {
        width: 100%;
        overflow-y: auto;

    }

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
