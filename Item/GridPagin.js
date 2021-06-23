/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function GridPagin(config){
    this.id = '';
    this.dataSet = undefined;
    this.displayRows = 5;
    this.index = 1;
    this.prev = 'Anterior';
    this.next = 'Siguiente';
    this.first = 'Inicial';
    this.last = 'Final';
    this.lastValue = 1;
    this.grid = undefined;
    this.numberPages = 0;
    
    this.onclick = undefined;
    
     if(config!=undefined){
         if(config['id'])
            this.id = config['id'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
        if(config['displayRows'])
            this.displayRows = config['displayRows'];
        if(config['checked'])
            this.checked = config['checked'];
        if(config['positionLabel'])
            this.positionLabel = config['positionLabel'];
        if(config['grid'])
            this.grid = config['grid'];
    }
    
    if(this.id == '')
        this.id = 'Pagin'+random();
}
GridPagin.prototype = Grid;

GridPagin.prototype.createItem = function(){
    var pagDiv = document.createElement('div');
    pagDiv.setAttribute('id', this.id);
    var table = document.createElement('table');
    table.className = 'GridPagin';
    table.setAttribute('id', this.id+'Table');
    pagDiv.appendChild(table);
    table.border = 1;
    var tbody= document.createElement('tbody');
    table.appendChild(tbody);
    var row = document.createElement('tr');
    tbody.appendChild(row);
    createElement(row,this.first,this,this.id+'Init',true);
    createElement(row,this.prev,this,this.id+'Prev',true);
    var data=this.dataSet.getDataRoot();
    var pagesNum = Math.floor(data.length/this.displayRows);
    if((data.length%this.displayRows)>0)
        this.numberPages = pagesNum + 1;
    var textPagin = ' ' + this.index + ' de ' + this.numberPages + ' ';
    createElement(row,textPagin,this,this.id+'Text',false);
    createElement(row,this.next,this,this.id+'Next',true);
    createElement(row,this.last,this,this.id+'Last',true);
    
    function createElement(row,value,pager,id,attachEvent){
        var cell = document.createElement('td');
        row.appendChild(cell);
        var div = document.createElement('div');
        div.setAttribute('id',id);
        if(attachEvent){
            div.style.cursor = 'pointer';
            addEvent('click', div, onclick,pager,value);
        }
        cell.appendChild(div);
        if(typeof value == 'string')
            div.appendChild(document.createTextNode(value));
    }
    return pagDiv;
    
    function onclick(){
        var pager = arguments[1][0];
        var opcion = arguments[1][1];
        pager.lastValue = pager.index;
        if(opcion == pager.next){
            if(pager.index<pager.numberPages)
                pager.index ++;
        }else if(opcion == pager.prev){
            if(pager.index>1)
            pager.index --;
        }else if(opcion == pager.first)
            pager.index = 1;
        else if(opcion == pager.last)
            pager.index = pager.numberPages;
        else
            pager.index = parseInt(opcion);
        changeTextPage(pager.id+'Text', ' '+pager.index + ' de ' + pager.numberPages);
        if(pager.grid != undefined)
            pager.grid.changePage();
    }
    
    function changeTextPage(idElement,text){
        var divText = document.getElementById(idElement);
        divText.removeChild(divText.firstChild);
        divText.appendChild(document.createTextNode(text));
    }
}

GridPagin.prototype.getData = function(){
    var newData =[this.displayRows];
    var data = this.dataSet.getDataRoot();
    var init =(this.index-1)*this.displayRows;
    var to = this.index * this.displayRows;
    var j=0;
    for(var i=init;i<to;i++){
        if(data[i])
            newData[j] = data[i];
        j++;
    }
    return newData;
}

GridPagin.prototype.getData2 = function(pagin){
    var data = this.dataSet.getDataRoot();
    
}



    