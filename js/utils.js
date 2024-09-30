// utils
//get the random number inbetween a range min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//sleep the animation for certain time
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//disable for the input field
function setInactiveInteractions(active) {
    document.getElementById("dataset-size").disabled = active;
    document.getElementById("search-number").disabled = active;
    document.getElementById("generate-array").disabled = active;
    document.getElementById("linear-search").disabled = active;
    document.getElementById("binary-search").disabled = active;
    document.getElementById("bubble-sort").disabled = active;
    document.getElementById("selection-sort").disabled = active;
    document.getElementById("insertion-sort").disabled = active;
    document.getElementById("merge-sort").disabled = active;
    document.getElementById("quick-sort").disabled = active;
}

function enableInteractions() {
    setInactiveInteractions(false);
}

function disableInteractions() {
    setInactiveInteractions(true);
}

function toast(type, desc) {
    let toast = document.getElementById("toast");
    let toastDesc = document.getElementById("toast-desc");
    let toastIcon = document.getElementById("toast-icon");

    toast.className = "show";
    toastDesc.innerText = desc;
    toastIcon.className =
        type === "success"
            ? "fa fa-2x fa-check-circle"
            : "fa fa-2x fa-exclamation-circle";
    toastIcon.style.color = type === "success" ? "#d0f0c0" : "#e32636";

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}

// get result value
function result(desc, time) {
    let container = document.getElementById("result-container")
    let result = document.getElementById("result");
    let executionTime = document.getElementById("execution-time");
    result.className ="show";
    result.className = "show";
    result.innerText = desc;
    executionTime.className = "show";
    executionTime.innerText = `Execution Time: ${time} seconds`;
}

// get the current time
function getCurrentTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Optional: Pad minutes and seconds with a leading zero if less than 10
    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${paddedMinutes}:${paddedSeconds}`;
}

// convert time to seconds
function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
}

// calculate time difference between two times in seconds
function calculateTimeDifference(startTime, endTime) {
    const startInSeconds = timeToSeconds(startTime); // Convert start time to seconds
    const endInSeconds = timeToSeconds(endTime); // Convert end time to seconds

    // Calculate the difference (end time - start time)
    const differenceInSeconds = endInSeconds - startInSeconds;

    // Return the absolute difference in seconds
    return Math.abs(differenceInSeconds);
}

export {
    getRandomNumber,
    sleep,
    setInactiveInteractions,
    enableInteractions,
    disableInteractions,
    toast,
    result,
    getCurrentTime,
    calculateTimeDifference,
};
