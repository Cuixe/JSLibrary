/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function FormTable(config){
    this.base = PanelTable;
    this.base(config);
    this.id = '';
    this.action = '';
    this.method = 'get';
    this.emptyForm = false;
    this.visible = true;
    this.textErrorEmptyForm = 'El formulario no puede estar vacio';
    
    if(config != undefined){
        if(config['id'])
            this.id=config['id'];
        if(config['method'])
            this.method = config['method'];
        if(config['action'])
            this.action = config['action'];
        if(config['emptyForm'])
            this.emptyForm = config['emptyForm'];
        if(config['textErrorEmptyForm'])
            this.textErrorEmptyForm = config['textErrorEmptyForm'];
        if(config['visible'] != undefined)
            this.visible = config['visible'];
    }
}

FormTable.prototype = new PanelTable;

FormTable.prototype.createItem = function(){
    var form = document.createElement('form');
    form.setAttribute('id', this.id);
    form.setAttribute('action', this.action);
    form.setAttribute('method', this.method);
    form.className = 'Form';
    var panel = this.constructor.prototype.createItem.call(this);
    form.appendChild(panel);
    if(!this.visible)
        form.style.display='none';
    return form;
}
    
FormTable.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}

FormTable.prototype.validateEmptyElement = function(object){
    if(object instanceof PanelTable){
        if(object.validateRequeridElements())
            return true;
        else
            return false;
    }
    else if(object instanceof ComboBox){
        if(object.getValue() == object.emptyValue)
            return false;
    }else if(object.getValue() == '' || object.getValue() == undefined)
         return false;
    return true;
}

FormTable.prototype.validateRequeridElement = function(object){
    if(object.requerid){
        if(!this.validateEmptyElement(object)){
            alert(object.textErrorRequerid);
            return false;
        }
    }
    return true;
}

FormTable.prototype.validateRequeridElements = function(){
    
}

FormTable.prototype.changeVisibility = function(bool){
    var form = document.getElementById(this.id);
    if(form == undefined)
        return null;
    if(!bool)
        form.style.display='none';
    else
        form.style.display='';
    this.visible=bool;
    return true;
}

FormTable.prototype.submit = function(){
    var send = false;
    if(this.action != ''){
        var form = document.createElement('form');
        form.action = this.action
        form.method = this.method;
        for(var p in this.objects){
            if(this.objects[p].id != '' && this.objects[p].getValue){
                if(!this.validateRequeridElement(this.objects[p]))
                    return false;
                if(this.validateEmptyElement(this.objects[p]))
                    send = true;
                var hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.id = this.objects[p].id;
                if(this.objects[p].name == '')
                    hidden.name = this.objects[p].id;
                else
                    hidden.name = this.objects[p].name;
                hidden.value = this.objects[p].getValue();
                form.appendChild(hidden);
            }
        }
        document.body.appendChild(form);
        if(send == this.emptyForm)
            alert(this.textErrorEmptyForm);
        else
            form.submit();
    }
}

FormTable.prototype.submitAjax = function(options){
    var send = this.emptyForm;
    if(this.action != ''){
        var parameters = '?';
        for(var p in this.objects){
             if(this.objects[p] instanceof PanelTable){
                if(!this.objects[p].validateRequeridElements())
                    return false;
                else
                    send = true;
                parameters+=this.objects[p].getParameters();
             }
             else if(this.objects[p].id != '' && this.objects[p].getValue){
                if(this.objects[p].regExp != '' && this.objects[p].regExp != undefined){
                    var reg = new RegExp(this.objects[p].regExp);
                    if(!reg.test(this.objects[p].getValue())){
                        alert(this.objects[p].textErrorRegExp);
                        return false;
                    }
                        
                }
                if(!this.validateRequeridElement(this.objects[p]))
                    return false;
                if(this.validateEmptyElement(this.objects[p]))
                    send = true;
                parameters += this.objects[p].id + '=' + this.objects[p].getValue()+'&';
            }
        }
        if(send == false && this.emptyForm == false)
            alert(this.textErrorEmptyForm);
        else
            $.ajax({
                type:this.method,
                url:this.action+parameters,
                cache:false,
                error:function(){
                    if(options['error'])
                        options['error'](arguments[0],arguments[1],arguments[2]);
                },
                success:function(){
                    if(options['success'])
                        options['error'](arguments[0],arguments[1]);
                },
                complete:function(){
                    if(options['complete'])
                        options['complete'](arguments[0],arguments[1]);
                }
            });
    }
}
