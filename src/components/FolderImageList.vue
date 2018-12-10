<script>
    const {promises: fsp} = require("fs");
    const fastGlob = require('fast-glob');
    const path = require('path');


    export default {
        name: 'FolderImagesList',
        props: {
            folderPath: {
                type: String,
                required: true
            }
        },
        methods:{
          isVideo(fileName){
              return fileName.match(/\.mp4$/);
          }
        },
        asyncComputed: {
            // async imagesPath() {
            //     if (!this.$props.folderPath) return [];
            //
            //     const filesName = await fsp.readdir(this.$props.folderPath, {withFileTypes: true});
            //     console.log(filesName);
            //
            //     return filesName.map(fileName => path.join(this.$props.folderPath, fileName))
            //
            // }
        }
    }


</script>

<template>
    <file-list :folderPath="folderPath" :extension="'png|avi|jpg'">
        <template slot-scope="{ filePath }">
            <video v-if="isVideo(filePath)" autoplay loop :src="filePath"></video>
            <img v-else :src="filePath">
        </template>
    </file-list>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .folder-image-list{
        width: 100%;

    }
    .image-block{
        /*border: 1px solid black;*/
        padding: 2px;
        margin-top: 4px;
        box-shadow: 0px 2px 4px #00000026;

    }

    img,video{
        width: 100%;
    }


</style>
