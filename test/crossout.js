/** Crossout
 * Diagonally cross out text using data attribute
 * @param args  Argument bucket for settings
 * ----------------------------------------------
 * Possible settings (default)
 * thickness (2)
 * color (#000000)
 * rounded (false)
 * extension (0)
 */
function Crossout(args) {
    if (!args) args = {};
    this.thickness = args.thickness || 2;
    this.color = args.color || "#000000";
    this.rounded = args.rounded || false;
    this.extension = args.extension || 0;
}

/** Crossout::getAttributes
 * Get individual settings from data attributes
 * @param attrs Raw data-crossedout attribute value
 * @return      Object containing settings from data attribute    
 */
Crossout.prototype.getAttributes = function(attrs) {
    // Remove curly braces and split into attributes
    attrs = attrs.replace(/[\{\}]/g, '');
    attrs = attrs.split(',');
    
    // If no attributes found, set as blank array
    if (attrs[0] === "") attrs = [];
    
    // Create attributes object
    var attributes = {};
    
    // Iterate through array of settings
    for (var j = 0; j < attrs.length; j++) {
        
        // Split & remove whitespace from settings, add to object
        var key = attrs[j].split(":")[0].trim();
        var val = attrs[j].split(":")[1].trim();
        attributes[key] = val;
    
    }
    
    return attributes;
}

/** Crossout::addLine
 * Create element for line, set settings and add to text
 * @param el            Element to add to the line to
 * @param attributes    Individual settings from element
 */
Crossout.prototype.addLine = function(el, attributes) {
    
    // Set settings from individual settings/global settings/defaults
    var thickness = attributes.thickness || this.thickness;
    var color = attributes.color || this.color;
    var rounded = (attributes.rounded == 'true') || this.rounded;
    var extension = parseInt(attributes.extension) || this.extension;

    // Calculate rotation for line to match text width
    var h = el.offsetHeight;
    var w = el.offsetWidth;
    var rotation = -0.5 * (Math.atan(h / w) * (180/Math.PI));

    // Create and style line
    var line = document.createElement('span');
    line.style.height = thickness + "px";
    line.style.width = "calc(100% + "  + extension + "px)";
    line.style.display = "inline-block";
    line.style.position = "absolute";
    line.style.top = (thickness / 2) + "px";
    line.style.bottom = "0";
    line.style.left = -1 * (extension / 2) + "px";
    line.style.margin = "auto";
    line.style.backgroundColor = color;
    line.style.transform = "rotate(" + rotation + "deg)";
    
    if (rounded) line.style.borderRadius = (thickness / 2) + "px";
    
    // Add line to element
    el.appendChild(line);
}

/** Crossout::crossout
 * Perform crossing out of all spans with data attribute
 */
Crossout.prototype.crossout = function() {
    
    // Get all spans
    var els = document.getElementsByTagName('span');
    
    // Iterate through all spans
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        
        // Add line if span has data attribute
        if (el.getAttribute("data-crossedout") !== null) {
            
            // Make sure span is relative for line to work
            el.style.position = "relative";

            // Get attributes from element
            var attributes = this.getAttributes(el.getAttribute("data-crossedout"));

            // Add the line to the element
            this.addLine(el, attributes);
        }
    }
}