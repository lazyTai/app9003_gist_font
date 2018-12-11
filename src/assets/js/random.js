export function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

export var getRandomColor = function () {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
}
var colors = [
    "#8B0000",
    "#FF00FF",
    "#800080",
    "#CD5C5C",
    "#DAA520",
    "#006400",
    "#00008B",
    "#696969",
]


export var getRandomColor2 = function () {
    return colors[getRandomNumber(0, 7)]
}