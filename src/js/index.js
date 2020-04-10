fetch("src/data/data.json")
    .then(e => e.json())
    .then(json => {
        let gameName = document.createElement("h1");
            //image = document.createElement("img");

        gameName.innerHTML = json.gameName;
        //image.setAttribute("src", "./src/images/sql magic.jpg");

        document.body.insertBefore(gameName, document.body.firstChild);
        //document.body.appendChild(image);
    });
