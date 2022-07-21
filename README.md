# The URL shortener

This is the source code for the APIs one needs to make a basic URL shortener with the basic functionality put up. The Following code has APIs which can be very easily implemented. The API takes the input of the URL one is trying to shorten, and scraped all the tags of the Opengraph protocol [The Open Graph Protocol](https://ogp.me).

The link of the demo is Here as follows. 
[Demo Link](https://www.youtube.com/watch?v=FpW_cyR7YHI)


The following image shows us the embed of a shortened link. (Made from a Live AWS test-server). The link in the text would redirect to this song in [YouTube](https://www.youtube.com). [Song Link](https://www.youtube.com/watch?v=_vktceH8ZA0)


![Image of the Embed](https://raw.githubusercontent.com/siddik11803-IIITH/URL-Shortener/main/Embed.png)

The project is done in MERN stack. 

Instructions to use:
1. Clone The repository into a folder
2. Check into that folder and give the following command
    ```npm i```
3. Then 
   ```npm start```
4. Then With the help of POSTMAN, or some applications, make the appropriate requests like this. 
   1. POST request with ```{full: <URL>}``` as the body
      - This would return the shortened code and the message of how the process went
   2. GET request with ```{full: <URL>}``` as the URL parameters
      - This would return the short code of the message of how the process went
   3. Then go to the browser ...
      1. Give ```<server>:4000/<short_code>``` as the input in the URL bar.
5. You will then be directed to the initial site.
