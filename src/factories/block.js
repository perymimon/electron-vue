const shortid = require('shortid');

export default function blockFactory(type, payload) {
    return Object.assign({
        id:shortid.generate(),
        type:type || payload.type|| 'text',
        comment:'',
    },payload)
}



// this.blocks = files.map(path => {
//     const mimeType = mime.getType(path);
//     return {
//         type: mimeType.replace(/\/.+/, ''),
//         path,
//         mimeType,
//         comment: ''
//     }
// });

// <video v-if="block.type === 'video'" autoplay loop :src="block.path"></video>
//     <figure v-else-if="block.type = 'image'">
//     <img :src="block.path" draggable="false"/>
//     <figcaption></figcaption>
//     </figure>
//     <span v-else>{{block.path}}</span>
