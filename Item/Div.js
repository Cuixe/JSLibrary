

function Div(config){
    this.id;
    this.align;
    if(config != undefined){
        if(config['id'])
            this.id = config['id'];
        if(config['align'])
            this.align = config['align'];
    }   
}

Div.prototype.createItem = function(){
    var div = document.createElement('div');
    div.id = this.id;
    if (this.align)
        div.align = this.align;
    return div;
}