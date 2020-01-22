export function colorizeRow() {
    var
        r = Math.floor(Math.random() * Math.floor(255)),
        g = Math.floor(Math.random() * Math.floor(255)),
        b = Math.floor(Math.random() * Math.floor(255)),
        a = 0.4;
    return `rgba(${r},${g},${b},${a})`
}

export function rgbcolorizeRow() {
    var
        r = ('0' + (Math.random() * 255 | 0).toString(16)).slice(-2),
        g = ('0' + (Math.random() * 255 | 0).toString(16)).slice(-2),
        b = ('0' + (Math.random() * 255 | 0).toString(16)).slice(-2);
    return '#' + r + g + b;
}