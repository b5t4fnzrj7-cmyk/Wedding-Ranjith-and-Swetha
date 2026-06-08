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

// Music failsafe for mobile
$(document).on('click', function(){
    var audio = document.getElementById("my_audio");
    if(audio && audio.paused) {
        audio.play().catch(function(e){});
    }
});

// Countdown Timer
var countDownDate = new Date("July 04, 2026 07:00:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    var timeDiv = document.getElementById("time");
    if(timeDiv) {
        timeDiv.innerHTML = "<div class='container'><div class='days block'>"+ days + "<br>Days</div>" + "<div class='hours block'>" + hours + "<br>Hours</div>" + "<div class='minutes block'>" + minutes + "<br>Minutes</div>" + "<div class='seconds block'>" + seconds + "<br>Seconds</div></div>";
        if (distance < 0) {
            clearInterval(x);
            timeDiv.innerHTML = "Bless the married couple for happy life!";
        }
    }
}, 1000);

// --- Welcome Gate Logic & Email Tracking ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    
    // Safety check
    if (!form) return; 

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page from refreshing

        // Capture the name
        const guestNameInput = document.getElementById("guestName");
        const guestName = guestNameInput ? guestNameInput.value : "Guest";

        const formData = new FormData(form);
        formData.append("access_key", "d6bef30c-04a3-4386-ac6a-d640e06ec961");
        formData.append("subject", "Wedding Invitation Viewed!");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Opening...";
        submitBtn.disabled = true;

        // Function to unlock the invitation 
        const unlockInvitation = () => {
            const gate = document.getElementById("welcome-gate");
            if (gate) gate.style.display = "none";

            var audio = document.getElementById("my_audio");
            if(audio) {
                audio.play().catch(function(error) {
                    console.log("Audio play prevented by browser.");
                });
            }

            if (typeof swal === "function") {
                swal("Welcome " + guestName + "!", "Chalicheemala Family warmly welcomes you to the celebration!", "success", {
                    button: "Enter",
                    icon: "./assets/img/welcome.jpg",
                });
            }
        };

        // Send Email + Unlock Gate
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            // Unlocks the gate!
            unlockInvitation(); 

        } catch (error) {
            // Unlocks the gate even if ad-blocker stops the email!
            unlockInvitation();
        }
    });
});
