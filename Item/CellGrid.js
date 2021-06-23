/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TextGrid(config){
    this.id = '';
    this.value = '';
    
    if(config != undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['value'])
            this.value = config['value'];
    }

    this.getTextGrid = function(){
        var text = document.createElement('input');
        text.setAttribute('type', 'text');
        if(this.value != '')
            text.setAttribute('value', this.value);
        return text;
    }
}

function CellGrid(config){
    this.editable = false;
    this.value = '';
    this.id = '';
    this.cellDiv = undefined;
    this.attachValue = '';
    
    if(config!=undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['value'])
            this.value = config['value'];
        if(config['editable'])
            this.editable = config['editable'];
        if(config['attachElement'])
            this.attachElement = config['attachElement'];
    }
}

CellGrid.prototype.createCell = function(){
    var value = this.value;
    var cellDiv = document.createElement('div');
    var cellGrid = document.createElement('td');
    cellGrid.appendChild(cellDiv);
    cellGrid.setAttribute('id', this.id);
    cellDiv.className = 'CellStyle';
    if(typeof this.value == 'string' || typeof this.value == 'number'){
        cellDiv.appendChild(document.createTextNode(this.value));
        if(this.editable){
            addEvent('dblclick',cellDiv, showText,this);
        }
    } else{
        cellDiv.appendChild(this.value);
        if(this.value.attachValue != '')
            this.attachValue = this.value.attachValue;
    }
    
    return cellGrid;
    
    function showText(){
        var cellGrid = arguments[1][0];
        cellDiv.removeChild(cellDiv.firstChild);
        var text = new TextGrid({value:cellGrid.value}).getTextGrid();
        cellDiv.appendChild(text);
        addEvent('keypress', text,showValue,cellGrid);
    }
    
    function showValue(e){
        var tecla = (document.all) ? e.keyCode : e.which;
        if(tecla == 13){
            var value = (e.target) ? e.target.value : ((e.srcElement) ? e.srcElement.value : null);
            cellDiv.removeChild(cellDiv.firstChild);
            cellDiv.appendChild(document.createTextNode(value));
            arguments[1][0].value = value;
        }
    }    
}

CellGrid.prototype.getValue = function(){
    if(typeof this.value == 'string' || typeof this.value == 'number')
        return this.value;
    else
        return this.value.value;
}

CellGrid.prototype.clone = function(){
    
}



