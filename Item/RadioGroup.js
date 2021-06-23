/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function RadioGroup(config){
    this.base = Group;
    this.base(config);
    this.attachValue = '';
    this.value = '';
    this.onclick = undefined;
    
    if(config != undefined){
        if(config['attachValue'])
            this.attachValue = config['attachValue'];
        if(config['value'])
            this.value = config['value'];
    }
}
RadioGroup.prototype = new Group;

RadioGroup.prototype.createItem = function(){
    var i;
    if(this.attachValue != ''){
        for(i=0;i<this.items.length;i++){
            var item = this.items[i];
            if(item.value == this.value) 
                this.items[i].checked = true;
            else
                this.items[i].checked = false;
        }
    }
    RadioGroup.prototype.onclicGroup = this.onclick;
    this.onclick = function(){
        var radio = arguments[1][0];
        var grupo = arguments[1][1];
        var i;
        for(i=0;i<grupo.items.length;i++){
            if(radio == grupo.items[i])
                radio.checked=true;
            else
                grupo.items[i].checked = false;
        }
        if(grupo.onclicGroup != undefined)
            grupo.onclicGroup(arguments[0],grupo);
    }
    var tableGroup = this.constructor.prototype.createItem.call(this);
    return tableGroup;
}

RadioGroup.prototype.render = function(content){
    var container = document.getElementById(content);
    container.appendChild(this.createItem());
}

RadioGroup.prototype.getValue = function(){
    var i=0;
    for(i=0;i<this.items.length;i++){
        if(this.items[i].checked)
            return this.items[i].value;
    }
    return undefined;
}

RadioGroup.prototype.setValue = function(value){
    var i=0;
    for(i=0;i<this.items.length;i++){
        if(this.items[i].value == value)
            this.items[i].setChecked(true);
    }
}

RadioGroup.prototype.clean = function(){
    var i=0;
    for(i=0;i<this.items.length;i++){
        this.items[i].setChecked(false);
    }
}

RadioGroup.prototype.clone = function(){
    var newObject = new RadioGroup();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        if(keys[i] == 'items'){var j;
            for(j = 0;j < this.items.length;j++){
                newObject.items[j] = this.items[j].clone();
            }
        }else
            newObject[keys[i]] = this[keys[i]];
    return newObject;
}
