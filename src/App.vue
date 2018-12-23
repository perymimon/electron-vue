<template>
    <div id="app" dir="rtl">
        <!-- TOP PANEL -->
        <div class="panel top-panel kix-document-top-shadow-inner">
            <button @click="changeRootPathByDialog">
                <font-awesome-icon size=1x fixed-width icon="folder-open"></font-awesome-icon>
                <span>open</span>
            </button>
            <h1>
                <font-awesome-icon icon="file" fixed-width></font-awesome-icon>
                <input type="text" v-model="projectName">
            </h1>
            <!--<button class="save-to-html" @click="saveToHTML">-->
            <!--Save to html-->
            <!--</button>-->
            <!--<button class="save-to-pdf" @click="saveToPDF">Save to pdf</button>-->
            <button class="save-window-to-pdf" @click="saveWebContentPDF">
                <font-awesome-icon size="1x" fixed-width icon="save"></font-awesome-icon>
                <span>PDF</span>
            </button>
            <div class="document-top-shadow-inner"></div>
        </div>

        <!-- LEFT IMAGES FS-->
        <div class="panel panel-start">
            <h4>{{section}}</h4>
            <file-list class="folder-image-list" :folderPath="sectionPath" @input="setImagesPaths"
                       extension="jpg|png|avi">
                <draggable v-model="imagesBlocks"
                           :options="draggableOption">
                        <block v-for="(block,index) in imagesBlocks"
                               :value="block" :key="block.id"></block>
                </draggable>
            </file-list>
        </div>

        <!-- MAIN AREA -->
        <div class="panel main-area" ref="mainDocument">
            <Intersect v-for="page in pages"
                       v-cloak
                       :key="page.section"
                       @enter="selectSection(page.section)"
                       @leave=""
                       :root="$refs.mainDocument"
                       root-margin="-20% 0px -80% 0px"
                       :threshold="[0]">
                <Page :value="page" :key="page.section"></Page>
            </Intersect>
        </div>


        <div class="panel panel-end">
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

                <db-entry :dbName="section" v-model="quoteBlocks">
                    <!--<medium-editor v-for="(value, index) of quoteList"-->
                    <!--class="quote"-->
                    <!--:text="value"-->
                    <!--@edit="editQuotes({index, quote:$event.api.origElements.innerHTML})">-->
                    <draggable v-model="quoteBlocks"
                               :options="imageDraggableOptions">
                        <block v-for="(block, index) of quoteBlocks" :value="block" :key="block.id">

                        </block>
                    </draggable>
                    <!--</medium-editor>-->
                </db-entry>

            </div>


        </div>
    </div>

</template>

<style lang="scss">
    @import "./style/variables";

    h1 {
        margin: 0;
        flex: 1;
        text-align: start;
        padding: 0 .5em;

    }

    input {
        flex: 1;
        margin: 0 0.5em;

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

    .document-top-shadow-inner {
        background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(transparent));
        height: 6px;
        position: relative;
        z-index: 504;
        opacity: 1;
        width: 100%;
    }

    .editor {
        flex: 1;
    }

    .panel {
        border: $border;
        display: flex;
        flex-direction: column;
    }

    .top-panel {
        grid-column: 1 / -1;
        flex-flow: row wrap;
        border: $border;


    }

    .main-area {
        display: grid;
        overflow-y: auto;
        align-items: center;
        justify-content: center;
        grid-auto-rows: minmax(max-content, auto);
    }

    .folder-image-list {
        overflow-y: auto;

        figcaption {
            font-size: small;
        }
    }

    .quote-list {
        border: $border;
        min-height: 30em;
        background: darkgray;
        margin: .4em 0;
    }
</style>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Page from './components/Page'
    import blockFactory from "./factories/block";
    import {saveDOMtoHTML, saveHTMLToPDF, saveWebContentPDF} from "./jobs/prints";
    import Intersect from 'vue-intersect'

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
            documentName: 'document',
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
            log(msg) {
                console.log(msg);
            },
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
                this.$set(this.quoteBlocks, this.quoteBlocks.length, blockFactory('quote', {
                    content: quote,
                }))
            },
            async saveToHTML() {
                const {$refs, documentName, rootPath} = this;
                await saveDOMtoHTML($refs.mainDocument,
                    `${rootPath}/${documentName}.html`
                );
                console.log('Write HTML successfully.')
            },
            saveToPDF() {
                const {$refs, documentName, rootPath} = this;
                saveHTMLToPDF(`${rootPath}/${documentName}.html`, `${rootPath}/${documentName}.pdf`);
                console.log('Write PDF successfully.')
            },
            saveWebContentPDF() {
                const {$refs, documentName, rootPath} = this;
                saveWebContentPDF(`${rootPath}/${documentName}.pdf`);
                console.log('Write PDF successfully.')
            }


        },
        components: {
            Page, Intersect
        },


    }
</script>

