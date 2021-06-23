/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Check(config){
    this.base = Item;
    this.base(config);
    this.label = '';
    this.positionLabel = 'right'; // right -->derecha o left --> izquierda
    this.checked = false;
    this.valueCheck = true;
    this.valueUncheck = false;
    this.onclick = undefined;
    
    if(config!=undefined){
        if(config['onclick'])
            this.onclick = config['onclick'];
        if(config['label'])
            this.label = config['label'];
        if(config['checked'])
            this.checked = config['checked'];
        if(config['valueCheck'])
            this.valueCheck = config['valueCheck'];
        if(config['valueUncheck'] != undefined)
            this.valueUncheck = config['valueUncheck'];
        if(config['positionLabel'])
            this.positionLabel = config['positionLabel'];
    }
}
Check.prototype = new Item;

Check.prototype.createItem = function(){
    var checkDiv = document.createElement('div');
    var check = this.constructor.prototype.createItem.call(this);
    check.setAttribute('type', 'checkbox');
    addEvent('click',check,function(){
        var check = arguments[1][0];
        check.checked = (check.checked?false:true);
            if(check.onclick != undefined)
                check.onclick(check.value,(check.checked?check.valueCheck:check.valueUncheck));
    },this);
    if(this.cheked)
        check.setAttribute('checked', this.cheked);
    if(this.label != ''){
        if(this.positionLabel == 'right'){
            checkDiv.appendChild(check);
            checkDiv.appendChild(document.createTextNode(this.label));
        }else if(this.positionLabel == 'left'){
            checkDiv.appendChild(document.createTextNode(this.label));
            checkDiv.appendChild(check);
        }
    }else
        checkDiv.appendChild(check);
    return checkDiv;
}

Check.prototype.render = function(content){
    var container = document.getElementById(content);
    container.appendChild(this.createItem());
}

Check.prototype.setChecked = function(check){
    document.getElementById(this.id).checked = check;
    this.checked = check
}

Check.prototype.clean = function(){
    this.setChecked(false);
}

Check.prototype.clone = function(){
    var newObject = new Check();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}
    
