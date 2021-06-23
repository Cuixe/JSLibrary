/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function RowGrid(config){
    this.id = '';
    this.values = undefined;
    this.editableCell = [];
    this.display = [];
    this.cells = [];
    this.rowItems = [];
    
     if(config!=undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['values'])
            this.values = config['values'];
        if(config['editableCell'])
            this.editableCell = config['editableCell'];
         if(config['display'])
            this.display = config['display'];
        if(config['rowItems']){
            for (var i = 0; i<config['rowItems'].length;i++)
                this.rowItems[i] = config['rowItems'][i].clone();
        }
    }
}

RowGrid.prototype.getValues = function(){
    var i = 0;
    var length = this.display.length;
    for(i=0;i<length;i++){
        var ok = true;
        for(var j=0;j<this.rowItems.length;j++){
            if(this.rowItems[j].attachValue == this.display[i]){
                ok=false;
                length--;
                break;
            }
        }
        if(ok)
            this.values[this.display[i]] = this.cells[i].getValue();
    }
    for(i=0;i<this.rowItems.length;i++){
        if(this.rowItems[i].attachValue != '' && this.rowItems[i].attachValue != undefined)
            this.values[this.rowItems[i].attachValue] = this.cells[length+i+1].getValue();
    }
    return this.values;
}
    
RowGrid.prototype.clone = function(){
    var newObject = new RowGrid();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}


RowGrid.prototype.createRow = function(indexRow){
    var rowGrid = document.createElement('tr');
    rowGrid.setAttribute('id', this.id);
    for(var i = 0; i < this.display.length; i++){
        var value;
        var split = this.display[i].split('.');
        value = this.values[split[0]];
        if(value != null && value != undefined){
                for(var j=1;j<split.length;j++){
                    if(value[split[j]] != undefined && value[split[j]] != null)
                        value = value[split[j]];
                    else
                        value='';
            }
        }else
            value = '';
        var cellGrid = new CellGrid({
            id:this.id+'Cell'+(i+1),
            value:value,
            editable:this.editableCell[i]
        });
        this.cells[i] = cellGrid;
        rowGrid.appendChild(cellGrid.createCell());
        if(indexRow != undefined){
            rowGrid.className='RowGrid'+((indexRow%2)+1);
            addEvent('mouseover', rowGrid, over,rowGrid);
            addEvent('mouseout', rowGrid, out,rowGrid,'RowGrid'+((indexRow%2)+1));
        }
    }
    for(var i = 0;i< this.rowItems.length;i++){
        var item = this.rowItems[i].clone();
        item.id = item.id + indexRow;
        var element;
        if(item.attachValue != '')
            item.value = this.values[item.attachValue];
        if(item.onclick != undefined){
            item.enableEvent = false;
            element = item.createItem();
            addEvent('click', element, function(){
                var datos = arguments[1][0].getValues();
                arguments[1][1].onclick(arguments[1][1].id,arguments[1][1].value,datos);
            },this,item);
        }else
            element = item.createItem();
        
        var cellGrid =new CellGrid({value : element});
        rowGrid.appendChild(cellGrid.createCell());
        this.cells[this.display.length+i] = item;
    }
    
    return rowGrid;
    
    function out(){
        var row =arguments[1][0];
        row.className =  arguments[1][1];
    }
    function over(){
        var row =arguments[1][0];
        row.className =  'RowGridOver';
    }
}



