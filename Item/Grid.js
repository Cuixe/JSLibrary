/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Grid(config){
    
    this.id = '';
    this.dataSet = {};
    this.headers = [];
    this.rows = [];
    this.rowItems = [];
    this.colspan = [];
    this.gridPagin = undefined;
    this.sortable = [];
    this.headerRow = undefined;
    this.editableCell = [];
    this.displayRows = 10;
    this.showIndex = false;
    this.autoLoad = true;
    
    if(config!=undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['autoLoad'] != undefined)
            this.autoLoad = config['autoLoad'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
        if(config['headers'])
            this.headers = config['headers'];
        if(config['rows'])
            this.rows = config['rows'];
        if(config['rowItems'])
            this.rowItems = config['rowItems'];
        if(config['colspan'])
            this.colspan = config['colspan'];
        if(config['gridPagin'])
            this.gridPagin = config['gridPagin'];
        if(config['sortable'])
            this.sortable = config['sortable'];
        if(config['hederRow'])
            this.hederRow = config['hederRow'];
        if(config['displayRows'])
            this.displayRows = config['displayRows'];
        if(config['editableCell'])
            this.editableCell = config['editableCell'];
        if(config['showIndex'])
            this.showIndex = config['showIndex'];
    }
}

Grid.prototype.createItem = function(){
    if(this.id == '')
        this.id ='grid'+ random();
    var divGrid = document.createElement('div');
    divGrid.setAttribute('id', this.id+'Div');
    var tableGrid = document.createElement('table');
    tableGrid.setAttribute('id', this.id+'Table');
    tableGrid.className = 'Grid';
    divGrid.appendChild(tableGrid);
    tableGrid.appendChild(this.createHead());
    if(this.autoLoad)
        tableGrid.appendChild(this.createBody());
    if(this.gridPagin != undefined)
        tableGrid.appendChild(this.createFooter());
    return divGrid;
}

Grid.prototype.createBody = function(){
    if(this.dataSet != undefined){
        if(this.dataSet.data == undefined && this.dataSet.url != '')
            this.dataSet.requestUrl();
        var lengthDatos = this.dataSet.getDataRoot().length;
        if(this.displayRows != -1 && this.displayRows <= lengthDatos){
            this.gridPagin = new GridPagin({dataSet:this.dataSet,displayRows: this.displayRows,grid:this});
            this.dataSet = undefined;
        }
    }
    var data;
    var display;
    if(this.dataSet != undefined){
        data = this.dataSet.getDataRoot();
        display = this.dataSet.displayValues;
    }else{
        data = this.gridPagin.getData();
        display = this.gridPagin.dataSet.displayValues;
    }
    if(arguments[0] != undefined)
        data = arguments[0]; 

    var body = document.createElement('tbody');
    body.setAttribute('id', this.id+'Body');
    this.rows = new Array(data.length);
    //var lengthDatos = data.length;
    
    for(var i=0;i<data.length;i++){
        var rowGrid = new RowGrid({
            id:this.id+'Row'+(i+1),
            values:data[i],
            editableCell:this.editableCell,
            display : display,
            rowItems:this.rowItems
        });
        this.rows[i] = rowGrid;
        body.appendChild(rowGrid.createRow(i));
    }
    return body;
}

Grid.prototype.createHead = function(){
    var head = document.createElement('thead');
    head.setAttribute('id', this.id+'Head');
    if(this.headerRow == undefined)
        this.headerRow = new HeadRowGrid({
            values:this.headers,
            colspan:this.colspan,
            sortable:this.sortable});
        this.headerRow.grid = this;
    head.appendChild(this.headerRow.createHeadRow());
    return head;
}

Grid.prototype.createFooter = function(){
    var footer = document.createElement('tfoot');
    footer.setAttribute('id', this.id+'Footer');
    var pagRow = document.createElement('tr');
    pagRow.className = 'FooterGrid';
    pagRow.align = 'center';
    footer.appendChild(pagRow);
    var pagCell = document.createElement('td');
    pagRow.appendChild(pagCell);
    pagCell.colSpan = this.headers.length+this.rowItems.length;
    if(this.gridPagin == undefined)
        this.gridPagin = new GridPagin();
    pagCell.appendChild(this.gridPagin.createItem());
    return footer;
}

Grid.prototype.deleteElement = function(idElement){
    var element = document.getElementById(idElement);
    if(element != undefined)
        element.parentNode.removeChild(element);
}

Grid.prototype.sortData = function (displayIndex,sort){
    var data;
    var display;
    if(this.dataSet != undefined){
        this.getValues();
        data = this.dataSet.getDataRoot(); 
        display = this.dataSet.displayValues[displayIndex];
    }
    else{
        this.gridPagin.lastValue = this.gridPagin.index;
        this.getValues();
        data = this.gridPagin.dataSet.getDataRoot();
        display = this.gridPagin.dataSet.displayValues[displayIndex];
    }
     
    if(sort == 'desc'){
        data.sort(function(obj1,obj2){
            return obj1[display] < obj2[display] ? -1:
                (obj1[display] > obj2[display] ? 1 : 0);
        });
    }else if(sort == 'asc'){
        data.sort(function(obj1,obj2){
            return obj1[display] > obj2[display] ? -1:
                (obj1[display] < obj2[display] ? 1 : 0);
        });
    }
    this.deleteElement(this.id+'Body');
    var tableGrid =document.getElementById(this.id+'Table');
    if(tableGrid != undefined)
        tableGrid.appendChild(this.createBody());
}

Grid.prototype.changePage = function(){
    this.getValues();
    this.deleteElement(this.id+'Body');
     var tableGrid =document.getElementById(this.id+'Table');
    if(tableGrid != undefined)
        tableGrid.appendChild(this.createBody());
}

Grid.prototype.render = function (content){
    var container = document.getElementById(content);
    var grid = this.createItem();
    container.appendChild(grid);
}

Grid.prototype.getValues = function (){
    var datos;
    var dataSet;
    var end;
    var init
    if(this.dataSet != undefined){
        datos = this.dataSet.getDataRoot();
        dataSet = this.dataSet;
        init = 0;
        end = datos.length;
    }
    else{
        datos = this.gridPagin.dataSet.getDataRoot();
        dataSet = this.gridPagin.dataSet;
        init = (this.gridPagin.lastValue-1)* this.gridPagin.displayRows;
        end = this.gridPagin.displayRows;
    }
    var i =0;
    for(i = 0; i<end;i++){
        if(this.rows[i] != undefined){
            dataSet.data[dataSet.root][init] = this.rows[i].getValues();
            init++;
        }
    }
    
    return dataSet;
}

Grid.prototype.clone = function(){
    var newObject = new Grid();
    var keys = [];
    for (var property in this)
        keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}

Grid.prototype.remove = function(){
    var content = document.getElementById(this.id+'Div');
    if(content != null){
        var parent = content.parentNode;
        while(parent.firstChild)
            parent.removeChild(parent.firstChild);
    }
}

Grid.prototype.hiddeGrid = function(visibility){
    var content = document.getElementById(this.id);
    content.style.visibility=visibility;
}

Grid.prototype.load = function(){
    this.autoLoad = true;
    var tableGrid = document.getElementById(this.id+'Table');
    if(tableGrid != undefined)
        tableGrid.appendChild(this.createBody());
     if(this.gridPagin != undefined)
        tableGrid.appendChild(this.createFooter());
}

