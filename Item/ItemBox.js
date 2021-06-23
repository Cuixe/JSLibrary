/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ItemBox(config){
    this.base = Item;
    this.base(config);
}
ItemBox.prototype.getItem = function(){
    var divItem = document.createElement('div');
    divItem.setAttribute('id', this.id+'Div');
    var item = this.constructor.prototype.getItem();
    
    
}
