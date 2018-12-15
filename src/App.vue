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
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Page from './components/Page'

    const path = require('path');
    const {promises: fsp} = require("fs");


    export default {
        name: 'app',
        data: vm => ({
            query: '',
            newQuotes: '',
            text: 'check it out!',
            options: {}
        }),
        props: [],
        computed: {
            ...mapState(['rootPath', 'section', 'quotesList']),
            ...mapGetters(['activePath', 'projectName', 'pages', 'issues', 'blocks']),
            ...mapGetters('pages', ['pages', 'issues', 'blocks'])
        },
        asyncComputed: {...mapGetters(['sectionList'])},
        components: {
            Page
        },
        methods: {
            // ... mapMutations(['addNewPage','addNewIssue','addNewBlock']),
            ...mapMutations('pages', ['addNewPage', 'addNewIssue', 'addNewBlock']),
            ...mapActions('addNewQuotes,changeRootPathByDialog,selectSection,editQuotes,addNewQuotes'.split(',')),

            async processEditOperation(operation) {
                this.text = operation.api.origElements.innerHTML;
                const savePath = path.join(this.activePath, 'content.html');
                await fsp.writeFile(savePath, this.text)
            },

            // async drageend(event){
            //     const elementID = event.dataTransfer.getData('element-id');
            //     const path = event.dataTransfer.getData('path');
            //     debugger;
            // }
        }


    }
</script>


<template>
    <div id="app">
        <!-- TOP PANEL -->
        <div class="panel top-panel">
            <button @click="changeRootPathByDialog">open</button>
            <h1>{{projectName}}</h1>
        </div>

        <!-- LEFT -->
        <div class="panel">
            <h4>{{section}}</h4>
            <file-list :folderPath="activePath"></file-list>
        </div>

        <!-- MAIN AREA -->
        <div class="panel main-area">
            <Page v-for="page in pages" :value="page"></Page>
        </div>

        <!--<div class="panel">-->
        <!--<folder-image-list :folderPath="imagesPath"></folder-image-list>-->
        <!--</div>-->

        <div class="panel">

            <div v-for="section in sectionList" :key="section"
                 @click="selectSection(section)">
                {{section}}
            </div>

            <input type="search" v-model="query">

            <medium-editor class="quote"
                           v-for="(value, index) of quotesList"
                           :text="value"
                           @edit="editQuotes({index, quote:$event.api.origElements.innerHTML})">
                {{value}}
            </medium-editor>

            <textarea v-model.lazy="newQuotes"></textarea>
            <button @click="addNewQuotes(newQuotes)">add quote</button>

        </div>
    </div>
</template>

<style lang="scss">
    h1 {
        margin: 0;
    }

    .quote {
        border: 1px solid;
        border-radius: 0.3em;
    }

    #app {
        height: 100vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: grid;
        grid-template-columns: 20em 1fr 10em;
        grid-template-rows: 3em calc(100vh - 4em);
    }

    .editor {
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

    .main-area {
        display: block;
        overflow-y: auto;
    }

    .folder-image-list {
        overflow-y: auto;
    }

</style>
