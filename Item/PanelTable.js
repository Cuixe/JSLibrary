/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function PanelTable(config){
    this.id = '';
    this.title = '';
    this.elements = [];
    this.dataSet = undefined;
    this.data = undefined;
    this.objects = [];
    this.autoLoad = true;
    this.visible = true;
    this.disabledAll = false;
    
    if(config != undefined){
         if(config['id'])
            this.id = config['id'];
        if(config['title'])
            this.title = config['title'];
        if(config['elements'])
            this.elements = config['elements'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
        if(config['data'])
            this.data = config['data'];
        if(config['autoLoad'] != undefined)
            this.autoLoad = config['autoLoad'];
        if(config['visible'] != undefined)
            this.visible = config['visible'];
        if(config['disabledAll'] != undefined)
            this.disabledAll = config['disabledAll'];
    }
}

PanelTable.prototype.createItem= function(){
    if(this.elements.length == 0)
        return undefined;
    if(this.id == '')
        this.id = random()+'Panel';
    var datos;
    var panel = document.createElement('div');
    panel.setAttribute('id', this.id+'Div');
    if(this.dataSet != undefined)
        datos = dataSet.getDataRoot();
    else if(this.data != undefined)
        datos = this.data;

    var table = document.createElement('table');
    table.className = 'Panel';
    panel.appendChild(table);
    table.setAttribute('id', this.id+'Table');
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    if(this.title != ''){
        var caption = document.createElement('caption');
        caption.className = 'PanelTitle';
        caption.appendChild(document.createTextNode(this.title));
        table.appendChild(caption);
    }
    
    for(var i in this.elements){
        var tr = document.createElement('tr');
        var rowElement = this.elements[i].row;
        tbody.appendChild(tr);
        for(var p in rowElement){
            var element = rowElement[p]; 
            var td = document.createElement('td');
            if(element['colspan'])
                td.setAttribute('colSpan', element['colspan']);
            if(element['rowspan'])
                td.setAttribute('rowSpan', element['rowspan']);
             if(element['item']=='Label'){
                td.appendChild(document.createTextNode(element['value']));
                tr.appendChild(td);}
            else if(element['item'] != undefined){
                var config = JSON.stringify(element['config']);
                var object = undefined;
                if(typeof element['item'] == 'string')
                    object = eval('new '+element['item'] + '('+ config +')');
                else if(typeof element['item'] == 'object')
                    object = element['item'];
                if(this.autoLoad){
                    if(datos != undefined){
                        if(object.id != '' && datos[object.id] != undefined)
                            object.value = datos[object.id];
                        if(object.attachValue != '' && datos[object.attachValue] != undefined)
                            object.value = datos[object.attachValue];
                    }
                }
                if(element['config'] != undefined){
                    if(element['config'].onclick != undefined)
                        object.onclick = element['config'].onclick;
                     if(element['config'].onchange != undefined)
                        object.onchange = element['config'].onchange;
                }
                if((object.label != '' && object.label != undefined)){
                    var tdLabel = document.createElement('td');
                    tr.appendChild(tdLabel);
                    tdLabel.appendChild(document.createTextNode(object.label));
                }
                
                this.objects.push(object);
                tr.appendChild(td);
                if(object instanceof PanelTable){
                    if(this.disabledAll)
                        object.disabledAll = true;
                }else{
                    if(this.disabledAll)
                        object.disabled = true;
                }
                td.appendChild(object.createItem());
            }else
                tr.appendChild(document.createElement('td'));
        }
    }
    //if(!this.visible)
    //    panel.style.display='none';
    return panel;
}

PanelTable.prototype.render = function(content){
    var contenedor = document.getElementById(content);
    while(contenedor.firstChild)
        contenedor.removeChild(contenedor.firstChild);
    var element = this.createItem();
    if (element != undefined)
        contenedor.appendChild(element);
}

PanelTable.prototype.addRowElemets = function(arrayObjects,index,colspan){
    if(index == undefined)
        index = this.elements.length
    var elements = this.elements.slice(0,index);
    elements.push({row:new Array()});
    for(var i=index;i<this.elements.length;i++)
        elements[i+1]=this.elements[i];
    this.elements=elements;
    if(arrayObjects.length == undefined)
        this.elements[index].row.push({item:arrayObjects});
    else{
        for(i=0; i <arrayObjects.length ; i++)
          this.elements[index].row.push({item:arrayObjects[i]});
    }
    
    var table = document.getElementById(this.id+'Table');
    if(table != undefined){
        
        var row = document.getElementById(this.id+'Table').insertRow(index);
        
        if(arrayObjects.length == undefined){
            if(arrayObjects.label != '' && arrayObjects.label != undefined){
                row.insertCell(0).appendChild(document.createTextNode(arrayObjects.label));
                row.insertCell(1).appendChild(arrayObjects.createItem());
            }else{
                var cell = row.insertCell(0);
                if(colspan != undefined)
                    cell.colSpan = colspan;
                cell.appendChild(arrayObjects.createItem());
            }
            this.objects.push(arrayObjects);
        }
        else{
            var rowPrint = 0;
            for(i=0; i <arrayObjects.length ; i++){
                var object = arrayObjects[i];
                if(object.label != undefined && object.label != ''){
                    row.insertCell(i+rowPrint).appendChild(document.createTextNode(object.label));
                    rowPrint++;
                    row.insertCell(i+rowPrint).appendChild(object.createItem());
                }else
                    row.insertCell(i+rowPrint).appendChild(object.createItem());
                this.objects.push(object);
           }
        }
    }else{
        var content = document.getElementById('elementosDiv');
        if(content != null){
            content.appendChild(this.createItem());
        }
    }
        
}

PanelTable.prototype.removeRow = function(init,elements){
    if(elements == undefined)
        elements = 1;
    
    this.elements.splice(init,elements);
    this.objects.splice(this.objects.length-elements,elements);
    var table = document.getElementById(this.id+'Table');
    if(table != undefined)
        for(var i = init;i<elements+init;i++)
            table.deleteRow(init);
}

PanelTable.prototype.remove = function(){
    var content = document.getElementById(this.id+'Div');
    if(content != null){
        var parent = content.parentNode;
        while(parent.firstChild)
            parent.removeChild(parent.firstChild);
    }
}

PanelTable.prototype.clean = function(){
    if(this.objects.length > 0){
        for(var p in this.objects){
            if(this.objects[p].clean)
                this.objects[p].clean()
        }
    }
}

PanelTable.prototype.changeVisibility = function(bool){
    var panel = document.getElementById(this.id);
    if(panel == undefined)
        return null;
    if(!bool)
        panel.style.display='none';
    else
        panel.style.display='';
    this.visible=bool;
    return true;
}

PanelTable.prototype.hidden = function(visibility){
    var content = document.getElementById(this.id);
    content.style.visibility = visibility;
}

PanelTable.prototype.loadData = function(data){
    for(var p in this.objects){
        var attach;
        if(this.objects[p].attachValue)
            attach = this.objects[p].attachValue;
        else
            attach = this.objects[p].id;
        var split = attach.split('.');
        if(this.objects[p] instanceof PanelTable){
            this.objects[p].loadData(data);
        }
        if(this.objects[p].setValue){
            var array = data[split[0]];
            if(array == null)
                array = '';
            else
                for(var i=1;i<split.length;i++){
                    if(array[split[i]] != null)
                        array = array[split[i]];
                    else
                        array = '';
                }
            if(array != undefined)
                this.objects[p].setValue(array);
        }
    }
}

PanelTable.prototype.clone = function(){
    var newObject = new PanelTable();
    var keys = [];
    for (var property in this)
        keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}



PanelTable.prototype.validateRequeridElements = function(){
    for(var p in this.objects){
        if(!this.validateRequeridElement(this.objects[p]))
            return false;
    }
    return true;
}

PanelTable.prototype.validateEmptyElement = function(object){
    if(object instanceof PanelTable){
        if(object.validateRequeridElements())
            return true;
        else
            return false;
    }
    else if(object instanceof ComboBox){
        if(object.getValue() == object.emptyValue)
            return false;
    }else if(object.getValue() == '' || object.getValue() == undefined)
         return false;
    return true;
}

PanelTable.prototype.validateRequeridElement = function(object){
    if(object.requerid){
        if(!this.validateEmptyElement(object)){
            alert(object.textErrorRequerid);
            return false;
        }
    }
    return true;
}

PanelTable.prototype.getParameters = function(){
    var parameters='';
    for(var p in this.objects){
        if(this.objects[p].id != '' && this.objects[p].getValue)
            parameters += this.objects[p].id + '=' + this.objects[p].getValue()+'&';
    }
    return parameters;
}