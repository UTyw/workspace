$(document).ready(function(){
    var cache = {};
    $("#search_key").autocomplete({
        minLength: 1,
        source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
    });
});
