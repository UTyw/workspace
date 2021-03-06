$(document).ready(function(){
    var cache = {};
    $("#search_key").autocomplete({
        minLength: 1,
        //source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
	source: function(request, response){
            var cache = {};
            var KeywordSet = [];
            var term = $.ui.autocomplete.escapeRegex(request.term);
            if(term in cache){
                response(cache[term]);
                return;
            }
            $.getJSON("/api/autocomplete", {"keywords": term}, function(data, status, xhr){
                cache[term] = data;
                response(data);
            })
        }
    });
});
