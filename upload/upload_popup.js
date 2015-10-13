var _marker = 0;
var _map;
var austin = {lat: 30.25, lng: -97.75}

function showLocation(location){ // show the location of current Marker
   $("#geo_location").value = location.toString();
    //use getPosition().lat() and getPosition().lng() to get location in degrees
}

function renderUrl(url){
    var divloader = document.querySelector("#loader");
    divloader.style.display = "none";
    var divoutput = document.querySelector("#output");
    divoutput.style.display = "block";
    var divurl = document.querySelector("#url");
    var urltext = (url.length<45) ? url: url.substr(0,42) + "...";
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.innerText = urltext;
    anchor.id = "imageLinkUrl";
    divurl.innerHTML += "URL: ";
    divurl.appendChild(anchor);
}

function renderThumbnail(url){
    var canvas = document.querySelector("#thumbnail");
    var context = canvas.getContext("2d");
    canvas.height = 200;
    canvas.width = 200;
    var image = new Image();
    image.addEventListener('load', function(){
        var src_w = image.width;
        var src_h = image.height;
        var new_w = canvas.width;
        var new_h = canvas. height;
        var ratio = src_w / src_h;
        if (src_w > src_h){
            new_h /=ratio;
        }else{
            new_w *= ratio;
        }
        canvas.width = new_w;
        canvas.height = new_h;
        context.drawImage(image, 0, 0, src_w, src_h, 0, 0, new_w, new_h);
    });
    image.src = url;
}

document.addEventListener("DOMContentLoaded", function(){
    var imageUrl = window.location.hash.substring(1);
    if (imageUrl){
        renderUrl(imageUrl);
        renderThumbnail(imageUrl);
        //resizeWindow();
    }
});

$(document).ready(function(){
    console.log("Page ready");
    var cache = {};
    $("#stream_name").autocomplete({
        minLength: 1,
        source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
	    /*source: function(request, response){
            var cache = {};
            var KeywordSet = [];
            var term = $.ui.autocomplete.escapeRegex(request.term);
            console.log(term);
            if(term in cache){
                response(cache[term]);
                return;
            }
            $.getJSON("/api/autocomplete", {"keywords": term}, function(data, status, xhr){
                cache[term] = data;
                response(data);
            })
        }*/
    });
    $("#upload_form").on("submit", function(e){
        e.preventDefault();
        var imageUrl = $("#imageLinkUrl").attr("href");
        console.log("Submit image url: "+imageUrl);
        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data: {"imageUrl": imageUrl,
                   "geoLocation": [0,0] },
            success: function(data){
                alert("Success");
            }
        });
    });
    $("#map_canvas").gmap({
            zoom: 10,
            center: austin,
            mapTypeId: google.maps.MapTypeId.TERRAN
        }).bind('init', function(event, map){
            _map = map;
            console.log("Bind functions to map");
            _marker = 0;
            var myMarker = new google.maps.Marker({
                position: new google.maps.LatLng(37.661932, -94.306856),
                map: map,
            });
            $(map).click(function(e){
                $("#map_canvas").gmap('addMarker', {
                        'position': new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                        'draggable': true,
                        'map': map
                    }, function(map, marker){
                        _marker = marker;
                        console.log("New Marker generated");
                    }).dragend(function(evnt){
                        console.log("Marker dragged");
                        $(map).setCenter(evnt.latLng);
                        showLocation(evnt.latLng);
                    });
            });
        }); // end of adding gmap
}); // end of ready()

