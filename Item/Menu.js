/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Menu(config){
    this.menuItems = [];
    this.jsonItems = [];
    this.id = '';
    this.className = 'dropdown dropdown-vertical';
    
    if(config){
        if(config['id'])
            this.id = config['id'];
        if(config['menuItems'])
            this.menuItems = config['menuItems'];
        if(config['className'])
            this.className = config['className'];
        if(config['jsonItems'])
            this.jsonItems = config['jsonItems'];
    }
}

Menu.prototype.createMenu = function(){
    if(this.id == '')
        this.id = 'menu'+random();
    var ul = document.createElement('ul');
    ul.className = this.className;
    ul.setAttribute('id', this.id);
    if(this.menuItems.length>0){
        if(this.menuItems[0] instanceof MenuItem){
            for(var i = 0;i<this.menuItems.length;i++){
                var menuItem = this.menuItems[i].createItem();
                ul.appendChild(menuItem);
            }
        }
        else{
            for(var i = 0;i<this.menuItems.length;i++){
                var configItem = this.menuItems[i];
                var menuItem = new MenuItem(configItem);
                ul.appendChild(menuItem.createItem());
            }
        }
    }else if(this.jsonItems.length>0){
        for(var i = 0;i<this.jsonItems.length;i++){
            var configItem = this.jsonItems[i];
            var menuItem = new MenuItem(configItem);
            ul.appendChild(menuItem.createItem());
        }
        
    }
    return ul;
}
