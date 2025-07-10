export const canvas = document.querySelector("#canvas");

canvas.width = 21 * 64;
canvas.height = ~~(768 / 64) * 64;
const maxInstruments = 21;

export const ctx = canvas.getContext("2d");
const imgSize = 64;

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
export function updateInstuments(){
    ctx.fillStyle = 'black';
    for(var i = 0; i < maxInstruments; i++){
        ctx.strokeRect(i * 64, 0, imgSize, imgSize);
    }
}

updateInstuments(); 