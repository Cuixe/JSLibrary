/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TextArea(config){
    this.base = Item;
    this.base(config);
    this.cols = 20;
    this.maxLength = 200;
    this.rows = 5;
    this.text = '';
    this.label = '';
    
    if( config != undefined){
        if(config['cols'])
            this.cols = config['cols'];
        if(config['rows'])
            this.rows = config['rows'];
         if(config['text'])
            this.text = config['text'];
        if(config['label'])
            this.label = config['label'];
        if(config['maxLength'])
            this.maxLength = config['maxLength'];
    }
}
TextArea.prototype = new Item;

TextArea.prototype.createItem = function(){
    var textArea = this.constructor.prototype.createItem.call(this,'textarea');
    textArea.setAttribute('cols', this.cols);
    textArea.setAttribute('rows', this.rows);
    if(this.text != '')
        textArea.appendChild(document.createTextNode(this.text));
    addEvent(textArea, this.onkeyPress,textArea,this.maxLength);
    
    function addEvent(elemento,fn,element,maxLength){
        if(elemento.attachEvent){
            elemento.attachEvent('onkeypress', function(){
                return validateFieldText(arguments[0],element,maxLength);
            });
        }
        else if(elemento.addEventListener){
            elemento.addEventListener('keypress', function(){
                return validateFieldText(arguments[0],element,maxLength);
            }, true);
        }
    }
    
    function validateFieldText(event,element,maxLength){
        var tecla = (document.all) ? event.keyCode : event.which;
        if (tecla==8 || tecla==0) return true;
        if(element.value.length >= maxLength){
            if(event.preventDefault)event.preventDefault();
            if(event.returnValue)event.returnValue = false;
            return false;
        }
        return true;
    }
    
    return textArea;
}

TextArea.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}

TextArea.prototype.getValue = function(){
     return document.getElementById(this.id).value;
}

TextArea.prototype.setValue = function(value){
     return document.getElementById(this.id).value = value;
}

TextArea.prototype.clean = function(){
    document.getElementById(this.id).value = "";
}

TextArea.prototype.clone = function (){
    var newObject = new TextArea();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}