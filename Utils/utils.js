/**
 * Checks if position of new point overlaps with existing points
 * @returns  {boolean} ture if overlaps \ false either
 */
export function overlapCheck(x, y, allPoints){
    var finds = allPoints.find(item => 
        x >= item.upperX - 16 && 
        x <= item.lowerX + 16 && 
        y >= item.upperY - 16 && 
        y <= item.lowerY + 16
        );
    
    return !!finds;
}