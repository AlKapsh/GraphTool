import { connectPoints, drawPoint, removePoint } from "Services/spriteLoder";
import { Point } from "./pt";

export interface IHistory{
    point : Point;

    undo(allPoints : Point[]) : void;
}

export class HistorySet implements IHistory{
    point: Point;

    constructor(point : Point, allPoints : Point[]){
        this.point = point;
        console.log(`Добавлена точка ${allPoints.indexOf(this.point)}`);
    }

    undo(allPoints : Point[]){
        
        console.log(`Удалена точка ${allPoints.indexOf(this.point)}`);
        allPoints.pop();
        removePoint(this.point);
    }
}

export class HistoryConnect implements IHistory{
    point: Point;
    other: Point;

    constructor(point : Point, other : Point, allPoints : Point[]) {
        this.point = point;
        this.other = other;

        console.log(`Добавлена связь между точками ${allPoints.indexOf(this.point)} и ${allPoints.indexOf(this.other)}`);
    }

    undo(allPoints: Point[]){
        this.point.connected_to.filter(i => i != this.other);
        this.other.connected_to.filter(i => i != this.point);

        connectPoints(this.point, this.other, 'white');

        console.log(`Удалена связь между точками ${allPoints.indexOf(this.point)} и ${allPoints.indexOf(this.other)}`)
    }
}
