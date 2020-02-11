let items = document.getElementById("items");
for (let node of items.childNodes) {
    node.addEventListener("keydown", log);
    node.addEventListener("input", log);
    node.addEventListener("keypress", log);
}
function log(e) {
    console.log(e);
}
function connect() {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://127.0.0.1:2794', "rust-websocket");

    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
}
function line(text) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(text));
    return p;
}
function list(list) {
    let ul = document.createElement("ul");
    list.forEach(element => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(element));
        ul.appendChild(li);
    });
    return ul;
}
function add_entrys(name, elems) {
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(name));
    document.body.appendChild(h3);
    elems.forEach(e => document.body.appendChild(e));
}
function about() {
    add_entrys("about", [
        line(`navigator.appVersion = ${navigator.appVersion}`),
        line(`navigator.vendor = ${navigator.vendor}`)
    ]);
}
function canvas_ctx(names) {
    add_entrys("canvas context",
        names.map(function(name) {
            let canvas = document.createElement("canvas");
            return line(`${name}: ${canvas.getContext(name)}`);
        })
    );
}
function canvas_ext(name) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("webgl2");
    add_entrys("webgl extensions", [list(ctx.getSupportedExtensions())]);
}
function test() {
    canvas_ctx(["2d", "webgl", "webgl2", "webgl-experimental"]);
    canvas_ext("webgl2");
}
function init() {
    about();
    test();
}