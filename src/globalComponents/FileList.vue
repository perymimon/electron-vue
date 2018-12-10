<script>
    const {promises: fsp} = require("fs");
    const path = require('path');
    const fastGlob = require('fast-glob');
    const mime = require('mime');

    export default {
        name:'FileList',
        props: {
            extension: {
                type: String,
                default: 'jpg|png|avi',
            },
            folderPath: {
                type: String,
                default: './',
            }
        },
        methods:{

        },
        asyncComputed: {
            async files() {
                if (!this.$props.folderPath) return [];
                const files = (await fastGlob.async([path.join(this.folderPath, `*.+(${this.extension})`)], {onlyFiles: true}))
                    .map( path => ({path, mimetype: mime.getType(path)}));

                return files;
            }
        }
    }


</script>

<template>
    <div class="file-list">
        <div class="block" v-for="file in files" draggable="true" :key="file.path" >
            <slot :file="file" >

                <video v-if="file.mimetype.match(/^video/)" autoplay loop :src="file.path"></video>
                <img v-else-if="file.mimetype.match(/^image/)" :src="file.path" />
                <span v-else>{{file.path}}</span>

            </slot>
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .file-list{
        width: 100%;
        overflow-y: auto;

    }
    .block{
        /*border: 1px solid black;*/
        padding: 2px;
        margin-top: 4px;
        box-shadow: 0px 2px 4px #00000026;

    }

    img,video{
        width: 100%;
    }


</style>
