<template>
    <div class="db-list">
        <slot :records="value">
            <div v-for="(record,index) in records">
                {{index}} : {{record}}
            </div>
        </slot>
    </div>

</template>

<script>
    const DB_FILE_NAME = './quotes';
    const level = require('level');
    const db = level(DB_FILE_NAME, {valueEncoding: 'json'});
    import { remote } from 'electron'
    //
    // // Close DB when all windows are closed.
    remote.getCurrentWindow().on('close', (event) => {
        db.close();
    });


    export default {
        name: 'dbEntry',
        data() {
            return {
                records: []
            }
        },
        props: {
            value: {
                type: Array,
                default: _ => []
            },
            dbName: {
                type: String,
                required: true
            }
        },
        watch: {
            dbName: 'loadRecords',
            value: {
                deep: true,
                async handler(value) {
                    this.records = value;
                    await db.put(this.dbName, value);
                }
            },
        },
        methods: {
            async loadRecords() {
                try {
                    var recordsList = await db.get(this.dbName);
                } catch (e) {
                    if (!e.notFound) {
                        console.error(e);
                    }
                    recordsList = [];
                }
                this.records = recordsList;
                this.$emit('input', recordsList);
            },
        },
     }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .file-list {
        width: 100%;
        overflow-y: auto;

    }
</style>
