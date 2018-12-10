<script>
    const {promises: fsp} = require("fs");
    const path = require('path');


    export default {
        name: 'FolderMarkdownList',
        props: {
            
            folderPath: {
                type: String,
                required: true
            }
        },
        methods:{
            async files(extention) {
                if (!this.$props.folderPath) return [];

                const testExt = new RegExp(`\.(${extention})$`);

                const filesName = await fsp.readdir(this.$props.folderPath, {withFileTypes: true});
                console.log(filesName);

                return filesName
                    .filter ( name => !!name.match(testExt))
                    .map(fileName => path.join(this.$props.folderPath, fileName))

            }
        },
        asyncComputed: {

        }
    }


</script>

<template>
    <div class="folder-markdown-list">
        <div class="image-block" v-for="filePath in files('md')" draggable="true" :key="filePath">
            {{filePath}}
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .folder-markdown-list{
        width: 100%;

    }



</style>
