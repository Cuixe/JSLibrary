/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Link(config){
    this.base = Item;
    this.base(config);
    this.dir = '';
    this.href = '';
    this.hreflang ='';
    this.media = '';
    this.rel = '';
    this.rev = '';
    this.onclick = undefined
    
    if(config != undefined){
        if(config['dir'] != undefined)
            this.dir = config['dir'];
        if(config['href'] != undefined)
            this.href = config['href'];
        if(config['hreflang'] != undefined)
            this.hreflang = config['hreflang'];
        if(config['media'] != undefined)
            this.media = config['media'];
        if(config['rel'] != undefined)
            this.rel = config['rel'];
        if(config['rev'] != undefined)
            this.rel = config['rev'];
         if(config['onclick'] != undefined)
            this.onclick = config['onclick'];
    }
}

Link.prototype = new Item;

Link.prototype.createItem = function(){
    var value = this.value;
    this.value = '';
    var link = this.constructor.prototype.createItem.call(this,'a');
    var divLink = document.createElement('div');
    divLink.setAttribute('id', this.id+'Div');
    divLink.appendChild(link);
    this.value = value;
    if(this.dir != '')
        link.setAttribute('dir', this.dir);
    if(this.href != '')
        link.setAttribute('href', this.href);
    if(this.hreflang != '')
        link.setAttribute('hreflang', this.hreflang);
    if(this.media != '')
        link.setAttribute('media', this.media);
    if(this.rel != '')
        link.setAttribute('rel', this.rel);
    if(this.rev != '')
        link.setAttribute('rev', this.rev);
    if(this.value != '')
        link.appendChild(document.createTextNode(this.value));
    return divLink;
}

Link.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}
