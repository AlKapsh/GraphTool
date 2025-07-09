/**
 * Checks if position of new point overlaps with existing points
 * @returns  {boolean} ture if overlaps \ false either
 */
export function overlapCheck(x, y, allPoints){
    var finds = allPoints.find(item => 
        x >= item.upperX && 
        x <= item.lowerX && 
        y >= item.upperY && 
        y <= item.lowerY
        );
    
    return !!finds;
}