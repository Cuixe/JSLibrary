/* 
 * Created on : 9/07/2009, 11:34:41 AM
 * Author     : Alverik
 * Description:
 * Grid Editable y ordenable
 *
 * Clase Button
 * SuperClase: Item
 * Objetivo: Es una clase para poder crear botones html
 * 
 * Propiedades:
 * this.eventEnabled: permite establecer si se activaran o no los eventos
 * 
 * Eventos:
 * this.onclick: funcion a la que sera enviado el evento onclick
 * 
 * Métodos de Clase:
 *    createItem()
 *        Descripcion:
 *            Permite generar un nuevo elemento html con las cofiguraciones establecidas a la clase
 *        Argumentos:
 *        Return:
 *            Elemento HTML
 *    
 *    render(content)
 *        Descripción:
 *            Es un método para "pegar" el elemento HTML dentro de la pagina en el
 *            contenedor especificado 
 *        Argumentos:
 *            content: es el identificador (id) del contenedor donde se mostrará el botón
 *            
 *    clone()
 *        Descripción:
 *            Generá un nuevo objeto de la clase Button donde ambos son completamente independientes entre si
 *        Argumentos:
 *        Return:
 *            Regresa objeto clon de la clase button
 */

function Button(config){
    this.base = Item;
    this.base(config);
    this.typeButton = 'button';
    this.onclick = undefined;
    this.enableEvent = true;
    if( config != undefined){
        if(config['typeButton'])
            this.typeButton = config['typeButton'];
        if(config['onclick'])
            this.onclick = config['onclick'];
    }
}
Button.prototype = new Item;

Button.prototype.render = function(content){
    var contenedor = document.getElementById(content);
    contenedor.appendChild(this.createItem());
}
    
Button.prototype.createItem = function(){
    var button = this.constructor.prototype.createItem.call(this);
    button.setAttribute('type', this.typeButton);
    button.value = this.value;
    if(this.onclick != undefined && this.enableEvent)
        addEvent('click',button,function(){
            arguments[1][0].onclick(arguments[1][0].id,arguments[1][0].value);
        } ,this);
    return button;
}

Button.prototype.clone = function (){
    var newObject = new Button();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}




