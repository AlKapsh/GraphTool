//@ts-check
import { Point } from "./point.js";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const imgSize = 64;
const ImgPointTool = new Image();
const ImgConnectTool = new Image();

ImgPointTool.src = "Sprites/PointTool.png";
ImgConnectTool.src = "Sprites/ConnectTool.png";

ImgConnectTool.onload = () => {
    ctx.drawImage(ImgConnectTool, 64, 0, imgSize, imgSize);
    ctx.strokeRect(64, 0, imgSize, imgSize);
}
ImgPointTool.onload = () => {
    ctx.drawImage(ImgPointTool, 0, 0, imgSize, imgSize);
    ctx.strokeRect(0, 0, imgSize, imgSize);
}

var allPoints = [];

/**
 * @param {MouseEvent} e
*/
var PointTool = function(e){
    var radius = imgSize / 4;
    var x = e.offsetX;
    var y = e.offsetY;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360 );
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();


    var point = new Point(x,y);
    allPoints.push(point);
}

/**
 * @param {MouseEvent} e
*/
var ConncectTool = function(e){
    console.log(allPoints);
};

var CurrentTool = PointTool;

function changeTool(toolNumber){
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, imgSize, imgSize);
    ctx.strokeRect(64, 0, imgSize, imgSize);

    CurrentTool = toolNumber == 0 ? PointTool : ConncectTool;

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

