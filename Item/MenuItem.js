/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function MenuItem(config){
    this.value = '';
    this.url = '';
    this.className = 'dir';
    this.menuItems = [];
    
    if(config){
        if(config['value'])
            this.value = config['value'];
        if(config['url'])
            this.url = config['url'];
        if(config['className'])
            this.className = config['className'];
        if(config['menuItems'])
            this.menuItems = config['menuItems'];
    }
}

MenuItem.prototype.createItem = function(){
    var li = document.createElement('li');
    if(this.url != ''){
        var link = document.createElement('a');
        link.setAttribute('href', this.url);
        link.appendChild(document.createTextNode(this.value));
        if(this.menuItems.length > 0){
            var span = document.createElement('span');
            span.className = this.className;
            span.appendChild(link);
            li.appendChild(span);
            var ul = document.createElement('ul');
            if(this.menuItems[0] instanceof MenuItem){
                for(var i = 0;i<this.menuItems.length;i++){
                    var liItem = this.menuItems[i].createItem();
                    ul.appendChild(liItem);
                }
            }else{
                for(var i = 0;i<this.menuItems.length;i++){
                    var configItem = this.menuItems[i];
                    var menuItem = new MenuItem(configItem);
                    ul.appendChild(menuItem.createItem());
                }
            }
            li.appendChild(ul);
        }else
            li.appendChild(link);
    }else{
        if(this.menuItems.length > 0){
            var span = document.createElement('span');
            span.className = this.className;
            span.appendChild(document.createTextNode(this.value));
            li.appendChild(span);
            var ul = document.createElement('ul');
           if(this.menuItems[0] instanceof MenuItem){
                for(var i = 0;i<this.menuItems.length;i++){
                    var liItem = this.menuItems[i].createItem();
                    ul.appendChild(liItem);
                }
            }else{
                for(var i = 0;i<this.menuItems.length;i++){
                    var configItem = this.menuItems[i];
                    var menuItem = new MenuItem(configItem);
                    ul.appendChild(menuItem.createItem());
                }
            }
            li.appendChild(ul);
        }else
            li.appendChild(document.createTextNode(this.value));
    }
    
    
    
    return li;
}