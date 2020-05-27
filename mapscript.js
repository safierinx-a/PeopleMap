

d3.csv("PeopleMap.csv") // Load in csv
  .then(function(data){
      data.forEach(function(d) {
        d.latitude = +d.latitude;       //Convert the latitude, longitude and number of views to numeric formats
        d.longitude = +d.longitude;
        d["Number of Views"] = +d["Number of Views"];
      });
      console.log(data[0]); 
    const markers = [...Array(data.length)].map((_, i) => i); // Initialize array coordinates to be plotted
    const mags = [...Array(data.length)].map((_, i) => i); // Initialize array for radius sizes to be plotted

    for (let i = 0; i < data.length; i++) {
        markers[i] = [data[i]['latitude'], data[i]['longitude']];
        mags[i] = data[i]['Number of Views'];   
    }
    console.log(markers[0])
    const max = Math.max(...mags);
    const min = Math.min(...mags);

    console.log(max);
    console.log(min);
    for (let i = 0; i < mags.length; i++) {
        mags[i] = 10*mags[i]/max;  //Scale the views into a relevant radius size
        
    }
    console.log(mags);
    var mymap = L //Initialize map
  .map('mapid', {
        zoomDelta: 0.25,
        zoomSnap: 0})
  .setView(markers[0], 5.25);
  
mymap.createPane('labels');
mymap.getPane('labels').style.zIndex = 650;
mymap.getPane('labels').style.pointerEvents = 'none';


// Add a tile to the map 
var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(mymap);


//Make circle markers
for (let i = 0; i < markers.length; i++) {
    var circle = L.circleMarker(markers[i], {
        color: "#42d86f",
        fillColor: "##42d86f",
        fillOpacity: .5,
        radius: mags[i]
    }).addTo(mymap);    
}
//Add Person name in bold and city name underneath
var marker = []
for (let i = 0; i < markers.length; i++) {
    str1 =  "'<span style='color:white'  class='my-div-span'><b>";
    str2 = data[i]['Person'];
    str3 = "</b> <br> ";
    str4 = data[i]['City'];
    str5 = "</span>'";
    str1 = str1.concat(str2, str3, str4, str5);
    marker[i] = L.marker(markers[i], {
        
        icon: L.divIcon({
            iconSize: [100,50],
            bgPos: [0,0],
            className: 'text-labels',   // Set class for CSS styling
            html: str1
            
        }),
        zIndexOffset: 1000     // Make appear above other map features
    });

    marker[i].bindPopup(data[i]['Description']);
    /*
    marker[i].on('mouseover', function(event){
        marker[i].openPopup();
      });
    marker[i].on('mouseout', function(event){
    marker[i].closePopup();
    });
    */
    }

//Make function to add the lesser view markers when zoom is increased so as to not clutter the map when it is zoomed out.
mymap.on('zoomend' , function (e) {
    console.log(mymap.getZoom())
    var geo = mymap.getCenter();                
    //console.log(mymap.getZoom());
    if (mymap.getZoom()>6.5)
    { for (let i = 0; i < marker.length; i++) {
        if(mags[i]>.00001){
        marker[i].addTo(mymap)}
        else{
            marker[i].remove(mymap)
        }
    }    
    }
    else if (mymap.getZoom()>6.5)
    { for (let i = 0; i < marker.length; i++) {
        if(mags[i]>.0001){
        marker[i].addTo(mymap)}
        else{
            marker[i].remove(mymap)
        }
    }    
    }
    if (mymap.getZoom()>6.25)
    { for (let i = 0; i < marker.length; i++) {
        if(mags[i]>.001){
        marker[i].addTo(mymap)}
        else{
            marker[i].remove(mymap)
        }
    }    
    }
    else if (mymap.getZoom()>5.75)
    { for (let i = 0; i < marker.length; i++) {
        if(mags[i]>.001){
        marker[i].addTo(mymap)}
        else{
            marker[i].remove(mymap)
        }
    }    
    }
    else if (mymap.getZoom>5.5) {
        for (let i = 0; i < marker.length; i++) {
            if(mags[i]>0.1){
            marker[i].addTo(mymap)}
            else{
                marker[i].remove(mymap)
            }
    }
}
    else if (mymap.getZoom>5) {
        for (let i = 0; i < marker.length; i++) {
            if(mags[i]>1){
            marker[i].addTo(mymap)}
            else{
                marker[i].remove(mymap)
            }
    }
}
else if (mymap.getZoom>4.75) {
    for (let i = 0; i < marker.length; i++) {
        if(mags[i]>5){
        marker[i].addTo(mymap)}
        else{
            marker[i].remove(mymap)
        }
}
}
    else {
        for (let i = 0; i < marker.length; i++) {
            if(mags[i]>10){
            marker[i].addTo(mymap)}
            else{
                marker[i].remove(mymap)
            }
    }
}});




      


});
