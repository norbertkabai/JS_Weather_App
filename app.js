window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //Get info from the api
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/907d9d08ad79c35c6840e334b7e64d69/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    // Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(celsius);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Set Icon
                    setIcon(icon, document.querySelector(".icon"));
                    //Change from F to C° and vice-versa
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "C°";
                            temperatureDegree.style.fontSize = "50px";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.style.fontSize = "40px";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }
    //Set icons with skycons, function requires an icon and the id of the html tag where we want to put it
    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // The icon in the api contains "-" and we need "_", so we replace them.
        skycons.play();
        skycons.set(iconID, Skycons[currentIcon]);
    }
});
