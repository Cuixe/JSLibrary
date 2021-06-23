/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Radio(config){
    this.base = Item;
    this.base(config);
    this.onclick = undefined;
    this.label = '';
    this.positionLabel = 'right'; // right -->derecha o left --> izquierda
    this.checked = false;
    
    if(config!=undefined){
        if(config['onclick'])
            this.onclick = config['onclick'];
        if(config['label'])
            this.label = config['label'];
        if(config['checked'])
            this.checked = config['checked'];
        if(config['positionLabel'])
            this.positionLabel = config['positionLabel'];
    }
}
Radio.prototype = new Item;

Radio.prototype.createItem = function(){
    var radioDiv = document.createElement('div');
    var radio = this.constructor.prototype.createItem.call(this);
    radio.setAttribute('type', 'radio');
    if(this.checked)
        radio.setAttribute((document.all?'defaultChecked':'checked'), this.checked);
    if(this.onclick != undefined)
        addEvent('click', radio,function(){
            arguments[1][0].onclick(arguments[1][0].id,arguments[1][0].value);
        },this);
    if(this.label != ''){
        if(this.positionLabel == 'right'){
            radioDiv.appendChild(radio);
            radioDiv.appendChild(document.createTextNode(this.label));
        }else if(this.positionLabel == 'left'){
            radioDiv.appendChild(document.createTextNode(this.label));
            radioDiv.appendChild(radio);
        }
    }else
        radioDiv.appendChild(radio);
    
    return radioDiv;
}

Radio.prototype.render = function(content){
    var container = document.getElementById(content);
    container.appendChild(this.createItem());
}

Radio.prototype.setChecked = function(check){
    document.getElementById(this.id).checked = check;
    this.checked = check;
}

Radio.prototype.clean = function (){
    this.setChecked(false);
}

Radio.prototype.clone = function(){
    var newObject = new Radio();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}
    
