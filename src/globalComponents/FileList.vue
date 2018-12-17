<script>
    const {promises: fsp} = require("fs");
    const path = require('path');
    const fastGlob = require('fast-glob');
    const mime = require('mime');

    export default {
        name: 'FileList',
        data() {
            return {
                paths: []
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
        asyncComputed: {},
        watch: {
            folderPath:'updatePathsFiles',
            value(v) {return this.paths = v;}/*??*/
        },
        methods: {
            async updatePathsFiles() {
                const {extension, folderPath} = this;
                if (!folderPath) return [];
                const globTemplate = path.join(folderPath, `*.+(${extension})`);
                this.paths = (await fastGlob.async([globTemplate], {onlyFiles: true}));
                this.$emit('input', this.paths);
            },
        },

    }


</script>

<template>
    <div class="file-list">
        <slot :paths="paths" >
            <div v-for="(path,index) in paths">
                {{index}} : {{path}}
            </div>
        </slot>
    </div>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .file-list {
        width: 100%;
        overflow-y: auto;

    }
</style>
