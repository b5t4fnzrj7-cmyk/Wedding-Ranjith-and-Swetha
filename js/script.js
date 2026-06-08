(function ($) {
    "use strict";
      $('.sakura-falling').sakura('start', {
        className: 'sakura',
        fallSpeed: 2.5,
        maxSize: 30,
        minSize: 9,
        newOn: 100,
        
    });
})(jQuery);

$(document).on('click', function(){
    document.getElementById("my_audio").play();
});

var countDownDate = new Date("July 04, 2026 07:00:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("time").innerHTML = "<div class='container'><div class='days block'>"+ days + "<br>Days</div>" + "<div class='hours block'>" + hours + "<br>Hours</div>" + "<div class='minutes block'>" + minutes + "<br>Minutes</div>" + "<div class='seconds block'>" + seconds + "<br>Seconds</div></div>";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").innerHTML = "Bless the married couple for happy life!";
    }
}, 1000);

var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 4px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 2px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles1 = [
    'color: #FF6C37'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles2 = [
    'color: teal'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

console.log('\n\n%c SAVE THE DATE: 4th July, 2026!', styles);

console.log('%cYour presence is requested!%c\n\nRegards: Ranjith Chalicheemala', styles1, styles2);

console.log(
    `%c come to the wedding!\n\n`,
    'color: yellow; background:tomato; font-size: 24pt; font-weight: bold',
)

// --- Welcome Gate Logic & Email Tracking ---
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capture the name for our Welcome popup
    const guestName = document.getElementById("guestName").value;

    const formData = new FormData(form);
    formData.append("access_key", "d6bef30c-04a3-4386-ac6a-d640e06ec961");
    formData.append("subject", "Wedding Invitation Viewed!"); // Tells you what the email is about

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Opening...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            // --- INVITATION UNLOCK LOGIC ---
            
            // 1. Hide the Welcome Gate
            document.getElementById("welcome-gate").style.display = "none";

            // 2. Play the background music automatically
            var audio = document.getElementById("my_audio");
            if(audio) {
                audio.play().catch(function(error) {
                    console.log("Audio play prevented by browser.");
                });
            }

            // 3. Trigger the personalized Welcome Popup
            if (typeof swal === "function") {
                swal("Welcome " + guestName + "!", "Chalicheemala Family warmly welcomes you to the celebration!", "success", {
                    button: "Enter",
                    icon: "./assets/img/welcome.jpg",
                });
            }

        } else {
            alert("Error: " + data.message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }

    } catch (error) {
        alert("Something went wrong. Please check your connection and try again.");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

    // 4. Send the name to your email silently in the background
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "d6bef30c-04a3-4386-ac6a-d640e06ec961", // <-- DO NOT FORGET TO PUT YOUR KEY BACK HERE
            subject: "Wedding Invitation Viewed!",
            from_name: "Wedding Website",
            message: guestName + " has just opened and viewed your wedding invitation!"
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tracking sent.");
    })
    .catch(error => {
        console.log("Tracking failed.", error);
    });
}
