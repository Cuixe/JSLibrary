/* 
 * Clase Item
 * SubClases: Button, Check, Radio, Text
 * Descripcion: Es la clase base para crear elementos html
 *              Se encarga de asignar las propiedades básicas y generales de los elementos
 *               
 * Atributos:
 *    this.id: Representa el identificador asignado al elemento <input id=this.id>
 *    this.name: Representa el nombre asignado al elemento   <input name=this.name>
 *    this.value: Representa el valor del elemento <input value=this.value>
 *    this.desabled: Establece si el control esta o no deshabilitado (por defaul false) <input disabled=this.disabled>
 *    this.config: La configuración es cargada por medio de un Json, este atributo guarda la configuración del objeto
 *    
 * Métodos de Clase:
 *    createItem()
 *        Descripcion:
 *            Permite generar un nuevo elemento html con las cofiguraciones predeterminadas
 *        Argumentos:
 *        Return:
 *            Elemento HTML
 *            
 *
 * Métodos estaticos:
 *    addEvent(evento,elemento,function)
 *        Descripción:
 *            Premite agregar un evento a un elemento HTML, es posible enviar mas argumentos despues
 *            de los obligatorios, estos argumentos son enviados a la funcion como parte de arguments
 *            ejemplo:
 *                  addEvent('click',elementoHtml,function(){
 *                      argumentosExtra = arguments[1];
 *                      argumento1 = argumentosExtra[0];
 *                      argumento2 = argumentosExtra[2];
 *                  },argumento1,argumento2);
 *            
 *        Argumentos:
 *            evento: Evento que se quiere agregar al elemento html ejemplo ('click')
 *            elemento: es el elemento html al que se le queire aplicar el evento
 *            function: funcion a la cual llamará
 *        Return:
 *            
 */

function Item(config){
    /*Atributos*/
    this.id = '' ;
    this.name = '';
    this.value = '';
    this.title = '';
    this.disabled = false;
    this.label = '';
    this.className = '';
    this.toolTipLabel = '';
    this.tabindex = -1;
    this.enableEvent = true;
    this.attachValue = '';
    this.onlyRead = false;
    this.visible = true;
    this.requerid = false;
    this.textErrorRequerid = ''
    this.size = -1;
    
    if(config){
        if(config['id'])
            this.id = config['id'];
        if(config['name'])
            this.name = config['name'];
        if(config['value'])
            this.value = config['value'];
        if(config['title'])
            this.title = config['title'];
        if(config['disabled'])
            this.disabled = config['disabled'];
        if(config['label'])
            this.label = config['label'];
        if(config['className'])
            this.className = config['className'];
        if(config['size'])
            this.size = config['size'];
        if(config['toolTipLabel'])
            this.toolTipLabel = config['toolTipLabel'];
        if(config['requerid'])
            this.requerid = config['requerid'];
        if(config['textErrorRequerid'])
            this.textErrorRequerid = config['textErrorRequerid'];
        if(config['tabindex'])
            this.tabindex = config['tabindex'];
        if(config['enableEvent'] != undefined)
            this.enableEvent = config['enableEvent'];
        if(config['attachValue'] != undefined)
            this.attachValue = config['attachValue'];
        if(config['onlyRead'])
            this.onlyRead = config['onlyRead'];
        if(config['visible'] != undefined)
            this.visible = config['visible'];
    }
}

