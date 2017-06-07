function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    var org = document.getElementById(data)
    var cln = org.cloneNode(true)
    ev.target.appendChild(org);
    var key = /[A-z]\D*/.exec(cln.id)
    var newId = key + (parseInt(cln.id.replace(key, "")) + 1)
    cln.setAttribute("id", newId)
    document.getElementById("addtheboyback").appendChild(cln)
}
