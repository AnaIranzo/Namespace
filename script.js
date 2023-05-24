
//NAMESPACE Objeto global con las propiedades y metodos, se nombra en mayusculas

DIBUJA = {
    //Creamos las propiedades
    canvas:null,
    bandera:false,
    pos:{},
    ctx: null,
    //Creamos las funciones
    inicio: function(){
        if(this.canvas && this.canvas.getContext){
            this.ctx = this.canvas.getContext('2d'); //The HTMLCanvasElement.getContext() method returns a drawing context on the canvas
            if(this.ctx){
                return this.ctx;
                
            }else{
                alert('El navegador no acepta el canvas');
            }

        }else{
            alert('El navegador no acepta el canvas');
        }
    },
    ajusta: function(xx,yy){
        var posCanvas = this.canvas.getBoundingClientRect();//eturns a DOMRect object providing information about the size of an element and its position relative to the viewport.
        var x = xx - posCanvas.left;
        var y = yy - posCanvas.top;//ajustamos las posiciones
        return {x:x, y:y};
    },
    dibuja: function(inicio,fin){
        this.ctx.beginPath();//inicia trazo
        this.ctx.strokeStyle = 'purple';//cambiamos el color del trazo
        this.ctx.lineWidth = 1;//grosor linea
        this.ctx.moveTo(inicio.x, inicio.y);
        this.ctx.lineTo(fin.x, fin.y);//dibuja la linea
        this.ctx.stroke(); //cierra el dibujo
    },

}

window.onload = function(){ //Iniciamos el valor del canvas
    DIBUJA.canvas = document.getElementById('canvas');

    //Eventos
    DIBUJA.canvas.onmousedown = function(e) {
        //nos da las coordenadas de donde pulsa el usuario
        this.pos = DIBUJA.ajusta(e.clientX, e.clientY);
        this.bandera = true;
    };
    DIBUJA.canvas.onmouseup = function(e) {
        this.bandera = false;
    };
    DIBUJA.canvas.onmousemove = function(e) {
        if (this.bandera) {
            var fin = DIBUJA.ajusta(e.clientX, e.clientY);
            DIBUJA.dibuja(this.pos, fin);
            this.pos = fin;//el fin tiene que convertirse en la posición inicial
        }
    };
    //Inicio
    DIBUJA.inicio();
}