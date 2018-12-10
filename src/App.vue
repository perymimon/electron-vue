<!--// function (filepaths, bookmarks) {
// debugger;
//     //read image (note: use async in production)
//     var imageFile = fs.readFileSync(filepaths[0]).toString('base64');
//     //example for .png
//     var imageHTHL = '<img src="data:image/png;base64,' + imageFile + '"/>';
//     //render/display
//     var _target = document.getElementById('image_container');
//     _target.insertAdjacentHTML('beforeend', imageHTHL);
//
//     return;
// }-->

<script>
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
    import FolderImageList from "./components/FolderImageList";
    const path = require('path');
    const {promises: fsp} = require("fs");


    export default {
        name: 'app',
        data: vm => ({
            text: 'check it out!',
            options:{}
        }),
        props: [],
        computed: {
            ...mapState(['rootPath','section','sectionList']),
            ...mapGetters(['activePath'])
        },
        asyncComputed: {        },
        components: {
            FolderImageList
        },
        methods: {
            ... mapMutations(['changeSection']),
            ... mapActions('addNewQuotes,changeRootPathByDialog,selectSection'.split(',')),
            async processEditOperation(operation) {
                this.text = operation.api.origElements.innerHTML;
                const savePath = path.join(this.activePath, 'content.html');
                await fsp.writeFile(savePath,this.text)
            }
        }


    }
</script>


<template>
    <div id="app">
        <!-- TOP PANEL -->
        <div class="panel top-panel">
            <button @click="changeRootPathByDialog">open</button>
            <input type="text" :value="rootPath">
        </div>

        <!-- LEFT -->
        <div class="panel">
            <h4>{{section}}</h4>
            <file-list :folderPath="activePath"></file-list>
        </div>

        <!-- MAIN AREA -->
        <div class="panel main-area">
            <!--<img alt="Vue logo" src="./assets/logo.png">-->
            <h1>{{section}}</h1>
            <medium-editor
                    class="editor"
                    :text='text'
                    :options='options'
                    @edit='processEditOperation'
                    custom-tag='div'>
            </medium-editor>
        </div>

        <!--<div class="panel">-->
        <!--<folder-image-list :folderPath="imagesPath"></folder-image-list>-->
        <!--</div>-->

        <div class="panel">
            <div v-for="section in sectionList" :key="section"
                 @click="changeSection(section)">
                {{section}}
            </div>
            <!--<folder-markdown-list :folderPath="commentsPath"></folder-markdown-list>-->


        </div>

    </div>
</template>

<style lang="scss">

    #app {
        height: 100vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: grid;
        grid-template-columns: 20em 1fr 20em 10em;
        grid-template-rows: 3em calc(100vh - 4em);
    }

    .editor{
        flex: 1;
    }

    .panel {
        border: 1px solid;
        display: flex;
        flex-direction: column;
    }

    .top-panel {
        grid-column: 1 / -1;
        flex-direction: row;
        border: none;

        input {
            flex: 1;
            border: none;
        }
    }

    .folder-image-list {
        overflow-y: auto;
    }

</style>
