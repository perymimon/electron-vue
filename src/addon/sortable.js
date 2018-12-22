import draggable from 'vuedraggable'
import Vue from "vue";
import './sortable.scss'

Vue.component('draggable', draggable);

export const draggableOptions = {

    data(){
        return {
            draggableOption: {
                draggable: '.block',
                handle: '.handler',
                group: {
                    name: 'blocks'
                },
                forceFallback:true,
                fallbackTolerance:2,
                fallbackOnBody:false,

                scrollSensitivity:20,
                // setData(dataTransper, dragedElement){
                //     dataTransper.setDragImage(dragedElement.cloneNode(true),0,0);
                //     // dataTransper.dropEffect = '-webkit-grab';
                // }

            }
        }
    }

};

Vue.mixin(draggableOptions);
