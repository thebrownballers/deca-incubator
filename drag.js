var _startX = 0; // mouse starting positions
var _startY = 0;
var _offsetX = 0; // current element offset
var _offsetY = 0;
var _dragElement; // needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };


function InitDragDrop() {
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}

function OnMouseDown(e) {
var target = e.target;

// for IE, left click == 1
// for Firefox, left click == 0
if (e.button == 0 && target.className.contains('drag')) {
    // grab the mouse position
    _startX = e.clientX;
    _startY = e.clientY;

    // grab the clicked element's position
    _offsetX = ExtractNumber(target.style.left);
    _offsetY = ExtractNumber(target.style.top);

    // bring the clicked element to the front while it is being dragged
    _oldZIndex = target.style.zIndex;
    target.style.zIndex = 10000;

    // we need to access the element in OnMouseMove
    _dragElement = target;

    // tell our code to start moving the element with the mouse
    document.onmousemove = OnMouseMove;

    // cancel out any text selections
    document.body.focus();

    return false;
}
}
function ExtractNumber(value)
{
    var n = parseInt(value);

    return n == null || isNaN(n) ? 0 : n;
}

function OnMouseMove(e) {
    if (e == null)
        var e = window.event;

    // this is the actual "drag code"
    _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
    _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';


}

function OnMouseUp(e)
{
    if (_dragElement != null)
    {
        _dragElement.style.zIndex = _oldZIndex;

        // we're done with these events until the next OnMouseDown
        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;
        if (_dragElement.parentElement.id != "bigboybox"){
        var cln = _dragElement.cloneNode(true)
        var key = /[A-z]\D*/.exec(cln.id)
        var newId = key + (parseInt(cln.id.replace(key, "")) + 1)
        console.log(key[0])
        cln.setAttribute("id", newId)
        cln.setAttribute("style","")
        document.getElementById("bigboybox").appendChild(_dragElement)
        document.getElementById(key).appendChild(cln)
      }
        _dragElement = null;


    }
}

InitDragDrop();
