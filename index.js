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
function webgl_ext(name) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext(name);
    add_entrys(`${name} extensions`, [list(ctx.getSupportedExtensions())]);
}
function webgl_info() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("experimental-webgl") || canvas.getContext("webgl2") || canvas.getContext("webgl");
    let lines = [
        line(`renderer = ${ctx.getParameter(ctx.RENDERER)}`),
        line(`vendor = ${ctx.getParameter(ctx.VENDOR)}`)
    ];
    let dbgRenderInfo = ctx.getExtension("WEBGL_debug_renderer_info");
    if (dbgRenderInfo) {
        lines.push(line(`unmasked renderer = ${ctx.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL)}`));
        lines.push(line(`unmasked vendor = ${ctx.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL)}`));
    }
    add_entrys("renderer info", lines);
}
function test() {
    canvas_ctx(["2d", "webgl", "webgl2", "webgl-experimental"]);
    webgl_ext("webgl");
    webgl_ext("webgl2");
    webgl_info();
}
function init() {
    about();
    test();
}