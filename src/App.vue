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
<template>
    <div id="app">
        <!-- TOP PANEL -->
        <div class="panel top-panel">
            <button @click="changeRootPathByDialog">open</button>
            <h1>{{projectName}}</h1>
        </div>

        <!-- LEFT IMAGES FS-->
        <div class="panel">
            <h4>{{section}}</h4>
            <file-list :folderPath="sectionPath" @input="setImagesPaths" extension="jpg|png|avi">
                <draggable v-model="imagesBlocks"
                           :options="imageDraggableOptions">

                    <block v-for="(block,index) in imagesBlocks"
                           :value="block" :key="block.id"></block>

                </draggable>
            </file-list>
        </div>

        <!-- MAIN AREA -->
        <div class="panel main-area">
            <Page v-for="page in pages" :value="page"></Page>
        </div>


        <div class="panel">
            <!-- SECTIONS -->
            <div v-for="section in sections" :key="section"
                 @click="selectSection(section)">
                {{section}}
            </div>
            <!-- QUOTE AREA-->
            <input type="search" v-model="query">

            <div class="quote-list">

                <textarea v-model.lazy="newQuotes"></textarea>
                <button @click="addNewQuotes(newQuotes)">add quote</button>

                <db-list :dbName="section" v-model="quoteBlocks">
                    <!--<medium-editor v-for="(value, index) of quoteList"-->
                                   <!--class="quote"-->
                                   <!--:text="value"-->
                                   <!--@edit="editQuotes({index, quote:$event.api.origElements.innerHTML})">-->
                    <div v-for="(block, index) of quoteBlocks">
                        {{block.value}}
                    </div>

                    <!--</medium-editor>-->
                </db-list>

            </div>


        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Page from './components/Page'
    import blockFactory from "./factories/block";

    const path = require('path');
    const {promises: fsp} = require("fs");
    var temporaryBlockSave = null;

    function filterSrcPaths($store, paths) {
        const globalBlocks = Object.values($store.state.pages.blocksMap);
        const blocksImage = globalBlocks.filter(b => b.type === 'image');
        const usedPaths = new Set(blocksImage.map(b => b.src));

        const unsusedPaths = paths.filter(p => !usedPaths.has(p));
        return unsusedPaths;

    }

    export default {
        name: 'app',
        data: vm => ({
            query: '',
            newQuotes: '',
            imagesPaths: [],
            quoteBlocks: [],
            imageDraggableOptions: {
                draggable: '.block',
                group: {
                    name: 'blocks'
                }
            }
        }),
        props: [],
        computed: {
            imagesBlocks: {
                get() {
                    return this.imagesPaths.map(path => blockFactory('image', {
                        src: path
                    }));
                },
                set(blocks) {
                    console.log(blocks);
                    this.imagesPaths = blocks.map(v => v.src);
                }

            },
            ...mapState(['rootPath', 'section', 'quotesList']),
            ...mapGetters(['sectionPath', 'projectName', 'pages', 'issues', 'blocks']),
            ...mapGetters(['pagesSet', 'issues', 'blocks']),


        },
        asyncComputed: {...mapGetters(['sections'])},

        methods: {
            ...mapMutations(['addNewPage', 'addNewIssue', 'addNewBlock']),
            ...mapActions('addNewQuotes,changeRootPathByDialog,selectSection,editQuotes,addNewQuotes'.split(',')),

            async processEditOperation(operation) {
                this.text = operation.api.origElements.innerHTML;
                const savePath = path.join(this.sectionPath, 'content.html');
                await fsp.writeFile(savePath, this.text)
            },

            setImagesPaths(srcPaths) {
                this.imagesPaths = filterSrcPaths(this.$store, srcPaths);

            },
            cloneBlockImage(block) {
                this.$store.commit('addBlockToMap', block);
                return block.id;
            },
            addNewQuotes(quote) {
                this.$set(this.quoteBlocks,this.quoteBlocks.length, blockFactory('quote', {
                    value: quote,
                }))
            }


            // async drageend(event){
            //     const elementID = event.dataTransfer.getData('element-id');
            //     const path = event.dataTransfer.getData('path');
            //     debugger;
            // }
        },
        components: {
            Page
        },


    }
</script>


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

    .quote-list {
        border: 1px solid beige;
        min-height: 30em;
        background: darkgray;
        margin: .4em 0;
    }
</style>
