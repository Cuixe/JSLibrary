/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Group(config){
    
    this.items = [];
    this.name = '';
    this.id = '';
    this.align ='height'; // widht --> vertical, height --> horizontal
    this.config = undefined;
    this.onclick = undefined
    this.label;
    this.requerid = false;
    this.textErrorRequerid='';
    this.disabled = false;
    
    if(config){
        if(config['id'])
            this.id = config['id'];
         if(config['label'])
            this.label = config['label'];
        if(config['align'])
            this.align = config['align'];
        if(config['name'])
            this.name = config['name'];
        if(config['items']){ var i;
            for(i=0;i<config['items'].length;i++)
                this.items[i] = config['items'][i].clone();
        }
        if(config['requerid'])
            this.requerid = config['requerid'];
        if(config['textErrorRequerid'])
            this.textErrorRequerid = config['textErrorRequerid'];
        if(config['onclick'])
            this.onclick = config['onclick'];
        if(config['disabled'])
            this.disabled = config['disabled'];
        this.config = config;
    }
}

Group.prototype.createItem = function(){
    
    var tableGroup = document.createElement('table');
    var tbodyGroup = document.createElement('tbody');
    tableGroup.appendChild(tbodyGroup);
    var i;
    if(this.align == 'widht'){
        var row = document.createElement('tr');
        tbodyGroup.appendChild(row);
        for(i=0;i<this.items.length;i++){
            row.appendChild(createRowRadio(this,i));
        }
    }else if(this.align == 'height'){
        for(i=0;i<this.items.length;i++){
            var row = document.createElement('tr');
            tbodyGroup.appendChild(row);
            row.appendChild(createRowRadio(this,i));
        }
    }
    
    function createRowRadio(group,index){
        var cell = document.createElement('td');
        var item = group.items[index];
        item.name = group.name;
        item.disabled = group.disabled;
        var element = item.createItem();
        if(group.onclick != undefined)
            addEvent('click', element,group.onclick,item,group);
        cell.appendChild(element);
        return cell;
    }
    
    return tableGroup;
}
