/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function Form(config){
    this.id = '';
    this.elements = undefined;
    this.dataSet = undefined;
    
    if(config != undefined){
        if(config['id'])
            this.id=config['id'];
        if(config['elements'])
            this.elements = config['elements'];
        if(config['dataSet'])
            this.dataSet = config['dataSet'];
    }

    this.render = function(content){
        var contenedor = document.getElementById(content);
        var form = document.createElement('form');
        form.setAttribute('id', this.id);
        contenedor.appendChild(form);
        var table = document.createElement('table');
        form.appendChild(table);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        var items = this.elements.items;
        for(i=0;i<items.length;i++){
            var row = items[i].row;
            var filaTabla = document.createElement('tr');
            tbody.appendChild(filaTabla);
            for(j=0;j<row.length;j++){
                var cel = row[j];
                var celdaTabla = document.createElement('td');
                filaTabla.appendChild(celdaTabla);
                celdaTabla.setAttribute('colspan', cel.colspan);
                if(typeof cel.value == 'string')
                    celdaTabla.appendChild(document.createTextNode(cel.value));
                else{
                    var div = document.createElement('div');
                    celdaTabla.appendChild(div);
                    div.setAttribute('id', this.id+'Div'+i+j);
                    var element=cel.value;
                    
                    if(this.dataSet != undefined){
                        var datos = this.dataSet.getDataRoot();
                        if(datos[element.id] != undefined){
                            if(element.value == undefined)
                                element.defaultValue=datos[element.id];
                            else    
                              element.value = datos[element.id];
                        }
                    }
                    
                    element.render(this.id+'Div'+i+j);
                }
            }
        }
    }
    
    function attachValue(){
        
    }
}
