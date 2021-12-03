# Weather web
Create a web application that showing the weather at where user want to check.

1. With a input field letting user can input location (ex: Taipei, Tokyo, London).
2. After enter location, getting 5 days forecast from open API.
3. Rendering forecast data with charts: 
    
    Max temperature (bar chart)
    
    Min temperature (bar chart)
    
    Humidity (pie chart)

## Development

```
yarn install
yarn start
```

* use browser extensions to skip CORS problem during developing Moesif Orign & CORS Changer
* use http://localhost:3000 without 127.0.0.1:3000 because imgur.com(image)  will not work

<div style="text-align:center;display:flex;">

   <img style="flex:1; padding: 0.25rem" src="https://i.imgur.com/E3sMyWf.jpg" width="48%" alt="index image"/>
   <img style="flex:1; padding: 0.25rem" src="https://i.imgur.com/mharA22.jpg" width="48%" alt="index sreach location"/>
   
</div>

* Search using ENTER or click Search Icon
* 8 background pictures will be replaced according to the time

## Desktop and Mobile View

<div style="text-align:center;display:flex;">

   <img style="flex:1; padding: 0.25rem" src="https://imgur.com/yJ4HiEI.jpg" width="48%" alt="index image"/>
   <img style="flex:1; padding: 0.25rem" src="https://imgur.com/jmKXwKu.jpg" width="48%" alt="index sreach location"/>
   
</div>



<div style="text-align:center;display:flex;">

   <img style="flex:1; padding: 0.25rem" src="https://imgur.com/i8FbpfY.jpg" width="48%" alt="index image"/>
   <img style="flex:1; padding: 0.25rem" src="https://imgur.com/6tVx8p3.jpg" width="48%" alt="index sreach location"/>
   
</div>

* canvas size update requires a new search after clicking on the area weather
* canvas bar chart temperature is animated (floating up and down)
* canvas pie chart chart in the desktop and mobile of the screen layout is a little different