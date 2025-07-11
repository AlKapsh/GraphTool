
export class Point {
    posX : number;
    posY : number;

    upperX : number;
    upperY : number;

    lowerX : number;
    lowerY : number;

    connected_to: Point[] = [];

    constructor(posX : number, posY : number){
        this.posX = posX;
        this.posY = posY;

        this.upperX = posX - 16;
        this.upperY = posY - 16;
        
        this.lowerX = posX + 16;
        this.lowerY = posY + 16;

        
    }
}