function Crossout(height, color) {
    this.height = height || 2;
    this.color = color || "#000000";
}

Crossout.prototype.getAttributes = function(attrs) {
    attrs = attrs.replace(/[\{\}]/g, '');
    attrs = attrs.split(',');
    if (attrs[0] === "") attrs = [];
    var attributes = {};
    for (var j = 0; j < attrs.length; j++) {
        var key = attrs[j].split(":")[0].trim();
        var val = attrs[j].split(":")[1].trim();
        attributes[key] = val;
    }
    return attributes;
}

Crossout.prototype.addLine = function(el, attributes) {
    var thickness = attributes.thickness || this.height;
    var color = attributes.color || this.color;

    var h = el.offsetHeight;
    var w = el.offsetWidth;
    var rotation = -0.5 * (Math.atan(h / w) * (180/Math.PI));

    var line = document.createElement('span');
    line.style.height = thickness + "px";
    line.style.width = "100%";
    line.style.display = "inline-block";
    line.style.position = "absolute";
    line.style.top = (this.height / 2) + "px";
    line.style.bottom = "0";
    line.style.left = "0";
    line.style.margin = "auto";
    line.style.backgroundColor = color;
    line.style.transform = "rotate(" + rotation + "deg)";
    el.appendChild(line);
}

Crossout.prototype.crossout = function() {
    var els = document.getElementsByTagName('span');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.getAttribute("data-crossedout") !== null) {
            el.style.position = "relative";
            
            var attributes = this.getAttributes(el.getAttribute("data-crossedout"));
            
            this.addLine(el, attributes);
        }
    }
}