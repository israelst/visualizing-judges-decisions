var d3 = require('d3'),
    hist = require('./hist').hist;

window.addEventListener('load', function(){
    document.forms.search.addEventListener('submit', function(event){
        event.preventDefault();
        document.getElementById('histogram').innerHTML = '';
        d3.json('where-is?q=' + this.q.value, hist);
    });
});
