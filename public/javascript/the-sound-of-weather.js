$(document).on('ready', function(){

    // init up soundcloud
    SC.initialize({
        client_id: '63a8bfefff63b0f9386d4a03184c3b94'
    });

    //sound manager setup
    soundManager.setup({
        url: '/path/to/swf-files/',
        flashVersion: 9, // optional: shiny features (default = 8)
        // optional: ignore Flash where possible, use 100% HTML5 mode
        // preferFlash: false,
        onready: function() {
            // Ready to use; soundManager.createSound() etc. can now be called.
        }
    });

    // set url for wunderground
    var wu_url = "http://api.wunderground.com/api/bebaf6d06e2bf9b4/geolookup/conditions/q/"; // state/city.json OR city.json
    var sc_url_header = "http://api.soundcloud.com/tracks";
    //var sc_url_client_id = "
    //file://api.soundcloud.com/tracks?q=buskers&license=cc-by-sa&client_id=63a8bfefff63b0f9386d4a03184c3b94&format=json&_status_code_map[302]=200

    $("#btn-load").click(function() {
        var city = $("#query-field").val() + '.json';
        //console.log(city);
        $.ajax({
            url: wu_url + city,
            type: 'get',
            dataType: 'jsonp',
            success: function(response){
                // need an if statement to deal with the case where a city searc
                // has 2 results
                var weather = response.current_observation.weather;
                // create a query string based on the weather type
                // should try and implement this better
                // ie. create an external method?
                //weather = weather.toLowerCase;
                console.log(weather.indexOf("Cloud"))
                var query_str = "";
                if(weather.indexOf("Cloud") !== -1){
                    query_str += "calm ";
                    console.log(query_str);
                }
                if(weather.indexOf("Rain") !== -1){
                    query_str += "sad ";
                }
                if(weather.indexOf("Sun") !== -1){
                    query_str += "upbeat ";
                }
                query_str += "instrumental"

                $.ajax({
                    url: sc_url_header,
                    type: 'get',
                    //dataType: 'jsonp',
                    data: {
                        q: query_str,
                        client_id: "63a8bfefff63b0f9386d4a03184c3b94",
                        format: "json",
                    },
                    success: function(response){
                        // need an if statement to deal with the case where a city searc
                        // has 2 results
                        console.log(response);
                        console.log(response[0].stream_url);
                        SC.stream(response[0].stream_url, function(sound){
                            sound.play();
                        });
                    },
                    error: function(){
                        console.log("error");
                    }
                });
            },
            error: function(){
                console.log("error");
            }
        });


        /*
        $.ajax({
            url: sc_url_header,
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: "upbeat instrumental",
                client_id: "63a8bfefff63b0f9386d4a03184c3b94",
                format: "json",
            },
            success: function(response){
                // need an if statement to deal with the case where a city searc
                // has 2 results
                //var weather = response.current_observation.weather;
                console.log(response);
            },
            error: function(){
                console.log("error");
            }
        });
        */
    });



    // find all sounds of buskers licensed under 'creative commons share alike'
    /*
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', { q: 'buskers', license: 'cc-by-sa' }, function(tracks) {
        console.log(tracks);
    });
    */
});