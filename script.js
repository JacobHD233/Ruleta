function iniciarSesion(event) {
    const credencialesValidas = [
        { usuario: "maquina de fuego", contrasena: "contraseña" },
        { usuario: "golosa 69", contrasena: "contraseña" },
        // Agrega más credenciales según sea necesario
    ];
    
    event.preventDefault(); // Evitar el envío automático del formulario

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Validación de usuario y contraseña
    const credencialValida = credencialesValidas.find(
        (credencial) => credencial.usuario === usuario && credencial.contrasena === contrasena
    );

    if (credencialValida) {
        console.log("Inicio de sesión exitoso");
        document.getElementById("menu").style.display = "none";
        document.getElementById("ruleta").style.display = "block";
    } else {
        console.log("Error: Credenciales inválidas");
        alert("Credenciales incorrectas. Por favor, ingresa credenciales válidas.");
    }
    
    return false;
}



// Lista de imágenes para la ruleta
const opciones = [
    "opcion_(1).jpeg", "opcion_(2).jpeg", "opcion_(3).jpeg", "opcion_(4).jpeg", "opcion_(5).jpeg",
    "opcion_(6).jpeg", "opcion_(7).jpeg", "opcion_(8).jpeg", "opcion_(9).jpeg", "opcion_(10).jpeg",
    "opcion_(11).jpeg", "opcion_(12).jpeg", "opcion_(13).jpeg", "opcion_(14).jpeg", "opcion_(15).jpeg",
    "opcion_(16).jpeg", "opcion_(17).jpeg", "opcion_(18).jpeg", "opcion_(19).jpeg", "opcion_(20).jpeg",
    "opcion_(21).jpeg", "opcion_(22).jpeg", "opcion_(23).jpeg", "opcion_(24).jpeg", "opcion_(25).jpeg",
    "opcion_(26).jpeg", "opcion_(27).jpeg", "opcion_(28).jpeg", "opcion_(29).jpeg", "opcion_(30).jpeg",
    "opcion_(31).jpeg", "opcion_(32).jpeg", "opcion_(33).jpeg", "opcion_(34).jpeg", "opcion_(35).jpeg",
    "opcion_(36).jpeg", "opcion_(37).jpeg", "opcion_(38).jpeg", "opcion_(39).jpeg", "opcion_(40).jpeg",
    "opcion_(41).jpeg", "opcion_(42).jpeg", "opcion_(43).jpeg", "opcion_(44).jpeg", "opcion_(45).jpeg",
    "opcion_(46).jpeg", "opcion_(47).jpeg", "opcion_(48).jpeg", "opcion_(49).jpeg", "opcion_(50).jpg",
    "opcion_(51).jpg", "opcion_(52).jpg", "comodin(1).jpeg", "comodin(2).jpeg", "comodin(3).jpeg", "chupeton.jpg", "chupeton1.jpg", "chupeton2.jpg", "chupeton3.jpg"
];

let opcionesRestantes = [...opciones]; // Copia de las opciones para no modificar la original

function iniciarJuego() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("ruleta").style.display = "block";
}

function girarRuleta() {
    const resultadoContainer = document.getElementById("resultado");

    if (opcionesRestantes.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * opcionesRestantes.length);
        const opcionSeleccionada = opcionesRestantes.splice(indiceAleatorio, 1)[0];

        const imagenElement = document.createElement("img");
        imagenElement.src = opcionSeleccionada;
        resultadoContainer.innerHTML = "";
        resultadoContainer.appendChild(imagenElement);
    } else {
        resultadoContainer.innerHTML = "Se han agotado todas las opciones. ¡Juego terminado!";
    }
}

function regresarMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("ruleta").style.display = "none";
    opcionesRestantes = [...opciones]; // Reiniciar las opciones para el próximo juego
}


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

onload = function (){
setTimeout(init,0)
}

init = function(){
canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')

onresize = function(){
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
}
onresize()

mouse = {x:canvas.width/2,y:canvas.height/2,out:false}

canvas.onmouseout = function(){
    mouse.out = true
}

canvas.onmousemove = function(e){
    var rect = canvas.getBoundingClientRect()
    mouse = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    out: false
    }
}

gravityStrength = 10
particles = []
spawnTimer = 0
spawnInterval = 10
type = 0
requestAnimationFrame(startLoop)
}

newParticle = function(){
type = type?0:1
particles.push({
    x:mouse.x,
    y:mouse.y,
    xv:type?18*Math.random()-9:24*Math.random()-12,
    yv:type?18*Math.random()-9:24*Math.random()-12,
    c:type?'rgb(255,'+((200*Math.random())|0)+','+((80*Math.random())|0)+')':'rgb(255,255,255)',
    s:type?5+10*Math.random():1,
    a:1
})
}

startLoop = function(newTime){
time = newTime
requestAnimationFrame(loop)
}

loop = function(newTime){
draw()
calculate(newTime)
requestAnimationFrame(loop)
}

draw = function(){
ctx.clearRect(0,0,canvas.width,canvas.height)
for(var i=0;i<particles.length;i++){
    var p = particles[i]
    ctx.globalAlpha = p.a
    ctx.fillStyle = p.c
    ctx.beginPath()
    ctx.arc(p.x,p.y,p.s,0,2*Math.PI)
    ctx.fill()
}
}

calculate = function(newTime){
var dt = newTime-time
time = newTime

if(!mouse.out){
    spawnTimer += (dt<100)?dt:100
    for(;spawnTimer>0;spawnTimer-=spawnInterval){
    newParticle()
    }
}

particleOverflow = particles.length-700
if(particleOverflow>0){
    particles.splice(0,particleOverflow)
}

for(var i=0;i<particles.length;i++){
    var p = particles[i]
    if(!mouse.out){
    x = mouse.x-p.x
    y = mouse.y-p.y
    a = x*x+y*y
    a = a>100?gravityStrength/a:gravityStrength/100
    p.xv = (p.xv+a*x)*0.99
    p.yv = (p.yv+a*y)*0.99
    }
    p.x += p.xv
    p.y += p.yv
    p.a *= 0.99
}
}
