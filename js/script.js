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

// --- NEW ELEGANT COUNTDOWN TIMER ---
var countDownDate = new Date("July 04, 2026 07:00:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Formatting numbers to always have two digits (e.g., 01 instead of 1)
    var d = days < 10 ? "0" + days : days;
    var h = hours < 10 ? "0" + hours : hours;
    var m = minutes < 10 ? "0" + minutes : minutes;
    var s = seconds < 10 ? "0" + seconds : seconds;
    
    var timeDiv = document.getElementById("time");
    if(timeDiv) {
        timeDiv.innerHTML = `
            <h3>Counting Down To The Big Day</h3>
            <div class='countdown-wrapper'>
                <div class='time-box'><span class='num'>${d}</span><span class='label'>Days</span></div>
                <div class='time-box'><span class='num'>${h}</span><span class='label'>Hours</span></div>
                <div class='time-box'><span class='num'>${m}</span><span class='label'>Mins</span></div>
                <div class='time-box'><span class='num'>${s}</span><span class='label'>Secs</span></div>
            </div>
        `;
        if (distance < 0) {
            clearInterval(x);
            timeDiv.innerHTML = "<h3 style='color: white;'>Bless the married couple for a happy life!</h3>";
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
