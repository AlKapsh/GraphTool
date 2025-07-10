export class Point{
    constructor (posX, posY) {
        this.posX = posX;
        this.posY = posY;

        this.upperX = posX - 16;
        this.upperY = posY - 16;
        
        this.lowerX = posX + 16;
        this.lowerY = posY + 16;
    }

    posX = 0;
    posY = 0;

    upperX = 0;
    upperY = 0;

    lowerX = 0;
    lowerY = 0;

}