export const canvas = document.querySelector("#canvas");

canvas.width = 21 * 64;
canvas.height = ~~(768 / 64) * 64;
const maxInstruments = 21;

export const ctx = canvas.getContext("2d");
const imgSize = 64;
const radius = imgSize / 4;

const ImgPointTool = new Image();
const ImgConnectTool = new Image();
const ImgBackTool = new Image();

ImgPointTool.src = "Sprites/PointTool.png";
ImgConnectTool.src = "Sprites/ConnectTool.png";
ImgBackTool.src = "Sprites/RemoveLast.png";

ImgPointTool.onload = () => {
    ctx.drawImage(ImgPointTool, 0, 0, imgSize, imgSize);
    ctx.strokeRect(0, 0, imgSize, imgSize);
}
ImgConnectTool.onload = () => {
    ctx.drawImage(ImgConnectTool, 64, 0, imgSize, imgSize);
    ctx.strokeRect(64, 0, imgSize, imgSize);
}
ImgBackTool.onload = () => {
    ctx.drawImage(ImgBackTool, 128, 0, imgSize, imgSize);
    ctx.strokeRect(128, 0, imgSize, imgSize);
}

export function updateInstuments(toolNumber){
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    for(var i = 0; i < maxInstruments; i++){
        ctx.strokeRect(i * 64, 0, imgSize, imgSize);
    }

    ctx.strokeStyle = "red";
    ctx.strokeRect(imgSize * toolNumber, 0, imgSize, imgSize);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}

/**
 * @param {Number} pointNumber Number of point to display
 */
export function drawPoint(point, pointNumber ){
    var radius = imgSize / 4;

    ctx.beginPath();
    ctx.arc(point.posX, point.posY, radius, 0, 360 );
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(pointNumber, point.posX, point.posY);
    ctx.fillStyle = "black";
}

export function removePoint(point){

    ctx.beginPath();
    ctx.arc(point.posX, point.posY, radius + 1, 0 , 360);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";
}

export function highlightPoint(point, color){

    if(!point){
        return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    ctx.arc(point.posX, point.posY, radius, 0, 360);

    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

export function connectPoints(point, otherPoint){
    if(!point || !otherPoint){
        return;
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = "grey";

    ctx.beginPath();

    ctx.moveTo(point.posX, point.posY);
    ctx.lineTo(otherPoint.posX, otherPoint.posY);

    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

}

updateInstuments(0); 