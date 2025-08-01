import { HistoryConnect, HistorySet, IHistory } from "Models/history";
import { Point } from "Models/pt";
import { connectPoints, drawPoint, highlightPoint } from "Services/spriteLoder";

var allPoints : Point[] = [];
var selectedPoint : Point | undefined;
var history : IHistory[] = [];

export function overlapCheck(x : number, y : number, allPoints : Point[]) : Point | undefined{
    var finds = allPoints.find(item => 
        x >= item.upperX - 16 && 
        x <= item.lowerX + 16 && 
        y >= item.upperY - 16 && 
        y <= item.lowerY + 16
        );
    
    return finds;
}


export var PointTool = function(e : MouseEvent){
    var x : number = e.offsetX;
    var y : number = e.offsetY;


    var isOverlaps = overlapCheck(x, y, allPoints);
    
    if(isOverlaps){
        return;
    }
    var point = new Point(x,y);
    
    drawPoint(point, allPoints.length);
    allPoints.push(point);

    var historyRecord = new HistorySet(point, allPoints);
    history.push(historyRecord);
}


export var ConncectTool = function(e : MouseEvent){
    
    if(!selectedPoint){
        selectedPoint = overlapCheck(e.offsetX, e.offsetY, allPoints) as Point;
        highlightPoint(selectedPoint, 'green');
        return;
    }
    var point = overlapCheck(e.offsetX, e.offsetY, allPoints) as Point;
    
    connectPoints(selectedPoint, point, 'grey');

    point.connected_to.push(selectedPoint);
    selectedPoint.connected_to.push(point);

    highlightPoint(point, 'black');
    highlightPoint(selectedPoint, 'black');

    var historyRecord = new HistoryConnect(selectedPoint, point, allPoints);
    history.push(historyRecord);

    selectedPoint = undefined;
}

export var RemLastTool = function(){

    if(history.length <= 0){
        return
    }

    var historyRecord = history.pop() as IHistory;
    historyRecord.undo(allPoints);
    
}

export function getAllPoints(){
    return allPoints;
}

export function getConnectedPoints(point: Point){
    let queue: Point[] = [];
    let visited: Point[] = [];
    let currentPoint: Point;
    queue.push(point);

    while(queue.length > 0){
        currentPoint = queue.shift() as Point;

        if(visited.find(i => i == currentPoint))
            continue;

        visited.push(currentPoint);

        queue = queue.concat(currentPoint.connected_to);
    }
    return visited;
}