//@ts-check
import { Point } from "./point.js";
import { overlapCheck } from "./utils.js";
import { ctx } from "./spriteLoader.js";
import { updateInstuments } from "./spriteLoader.js";

const imgSize = 64;
var allPoints = [];

/**
 * @param {MouseEvent} e
*/
var PointTool = function(e){
    var radius = imgSize / 4;
    var x = e.offsetX;
    var y = e.offsetY;

    var isOverlaps = overlapCheck(x, y, allPoints);
    
    if(isOverlaps){
        return;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360 );
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(allPoints.length, x, y);

    var point = new Point(x,y);
    allPoints.push(point);

    ctx.fillStyle = "black";
}

/**
 * @param {MouseEvent} e
*/
var ConncectTool = function(e){
    console.log(allPoints);
};


var RemLastTool = function(){
    var radius = imgSize / 4;
    var point = allPoints.pop();
    
    ctx.beginPath()
    ctx.arc(point.posX, point.posY, radius + 1, 0 , 360);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.fillStyle = "black";
}

var CurrentTool = PointTool;

function changeTool(toolNumber){
    ctx.strokeStyle = "black";
    updateInstuments();

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

    ctx.strokeStyle = "red";
    ctx.strokeRect(imgSize * toolNumber, 0, imgSize, imgSize);

    ctx.strokeStyle = "black";
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

    
    //console.log(CurrentTool);
}


document.addEventListener("click", e => {
    e.preventDefault();
    documentOnClick(e);
})

