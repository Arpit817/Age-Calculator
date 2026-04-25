document.addEventListener('DOMContentLoaded', () => {
    const currDateEl = document.getElementById("currDate");
    const dateOfBirth = document.querySelector("#DOB");
    const CalcAge = document.getElementById("CalcAge");
    const displayAge = document.getElementById("displayAge");
    const resetBtn = document.getElementById("resetBtn");

    // Result elements
    const ageYears = document.getElementById("ageYears");
    const ageMonths = document.getElementById("ageMonths");
    const ageDays = document.getElementById("ageDays");
    const zodiacSign = document.getElementById("zodiacSign");
    const nextBirthday = document.getElementById("nextBirthday");

    // Set today's date and constrain max date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currDateEl.innerText = `Today: ${today.toLocaleDateString('en-US', options)}`;
    
    // Prevent selecting future dates
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateOfBirth.max = `${yyyy}-${mm}-${dd}`;

    function getZodiacSign(day, month) {
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒";
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces ♓";
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn ♑";
        return "--";
    }

    CalcAge.addEventListener("click", () => {
        if (!dateOfBirth.value) {
            alert("Please select a valid date of birth.");
            return;
        }

        const birthDate = new Date(dateOfBirth.value);
        if (birthDate > today) {
            alert("Date of birth cannot be in the future!");
            return;
        }

        // Calculate detailed age
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate next birthday
        let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), Math.max(1, birthDate.getDate()));
        // Handling leap year edge case: if leap yr and feb 29
        if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && nextBday.getMonth() !== 1) {
            nextBday = new Date(today.getFullYear(), 2, 1);
        }
        
        if (today > nextBday && (today.getMonth() !== nextBday.getMonth() || today.getDate() !== nextBday.getDate())) {
            nextBday.setFullYear(today.getFullYear() + 1);
        }

        let bdayMonths = nextBday.getMonth() - today.getMonth();
        let bdayDays = nextBday.getDate() - today.getDate();

        if (bdayDays < 0) {
            bdayMonths--;
            const prevMonth = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
            bdayDays += prevMonth.getDate();
        }
        if (bdayMonths < 0) {
            bdayMonths += 12;
        }

        let nextBdayText = "";
        if (bdayMonths === 0 && bdayDays === 0) {
            nextBdayText = "It's your birthday! 🎂";
        } else {
            nextBdayText = `${bdayMonths} months, ${bdayDays} days`;
        }

        // Generate animation counters
        animateValue(ageYears, 0, years, 1000);
        animateValue(ageMonths, 0, months, 1000);
        animateValue(ageDays, 0, days, 1000);

        zodiacSign.innerText = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
        nextBirthday.innerText = nextBdayText;

        displayAge.classList.remove("hidden");
    });

    dateOfBirth.addEventListener("input", () => {
        displayAge.classList.add("hidden");
    });

    resetBtn.addEventListener("click", () => {
        dateOfBirth.value = "";
        displayAge.classList.add("hidden");
    });

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
