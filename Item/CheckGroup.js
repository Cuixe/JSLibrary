/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CheckGroup(config){
    this.base = Group;
    this.base(config);
    this.attachValues = [];
    this.valuesCheck = [];
    this.valuesUncheck = [];
    
    if(config){
        if(config['attachValues'])
            this.attachValues = config['attachValues'];
        if(config['valuesCheck'])
            this.valuesCheck = config['valuesCheck'];
        if(config['valuesUncheck'])
            this.valuesUncheck = config['valuesUncheck'];
    }
}
CheckGroup.prototype = new Group;

CheckGroup.prototype.createItem = function(){
    var i;
    if(this.items.length > 0){
        for(i=0;i<this.items.length;i++){
            this.items[i].valueCheck = this.valuesCheck[i];
            this.items[i].valueUncheck = this.valuesUncheck[i];
        }
    }
    var tableGroup = this.constructor.prototype.createItem.call(this);
    return tableGroup;
}

CheckGroup.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}

CheckGroup.prototype.clone = function(){
    var newObject = new CheckGroup();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i < keys.length;i++)
        if(keys[i] == 'items'){var j;
            for(j = 0;j < this.items.length;j++){
                newObject.items[j] = this.items[j].clone();
            }
        }else
            newObject[keys[i]] = this[keys[i]];
    return newObject;
}
    
CheckGroup.prototype.getValue = function(){
    
}
