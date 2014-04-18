var Rectangle = function(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
};

var rectangle = Rectangle.prototype;

rectangle.middle_point = function(){
    var m = (this.p1[0] + this.p2[0])/2;
    var n = (this.p1[1] + this.p2[1])/2;
    return [m,n];
};

module.exports = Rectangle;
