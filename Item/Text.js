/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Text(config){
    this.base = Item;
    this.base(config);
    this.password = false;
    this.maxLength = 200;
    this.onlyNumbers = false;
    this.onlyLetters = false;
    this.onkeyPress = undefined;
    this.regExp = '';
    this.textErrorRegExp = '';
    
    if(config!=undefined){
        if(config['password'])
            this.password = config['password'];
        if(config['maxLength'])
            this.maxLength = config['maxLength'];
        if(config['onlyNumbers'])
            this.onlyNumbers = config['onlyNumbers'];
        if(config['onlyLetter'])
            this.onkeyPress = config['onlyLetter'];
        if(config['onlyLetter'])
            this.onlyLetter = config['onlyLetter'];
        if(config['regExp'])
            this.regExp = config['regExp'];
        if(config['onkeyPress'])
            this.onkeyPress = config['onkeyPress'];
            if(config['textErrorRegExp'])
            this.textErrorRegExp = config['textErrorRegExp'];
    }
}
Text.prototype = new Item;

Text.prototype.createItem = function(){
    var element = this.constructor.prototype.createItem.call(this);
    var expresion = undefined;
    if(this.password)
        element.setAttribute('type', 'password');
    else
        element.setAttribute('type', 'text');
    if(this.onlyNumbers)
        expresion =/[0-9]/;
    if(this.onlyLetter)
        expresion = /[A-Za-zñÑ\s]/;
    //if(this.regExp!='')
    //    expresion = new RegExp(this.regExp);
    addEvent(element, this.onkeyPress,expresion,element,this.maxLength);
        
    return element;
    
    function addEvent(elemento,fn,expresion,element,maxLength){
        if(elemento.attachEvent){
            elemento.attachEvent('onkeypress', function(){
                return validateFieldText(arguments[0],expresion,element,maxLength);
            });
        }
        else if(elemento.addEventListener){
            elemento.addEventListener('keypress', function(){
                return validateFieldText(arguments[0],expresion,element,maxLength);
            }, true);
            //elemento.setAttribute('onkeypress', 'return  validateFieldText(event,'+expresion+',\''+element+'\','+maxLength+')');
        }
    }
}

Text.prototype.render=function(content){
    document.getElementById(content).appendChild(this.createItem());
}

Text.prototype.getValue = function(){
    return document.getElementById(this.id).value;
}

Text.prototype.setValue = function(value){
    return document.getElementById(this.id).value = value;
}

Text.prototype.clean = function(){
    document.getElementById(this.id).value = "";
}

function validateFieldText(event,expresion,element,maxLength){
    var tecla = (document.all) ? event.keyCode : event.which;
    if (tecla==8 || tecla==0) return true;
    if(element.value.length >= maxLength){
        if(event.preventDefault)event.preventDefault();
        if(event.returnValue)event.returnValue = false;
        return false;
    }
    if(expresion != undefined){
        te = String.fromCharCode(tecla);
        var validacion = expresion.test(te);
        if(!validacion){
            if(event.preventDefault)event.preventDefault();
            if(event.returnValue)event.returnValue=validacion;
        }
        return validacion;
    }
    return true;
}


    

