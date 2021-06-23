function Timer(){
    this.id = 'Timer' + random();
    this.name = 'Timer' + random();
    this.nameDays = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    this.nameMounts = ["Enero","Febreo","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.label = 'México D.F. a ';
    this.separator = 'de';
    this.inteval = 1000;
}

Timer.prototype.createItem = function(){
    if(document.getElementById(this.id)){
        var parent = document.getElementById(this.id);
        while(parent.firstChild)
            parent.removeChild(parent.firstChild);
    }
    var div = document.createElement('div');
    div.id=this.id;
    var time = new Date();
    var fecha = this.label + ' ' + time.getDate() + ' ' + this.separator + ' ' + this.nameMounts[time.getMonth()] + ' ' + this.separator + ' ' + time.getFullYear();
    div.appendChild(document.createTextNode(fecha));
    return div;
}

Timer.prototype.render = function(content){
    document.getElementById(content).appendChild(this.createItem());
}

Timer.prototype.clone = function(){
    var newObject = new Timer();
    var keys = [];
    for (var property in this)
      keys.push(property);
    var i;
    for(i = 0;i<keys.length;i++)
        newObject[keys[i]] = this[keys[i]];
    return newObject;
}