Item.prototype.createItem = function(){
    var element;
    if(arguments[0] != undefined)
        element = document.createElement(arguments[0]);
    else
        element=document.createElement('input');
    
    element.disabled = this.disabled;
    if(this.id == '')
        this.id = 'element'+random();
    element.setAttribute('id', this.id);
    if(this.name != '')
        element.setAttribute('name', this.name);
    if(this.value != '' && this.value != 'null')
        element.setAttribute('value', this.value);
    if(this.title != '')
        element.setAttribute('title', this.title);
    if(this.size != '')
        element.setAttribute('size', this.size);
    if(this.disabled)
        element.disabled = this.disabled;
    if(this.tabindex != -1)
        element.setAttribute('tabindex', this.tabindex);
    if(this.onlyRead)
        element.setAttribute('onlyRead', this.onlyRead);
    if(!this.visible)
        element.style.visibility = 'hidden';
    if(this.className != '')
        element.className = this.className;
    if(this.toolTipLabel != ''){
        addEvent('mouseover', element, showToolTip,this);
        addEvent('mouseout', element, hiddeToolTip,this);
    }
    return element;
    
    function getTypeItem(item){
        if(item instanceof Button)
            return 'Button';
        if(item instanceof Text)
            return 'Text';
        if(item instanceof Check)
            return 'Check';
        if(item instanceof Radio)
            return 'Radio';
        if(item instanceof DateText)
            return 'DateText';
        if(item instanceof ComboBox)
            return 'ComboBox';
        return '';
    }
    
    function showToolTip(){
        var object = arguments[1][0];
        var element = document.getElementById(object.id);
        var dimension = getDimensionElement(element);
        var div;
        if(document.getElementById('toolTip'+object.id) != undefined)
            div = document.getElementById('toolTip'+object.id);
        else{
            div = document.createElement('div');
            div.setAttribute('id', 'toolTip'+object.id);
        }
        var top = dimension.top+dimension.height+10;
        var left = dimension.left+(dimension.width/2);
        var style = 'position:absolute;top:'+top+';left:'+left+';';
        document.all?div.style.setAttribute('cssText', style):div.setAttribute('style', style);
        div.className = 'ToolTipStyle';
        div.appendChild(document.createTextNode(object.toolTipLabel));
        document.body.appendChild(div);
    }
    
    function hiddeToolTip(){
        var object = arguments[1][0];
        document.body.removeChild(document.getElementById('toolTip'+object.id));
    }
    
    function getDimensionElement(element){
        var x, y, w, h;
        x = y = w = h = 0;
        if (element.getBoundingClientRect) {
            var oRect = element.getBoundingClientRect();
            x = oRect.left-2;
            w = element.clientWidth;
            y = oRect.top-2;
            h = element.clientHeight;
        }else if (document.getBoxObjectFor) { 
            var oBox = document.getBoxObjectFor(element);
            x = oBox.x-1;
            w = oBox.width;
            y = oBox.y-1;
            h = oBox.height;
        }
        return {left: x, top: y, width: w, height: h};
    }
}

Item.prototype.disabledItem = function(){
    var element = document.getElementById(this.id);
    if(arguments[0] != undefined){
        element.disabled = arguments[0];
        this.disabled = arguments[0];
    }
    else{
        element.disabled = !this.disabled;
        this.disabled = !this.disabled;
    }
}

Item.prototype.remove = function(){
    var content = document.getElementById(this.id);
    if(content != null){
        var parent = content.parentNode;
        while(parent.firstChild)
            parent.removeChild(parent.firstChild);
    }
}

Item.prototype.changeVisibility = function(bool){
    var element = document.getElementById(this.id);
    if(element != undefined)
        if(bool)
            element.style.visibility = 'visible';
        else
            element.style.visibility = 'hidden';
    this.visible = bool
}

function addEvent(event,elemento,fn){
    var oldArguments = new Array(arguments.length-3);
    var i =0;
    for(i=3;i<arguments.length;i++){
        oldArguments[i-3]=arguments[i];
    }
    if(elemento.attachEvent){
        elemento.attachEvent('on'+event, function(){
            fn(arguments[0],oldArguments);
        });
    }
    else if(elemento.addEventListener){
        elemento.addEventListener(event,function(){
            fn(arguments[0],oldArguments);
        },false);
    }
}

function random (){
    rango = 1000;
    aleatorio = Math.random()* rango;
    aleatorio = Math.floor(aleatorio);
    return aleatorio;
}

function AjaxItem(){
    var httpRequest;
    var onError;
    var onComplete;
    var onSuccess;
    if (window.XMLHttpRequest)
        httpRequest = new XMLHttpRequest();
    if (window.ActiveXObject)
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    
    var changeState = function(){
        if(httpRequest.readyState == 3){
            if(onComplete != undefined)
                onComplete(httpRequest);
        }
        if(httpRequest.readyState == 4){
            if(httpRequest.status != 200){
                if(onError!= undefined)
                    onError(httpRequest);
            }
            else
                if(onSuccess != undefined)
                    onSuccess(httpRequest);
        }
    }
    
    this.request = function(){
        
    }
}