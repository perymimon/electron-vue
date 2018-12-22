import Vue from 'vue';

function loadComponentDirectory(directoryPath){
    // param 0: The relative path of the components folder
// param 1: Whether or not to look in subfolders
// param 2: The regular expression used to match base component filenames
    const requireComponent = require.context(`../${directoryPath}`, false, /[A-Z]\w+\.vue$/ );

// Get component config
    requireComponent.keys().forEach(fileName => {

        const componentConfig = requireComponent(fileName);

        // Get PascalCase name of component
        // Strip the leading `./` and extension from the filename
        const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');

        // Register component globally
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        Vue.component(componentName, componentConfig.default || componentConfig )
    });


}

module.exports = loadComponentDirectory;
