/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function HeadRowGrid(config){
    this.id = '';
    this.sortable = [];
    this.values = [];
    this.colspan = [];
    this.orders = [];
    this.cellHead = [];
    this.onclick = undefined;
    
    if(config != undefined){
        if(config['values'])
            this.values = config['values'];
         if(config['colspan'])
            this.colspan = config['colspan'];
        if(config['sortable'])
            this.sortable = config['sortable'];
        if(config['onclick'])
            this.onclick = config['onclick'];
        if(config['orders'])
            this.orders = config['orders'];
        if(config['cellHead'])
            this.cellHead = config['cellHead'];
    }
}

HeadRowGrid.prototype.createHeadRow = function(){
    var rowGrid = document.createElement('tr');
    rowGrid.className='HeadGrid';
    rowGrid.setAttribute('id', this.id);
    if(this.cellHead.length < 1)
        this.cellHead = new Array(this.values.length);
    for(var i=0;i<this.values.length;i++){
        var span = 1;
        if(this.colspan.length > 0)
            span = this.colspan[i];
        var objectCellGrid = new HeadCellGrid({value:this.values[i],colspan:span});
        if(this.cellChecked != undefined && this.cellChecked == i){
            this.cellHead[this.cellChecked].icon = this.iconChecked;
        }
        var cellGrid = objectCellGrid.createHeadCell();
        if(this.sortable[i]){
            addEvent('click', cellGrid, changeIcon,objectCellGrid,this,i);
        }
        this.cellHead[i] = objectCellGrid;
        rowGrid.appendChild(cellGrid);
    }
        
    return rowGrid;
    
    function changeIcon(){
        var sort;
        var index = arguments[1][2];
        var headRowGrid = arguments[1][1];
        headRowGrid.cellChecked = index;
        for (var i = 0;i < headRowGrid.cellHead.length;i++){
            if(i != index)
                headRowGrid.cellHead[i].changeIcon('none');
            else{
                var headCellGrid = headRowGrid.cellHead[i];
                if(headCellGrid.icon == 'down' || headCellGrid.icon == 'none'){
                    headCellGrid.changeIcon('up');
                    headRowGrid.iconChecked = 'up';
                    sort = 'asc';
                }
                else{
                    headCellGrid.changeIcon('down');
                    headRowGrid.iconChecked = 'down';
                    sort = 'desc';
                }
            }
        }
        headRowGrid.grid.sortData(index,sort);
    }
    
    function attachImg(element,order){
        var img
        if(order == 'asc'){
          img = document.createElement('img');
          img.setAttribute('src', 'JSLibrary/item/img/sortAsc.gif');
          img.setAttribute('id', 'asc');
          element.appendChild(img);
        }else if(order == 'desc'){
          img = document.createElement('img');
          img.setAttribute('src', 'JSLibrary/item/img/sortDesc.gif');
          img.setAttribute('id', 'desc');
          element.appendChild(img);  
        }
    }
}

