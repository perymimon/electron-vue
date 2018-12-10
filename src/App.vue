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
    const path = require('path');
    import FolderImageList from "./components/FolderImageList";
    const {promises: fsp} = require("fs");
    const globb = require('globby');

    const fg = require('fast-glob');

    const {remote} = require('electron');
    const {dialog} = remote;
    var levelup = require('levelup');
    var leveldown = require('leveldown');
    // 1) Create our store
    var db = levelup(leveldown('./content'));
    var putValue = async (_) => {
        await db.put('name', 'levelup');
        var value = await db.get('name');
        console.log(value);

    };
    putValue();

    export default {
        name: 'app',
        data: vm => ({
            rootPath: 'C:\\Users\\perym\\OneDrive\\Documents\\תן אמון במימון',
            section: '',
            folderCommentsRootName: 'ציטוטים',
            text: 'check it out!',
            options:{}
        }),
        props: [],
        computed: {
            imagesPath() {
                return path.join(this.rootPath, this.section) || '';
            },
            commentsPath() {
                return path.join(this.rootPath, this.folderCommentsRootName) || '';
            }
        },
        asyncComputed: {
            async sections() {
                const rootPath = this.rootPath;
                const paths = await fg.async([path.join(rootPath, '*')], {onlyDirectories: true});
                return paths.map(directoryPath => path.basename(directoryPath));
            }
        },
        components: {
            FolderImageList
        },
        methods: {
            selectRootPath() {
                let folderPath = dialog.showOpenDialog(remote.getCurrentWindow(), {
                    properties: ['openDirectory']
                });
                this.rootPath = folderPath[0];
                console.log('root path:', folderPath);
            },
            selectSection(name) {
                this.section = name;
            },
            async processEditOperation(operation) {
                console.log(operation);
                this.text = operation.api.origElements.innerHTML;
                const savePath = path.join(this.rootPath, this.section, 'content.html');
                await fsp.writeFile(savePath,this.text)
            }
        },
        // mounted(){
        // const container = this.$refs.editor;
        // debugger;
        // var simplemde = new SimpleMDE({
        //     element: container,
        //     autoDownloadFontAwesome:true,
        //     forceSync:true
        // });
        // }

    }
</script>


<template>
    <div id="app">
        <!-- TOP PANEL -->
        <div class="panel top-panel">
            <button @click="selectRootPath">opne</button>
            <input type="text" v-model="rootPath">
        </div>

        <!-- LEFT -->
        <div class="panel">
            <h4>{{section}}</h4>
            <file-list :folderPath="imagesPath"></file-list>
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
            <div v-for="section in sections" @click="selectSection(section)">
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
