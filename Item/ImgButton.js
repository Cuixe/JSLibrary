/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ImgButton(config){
    this.base = Item;
    this.base(config);
    this.urlImagen = '';
    this.onclick = undefined;
    if( config != undefined){
        if(config['urlImagen'])
            this.urlImagen = config['urlImagen'];
        if(config['onclick'])
            this.onclick = config['onclick'];
    }
}
ImgButton.prototype = new Item;
    
ImgButton.prototype.createItem = function(){
    var imgButton = this.constructor.prototype.createItem.call(this,'div');
    if(this.onclick != undefined && this.eventEnabled)
        addEvent('click',imgButton,function(){
            arguments[1][0].onclick(arguments[1][0].id,arguments[1][0].value);
        } ,this);
        imgButton.className = 'ImgButtonUp'+ (this.className !=''? ' , '+this.className:'');
        addEvent('mouseout', imgButton, onmouseup,imgButton,this);
        addEvent('mousedown', imgButton, onmousepress,imgButton,this);
        addEvent('mouseup', imgButton, onmouseup,imgButton,this);
    return imgButton;
    
    function onmousepress(){
        var element = arguments[1][0];
        var object = arguments[1][1];
        element.className = 'ImgButtonPress'+ (object.className !=''? ' , '+object.className:'');
    }
    
    function onmouseup(){
        var element = arguments[1][0];
        var object = arguments[1][1];
        element.className = 'ImgButtonUp'+ (object.className !=''? ' , '+object.className:'');
    }
}

ImgButton.prototype.render = function (content){
    document.getElementById(content).appendChild(this.createItem());
}
    
ImgButton.prototype.clone = function (){
    var newObject = new Button();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}
