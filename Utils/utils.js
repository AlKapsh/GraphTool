import { Point } from "../Models/point.js";
import { connectPoints, drawPoint } from "../Services/spriteLoader.js";
import { removePoint } from "../Services/spriteLoader.js";
import { highlightPoint } from "../Services/spriteLoader.js";

var allPoints = [];

var selectedPoint = undefined;

/**
 * Checks if position of new point overlaps with existing points
 * @returns  {Point} point if overlaps \ undefined either
 */
export function overlapCheck(x, y, allPoints){
    var finds = allPoints.find(item => 
        x >= item.upperX - 16 && 
        x <= item.lowerX + 16 && 
        y >= item.upperY - 16 && 
        y <= item.lowerY + 16
        );
    
    return finds;
}

/**
 * @param {MouseEvent} e
*/
export var PointTool = function(e){
    var x = e.offsetX;
    var y = e.offsetY;

    var isOverlaps = overlapCheck(x, y, allPoints);
    
    if(isOverlaps){
        return;
    }
    var point = new Point(x,y);
    
    drawPoint(point, allPoints.length);

    allPoints.push(point);
}

/**
 * @param {MouseEvent} e
*/
export var ConncectTool = function(e){
    var point = overlapCheck(e.offsetX, e.offsetY, allPoints);

    if(!selectedPoint){
        selectedPoint = overlapCheck(e.offsetX, e.offsetY, allPoints);
        highlightPoint(selectedPoint, "green");
        return;
    }

    connectPoints(selectedPoint, point);

    highlightPoint(selectedPoint, "black");
    highlightPoint(point, "black");

    selectedPoint = undefined;


}

export var RemLastTool = function(){

    if(allPoints.length <= 0){
        return
    }
    var point = allPoints.pop();

    removePoint(point);
    
}