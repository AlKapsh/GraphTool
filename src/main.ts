import { updateInstuments } from "Services/spriteLoder";
import { ConncectTool, PointTool, RemLastTool } from "Utils/utility";

const imgSize = 64;
var CurrentTool = PointTool;


function changeTool(toolNumber : number){
    
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


function documentOnClick(e : MouseEvent){
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
