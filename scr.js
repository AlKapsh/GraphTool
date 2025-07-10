//@ts-check
import { updateInstuments } from "./Services/spriteLoader.js";
import { PointTool, RemLastTool,  ConncectTool } from "./Utils/utils.js";

const imgSize = 64;
var CurrentTool = PointTool;


function changeTool(toolNumber){
    
    updateInstuments(toolNumber);

    switch(toolNumber){
        case 0:
            CurrentTool = PointTool;
            break;
        case 1:
            CurrentTool = ConncectTool;
            break;
        case 2:
            RemLastTool();
            break;
        default :
            CurrentTool = PointTool;
    }
}


/**
 * @param {MouseEvent} e
*/
function documentOnClick(e){
    var toolNumber = ~~(e.offsetX / 64);

    if(e.offsetY <= imgSize){
        changeTool(toolNumber);
        return;
    }
    
    CurrentTool(e);
}


document.addEventListener("click", e => {
    e.preventDefault();
    documentOnClick(e);
});


document.addEventListener("keydown", e => {
    if(e.ctrlKey && e.key == "z"){
        RemLastTool();
    }
});

