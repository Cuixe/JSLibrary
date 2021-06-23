/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function ComboBox(config){
    this.base = Item;
    this.base(config);
    this.dataSet = undefined;
    this.id='';
    this.onchange = undefined;
    this.emptyValue = '-1';
    this.displayEmptyValue = 'Seleccionar...';
    this.defaultValue = '';
    this.config = undefined;
    this.label = '';
    this.autoLoad = true;
    this.automaticOnchange = false;
    
    if(config != undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
        if(config['onchange'])
            this.onchange = config['onchange'];
        if(config['emptyValue'])
            this.emptyValue = config['emptyValue'];
        if(config['displayEmptyValue'])
            this.displayEmptyValue = config['displayEmptyValue'];
        if(config['defaultValue'])
            this.defaultValue = config['defaultValue'];
         if(config['label'])
            this.label = config['label'];
        if(config['autoLoad'] != undefined)
            this.autoLoad = config['autoLoad'];
        if(config['automaticOnchange'] != undefined)
            this.automaticOnchange = config['automaticOnchange'];
    }
}

ComboBox.prototype = new Item;

ComboBox.prototype.render = function(content){
    var contenedor = document.getElementById(content);
    contenedor.appendChild(this.createItem());
}

ComboBox.prototype.createItem = function(){
    var combo = this.constructor.prototype.createItem.call(this,'select');
    if(this.id == '')
        this.id = 'combo'+ random();
    combo.setAttribute('id', this.id);
    if(this.emptyValue != '' || this.emptyValue == '-1'){
        var emptyOption = document.createElement('option');
        emptyOption.setAttribute('value', this.emptyValue);
        emptyOption.appendChild(document.createTextNode(this.displayEmptyValue));
        combo.appendChild(emptyOption);
    }
    
    if(this.autoLoad){
        if(this.dataSet != undefined){
            var display = this.dataSet.displayValues;
            var datos = '';
            if(this.dataSet.data != undefined)
                datos = this.dataSet.data[this.dataSet.root];
            else if(this.dataSet.url != ''){
                this.dataSet.requestUrl();
                datos = this.dataSet.getDataRoot();
            }
            for(i=0;i<datos.length;i++){
                var opcion = document.createElement('option');
                if(datos[i] != undefined){
                    opcion.setAttribute('value', datos[i][this.dataSet.id]);
                    opcion.appendChild(document.createTextNode(datos[i][display[0]]));
                    combo.appendChild(opcion);
                }
            }
            if (this.defaultValue != '')
                combo.value = this.defaultValue;
            else if(this.value != ''){
                for(var i = 0; i < combo.length; i++){
                    if(combo.options[i].value == this.value){
                        combo.options[i].selected = true;
                    }
                }
            }
        }
    }
    addEvent('change',combo, function(){
        var object = arguments[1][0];
        var element = arguments[1][1];
        if(object.onchange != undefined)
            object.onchange(element);
    },this,combo);
    
    return combo;
}

ComboBox.prototype.load = function(){
    this.autoLoad = true;
    this.dataSet.data = undefined;
    var parentNode = document.getElementById(this.id).parentNode;
    while(parentNode.firstChild)
        parentNode.removeChild(parentNode.firstChild);
    parentNode.appendChild(this.createItem());
}

ComboBox.prototype.getValue = function(){
    var select = document.getElementById(this.id);
    return select.options[select.selectedIndex].value;
}

ComboBox.prototype.setValue = function(value){
    this.selectedValue(value);
}

ComboBox.prototype.getText = function(){
    var select = document.getElementById(this.id);
    return select.options[select.selectedIndex].text;
}

ComboBox.prototype.clean = function(){
    this.selectedIndex(0);
}

ComboBox.prototype.selectedIndex = function(index){
    var select = document.getElementById(this.id);
    if(index != undefined){
        select.options[index].selected = true;
        this.value = select.value;
        if(this.automaticOnchange && this.onchange)
            this.onchange(document.getElementById(this.id));
        return index
    }else
        return select.selectedIndex;
}

ComboBox.prototype.selectedText = function(text){
    var select = document.getElementById(this.id);
    if(text != undefined){
        for(var i = 0; i < select.length; i++){
            if(select.options[i].text == text){
                select.options[i].selected = true;
            }
        }
        if(this.automaticOnchange && this.onchange)
            this.onchange(document.getElementById(this.id));
        return text;
    }else
        return select.options[select.selectedIndex].text;
}

ComboBox.prototype.selectedValue = function(value){
    var select = document.getElementById(this.id);
    for(var i=0;i<select.options.length;i++){
        if(select.options[i].value == value)
            select.options[i].selected = true;
    }
    if(this.automaticOnchange && this.onchange)
            this.onchange(document.getElementById(this.id));
}

ComboBox.prototype.clone = function(){
    var newObject = new ComboBox();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}
