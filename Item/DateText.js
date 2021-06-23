/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function DateText(config){
    this.base = Item;
    this.base(config);
    this.format = 'dd/MM/yyyy';
    this.disabled = false;
    this.disabledText = true;
    this.textCalentar = undefined;
    
    if(config != undefined){
        if(config['format'])
            this.format = config['format'];
        if(config['disabled']!= undefined)
            this.disabled = config['disabled'];
         if(config['disabledText']!= undefined)
            this.disabledText = config['disabledText'];
    }
}
DateText.prototype = new Item;

DateText.prototype.createItem = function(){
    if(this.id == '')
        this.id = 'calendar'+random();
    var contentDateText = document.createElement('div');
    contentDateText.setAttribute('id', this.id+'Div');
    contentDateText.setAttribute('disabled', this.disabled);
    var tableDateText = document.createElement('table');
    contentDateText.appendChild(tableDateText);
    tableDateText.setAttribute((document.all?'cellPadding':'cellsadding'), '0');
    tableDateText.setAttribute((document.all?'cellSpacing':'cellspacing'), '0');
    var tboyd = document.createElement('tbody');
    tableDateText.appendChild(tboyd);
    var tr = document.createElement('tr');
    tboyd.appendChild(tr);
    var tdText = document.createElement('td');
    tr.appendChild(tdText);
    this.textCalentar = new Text({id:this.id,name:this.name,disabled:this.disabledText,value:this.value,className:'DataTextLabel'});
    tdText.appendChild(this.textCalentar.createItem());
    var tdLink = document.createElement('td');
    tr.appendChild(tdLink);
    
    var link;
    if(!this.disabled){
        link = document.createElement('a');
        link.setAttribute('id', this.id+'Link');
        link.setAttribute('href', '#');
        addEvent('click',link,showItemCalendar,this);
    }
    else{
        link = document.createElement('div');
        link.setAttribute('id', this.id+'Link');
    }
    var imagen = document.createElement('div');
    imagen.className = 'DataTextImg';
    link.appendChild(imagen);
    tdLink.appendChild(link);

    return contentDateText;
}

DateText.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}

DateText.prototype.clone = function(){
    var newObject = new DateText();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}

DateText.prototype.getValue = function(){
   return this.textCalentar.getValue();
}

DateText.prototype.clean = function(){
    this.textCalentar.clean();
}

DateText.prototype.setValue = function(value){
    this.textCalentar.setValue(value.substr(0,this.format.length));
}

DateText.prototype.enabled = function(){
    if(arguments[0] != undefined){
        this.disabled = arguments[0];
    }
    var parentLink = document.getElementById(this.id + 'Link').parentNode;
    while(parentLink.firstChild)
        parentLink.removeChild(parentLink.firstChild);
    var link;
    if(!this.disabled){
        link = document.createElement('a');
        link.setAttribute('id', this.id+'Link');
        link.setAttribute('href', '#');
        addEvent('click',link,showItemCalendar,this);        
    }
    else{
        link = document.createElement('div');
        link.setAttribute('id', this.id+'Link');
    }
    var imagen = document.createElement('div');
    imagen.className = 'DataTextImg';
    link.appendChild(imagen);
    parentLink.appendChild(link);
}

function showItemCalendar(){
        var dataText = arguments[1][0];
        var calendario=new CalendarPopup("calendarDiv");
        calendario.setCssPrefix("TEST");
        calendario.select(document.getElementById(dataText.id),dataText.id+'Link',dataText.format);
}

