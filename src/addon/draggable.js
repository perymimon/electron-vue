import draggable from 'vuedraggable'
import Vue from "vue";

Vue.component('draggable', draggable);

export const draggableOptions = {

    data(){
        return {
            blockDraggableOption: {
                draggable: '.block',
                handle: '.handler',
                group: {
                    name: 'blocks'
                },
                nativeDraggable:false,
                setData(dataTransper, dragedElement){
                    dataTransper.setDragImage(dragedElement.cloneNode(true),0,0);
                    dataTransper.dropEffect = '-webkit-grab';
                }

            }
        }
    }

};

Vue.mixin(draggableOptions);
