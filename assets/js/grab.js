async function grabBounty() {
    // Get the current URL then validate it 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentUrl = tabs[0].url;
        console.log("Current URL: " + currentUrl);

        var regex = /^https:\/\/hackerone\.com\/reports\/\d+$/;
        if (regex.test(currentUrl)) {
            var jsonUrl = `${currentUrl}.json`;
            fetch(jsonUrl, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.hasOwnProperty("bounty_amount")) {
                    console.log(data.bounty_amount);
                    document.getElementById("bounty").innerHTML = `Bounty amount: ${data.bounty_amount} USD`;
                    document.getElementById("reporter").innerHTML = `Reporter: <a href="https://hackerone.com/${data.reporter.username}" target="_blank">${data.reporter.username}</a>`;
                    // document.getElementById("title").innerHTML = data.title;
                } else {
                    document.getElementById("error").innerHTML = "There was no bounty rewarded for this report";
                }
            }).catch(error => {
                document.getElementById("error").innerHTML = "An error occured requesting hackerone api";
            })
        } else {
            // console.log("Not a valid report URL")
            document.getElementById("error").innerHTML = "You're not inside of a hackerone report";
        }
    });
}

grabBounty()