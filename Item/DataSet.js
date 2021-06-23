/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function DataSet(config){
    this.url = '';
    this.data = undefined;
    this.displayValues = undefined;
    this.id = '';
    this.root = '';
    
    if(config){
        if(config['url'])
            this.url = config['url'];
        if(config['data'])
            this.data = config['data'];
        if(config['displayValues'])
            this.displayValues = config['displayValues'];
        if(config['id'])
            this.id = config['id'];
        if(config['root'])
            this.root = config['root'];
    }
}

DataSet.prototype.getDataRoot = function(){
    if(this.data != undefined && this.root != undefined)
        return this.data[this.root];
    else
        return {};
}

DataSet.prototype.requestUrl = function(){
    if(this.url != ''){
        var http=createXmlHttpRequestObject();
        http.open('get',this.url,false);
        
        try{
          http.send(null);
          var text = http.responseText;
          this.data = JSON.parse(text);
        }catch(e){
            alert(e);
        }
    }
    
    function createXmlHttpRequestObject(){
        if (window.XMLHttpRequest)
            return new XMLHttpRequest();
        else
            return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

DataSet.prototype.setData = function(data){
    this.data = data;
}

DataSet.prototype.getNumberRows = function(){
    if(this.data != undefined)
        return this.getDataRoot().length;
    else
        return 0;
}
