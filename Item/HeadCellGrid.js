/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function HeadCellGrid(config){
    this.id = '';
    this.value = '';
    this.colspan = '';
    this.sortable = false;
    this.icon = 'none';
    
    if(config != undefined){
        if(config['value'])
            this.value = config['value'];
        if(config['colspan'])
            this.colspan = config['colspan'];
        if(config['id'])
            this.id = config['id'];
        if(config['icon'])
            this.icon = config['icon'];
    }
}

HeadCellGrid.prototype.createHeadCell = function(){
    if(this.id == '')
        this.id = 'headCell'+random();
    var cellGrid = document.createElement('th');
    if(this.colspan != '')
        cellGrid.colSpan = this.colspan;
    var table = document.createElement('table');
    cellGrid.appendChild(table);
    table.className = 'CellHeadGrid';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var textCell = document.createElement('td');
    tr.appendChild(textCell);
    textCell.appendChild(document.createTextNode(this.value));
    var imgCell = document.createElement('td');
    tr.appendChild(imgCell);
    var imgDiv = document.createElement('div');
    imgCell.appendChild(imgDiv);    
    imgDiv.setAttribute('id', 'imgDiv'+this.id);
    imgDiv.className = this.getStyleIcon(this.icon);
    return cellGrid;
}

/*
 *Acepta 3 parametros up, down, none
 **/
HeadCellGrid.prototype.changeIcon = function(icon){
    var imgDiv = document.getElementById('imgDiv'+this.id);
    if(imgDiv != undefined){
        imgDiv.className = this.getStyleIcon(icon);
        this.icon = icon;
    }
}

HeadCellGrid.prototype.getStyleIcon = function(icon){
    if(icon == 'up') 
        return 'IconOrderUp';
    if(icon == 'down') 
        return 'IconOrderDown';
    else
        return '';
}





