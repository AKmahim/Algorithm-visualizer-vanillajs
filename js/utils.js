// utils
//get the random number inbetween a range min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


//sleep the animation for certain time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//disable for the input field
function setInactiveInteractions(active) {
    document.getElementById('dataset-size').disabled = active
    document.getElementById('search-number').disabled = active
    document.getElementById('generate-array').disabled = active
    document.getElementById('linear-search').disabled = active
    // document.getElementById('binary-search').disabled = active
    document.getElementById('bubble-sort').disabled = active
    document.getElementById('selection-sort').disabled = active
}

function enableInteractions() {
    setInactiveInteractions(false)
}

function disableInteractions() {
    setInactiveInteractions(true)
}

function toast(type, desc) {
    let toast = document.getElementById("toast")
    let toastDesc = document.getElementById("toast-desc")
    let toastIcon = document.getElementById("toast-icon")
    
    toast.className = "show";
    toastDesc.innerText = desc
    toastIcon.className = type === 'success' ? 'fa fa-2x fa-check-circle' : 'fa fa-2x fa-exclamation-circle'
    toastIcon.style.color = type === 'success' ? '#d0f0c0' : '#e32636'

    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 5000);
}






export { getRandomNumber,sleep,setInactiveInteractions,enableInteractions,disableInteractions,toast };