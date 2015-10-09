$(document).ready(function(){
    var cache = {};
    $("#search_key").autocomplete({
        minLength: 1,
        source: function(request, response){
            var term = request.term;
            if (term in cache){
                response(cache[term]);
                return;
            }
            $.getJSON("/api/autocomplete", request, function(data, status, xhr){
                cache[term] = data;
                response(data);
            });
        },
    });
});