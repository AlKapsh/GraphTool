import { Point } from "Models/pt";

export const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

canvas.width = 21 * 64;
canvas.height = ~~(768 / 64) * 64;

const maxInstruments : number = 21;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const imgSize : number = 64;
const radius : number = imgSize / 4;

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


export function updateInstuments(toolNumber : number){
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
export function drawPoint(point : Point, pointNumber : unknown){
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

    ctx.fillText(pointNumber as string, point.posX, point.posY);
    ctx.fillStyle = "black";
}

export function removePoint(point : Point){

    ctx.beginPath();
    ctx.arc(point.posX, point.posY, radius + 1, 0 , 360);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";
}

export function highlightPoint(point : Point, color : string){

    if(!point){
        return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    ctx.arc(point.posX, point.posY, radius - 1, 0, 360);

    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

export function connectPoints(point : Point, otherPoint : Point, color : string){
    if(!point || !otherPoint){
        return;
    }

    var dx = point.posX - otherPoint.posX;;
    var dy = point.posY - otherPoint.posY;

    var angle = Math.atan2(dy,dx);

    var startX = point.posX - Math.cos(angle) * radius;
    var startY = point.posY - Math.sin(angle) * radius;

    var startX1 = otherPoint.posX + Math.cos(angle) * radius;
    var startY1 = otherPoint.posY + Math.sin(angle) * radius;

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    ctx.beginPath();

    ctx.moveTo(startX, startY);
    ctx.lineTo(startX1, startY1);

    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}

updateInstuments(0); 
