/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function TableForm(config){
    this.id = '';
    this.elements = [];
    this.dataSet = undefined;
    this.data = {};
    this.action = '';
    
    if(config != undefined){
        if(config['id'])
            this.id=config['id'];
        if(config['elements'])
            this.elements = config['elements'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
        if(config['data'])
            this.data = config['data'];
        if(config['action'])
            this.action = config['action'];
    }
}

TableForm.prototype.createForm = function(){
    var datos;
    if(this.dataSet != undefined)
        datos = dataSet.getDataRoot();
    else
        datos = this.data;
    var form = document.createElement('form');
    if(this.id != '')
        form.setAttribute('id', this.id);
    if(this.action != '')
        form.setAttribute('action', this.action);
    var table = document.createElement('table');
    table.setAttribute((document.all?'className':'class'), 'Form');
    form.appendChild(table);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    for(var i = 0; i <this.elements.length;i++){
        var tr = document.createElement('tr');
        var rowElement = this.elements[i].row;
        tbody.appendChild(tr);
        for(var j =0 ; j < rowElement.length ; j++){
            var element = rowElement[j]; 
            var td = document.createElement('td');
            tr.appendChild(td);
            if(element['colspan'])
                td.setAttribute('colspan', element['colspan']);
            if(element['item']=='Label')
                td.appendChild(document.createTextNode(element['value']));
            else if(typeof element['item'] == 'string') {
                var config = undefined;
                if(element['config'])
                    config = JSON.stringify(element['config']);
                var object = eval('new '+element['item'] + '('+ config +')'); 
                if(object.id != '' && datos[object.id] != undefined)
                    object.value = datos[object.id];
                td.appendChild(object.createItem());
            }else if(typeof element['item'] == 'object'){
                if(element['item'].createItem)
                    td.appendChild(element['item'].createItem());
            }
        }
    }
    return form;
}
    
TableForm.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createForm());
}

