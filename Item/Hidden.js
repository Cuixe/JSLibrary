/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Hidden(config){
    this.base = Item;
    this.base(config);
}
Hidden.prototype = new Item;

Hidden.prototype.createItem = function(){
    var hidden = this.constructor.prototype.createItem.call(this);
    hidden.setAttribute('type', 'hidden');
    return hidden;
}

Hidden.prototype.getValue = function(){
    return document.getElementById(this.id).value;
}

Hidden.prototype.setValue = function(value){
    return document.getElementById(this.id).value = value;
}

Hidden.prototype.clone = function (){
    var newObject = new Hidden();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}