// console.log('helo');
import { getRandomNumber, sleep, setInactiveInteractions, enableInteractions, disableInteractions, toast } from './utils.js';
import  getLinearSearchAnimations  from './linearSearch.js';
import  getBubbleSortAnimations  from './bubbleSort.js';
import  getSelectionSortAnimations  from './selectionSort.js';
import getBinarySearchAnimations from './binarySearch.js';

// Rest of your code...

// constants
const BG_COLOR = '#b978ec'
const COMPARE_COLOR = '#a9d8f6'
const FOUND_COLOR = 'green'
const SELECT_COLOR = 'red'

let datasetSize, searchNumber, array = [];


function handleDatasetSizeChange() {
    console.log(document.getElementById('dataset-size').value);
    
    datasetSize = Number(document.getElementById('dataset-size').value)
    // datasetSize = 15;
    if (!datasetSize || datasetSize < 5) {
        toast('fail', 'Dataset size must be minimum 5')
        document.getElementById('dataset-size').focus()
        datasetSize = null
        return
    }
}

function handleSearchNumberChange() {
    searchNumber = Number(document.getElementById('search-number').value) >= 5 ? Number(document.getElementById('search-number').value) : 5
    document.getElementById('search-number').value = searchNumber
}

function generateArray() {
    if (!datasetSize || datasetSize < 5) {
        toast('fail', 'Input dataset size must be minimum 5')
        document.getElementById('dataset-size').focus()
        return
    }
    let lineContainerElement = document.getElementById('lines-container')

    // Remove Present Children
    let child = lineContainerElement.lastElementChild;  
    while (child) { 
        lineContainerElement.removeChild(child); 
        child = lineContainerElement.lastElementChild; 
    }
    array = []

    // Add new Children
    for (let i = 0; i < datasetSize; ++i) {
        let randomNumber = getRandomNumber(5, 500)
        array.push(randomNumber)

        let lineElement = document.createElement('div')
        lineElement.className = "bar"
        lineElement.style.height = randomNumber + 'px'
        lineElement.innerText = randomNumber
        lineElement.style.textAlign = 'center'
        lineElement.style.width = '50px'
        lineElement.style.paddingBottom = '10px'
        
        lineContainerElement.appendChild(lineElement)
    }
}

// =================================== linear search =========================
async function doLinearSearch() {
    if (!searchNumber) {
        toast('fail', 'Enter search number >= 5!')
        document.getElementById('search-number').focus()
        return
    }

    if (!array.length) {
        toast('fail', 'Generate Array')
        document.getElementById('generate-array').focus()
        return
    }

    disableInteractions()

    let animationArr = getLinearSearchAnimations(searchNumber, [...array])
    let lineContainerChildElements = Array.from(document.getElementById('lines-container').children)
    let previous
    for (let i = 0; i < animationArr.length; ++i) {
        let animation = animationArr[i]
        await sleep(500)
        
        if (Number.isInteger(previous)) {
            lineContainerChildElements[previous].style.backgroundColor = BG_COLOR
        }

        if (animation.found === true) {
            lineContainerChildElements[animation.pos].style.backgroundColor = FOUND_COLOR
            toast('success', 'Found on position: ' + animation.pos)
            break
        } else if (animation.found === false) {
            lineContainerChildElements[animation.pos].style.backgroundColor = BG_COLOR
            toast('fail', 'Not found')
            enableInteractions()
            break
        } else {
            lineContainerChildElements[animation.pos].style.backgroundColor = SELECT_COLOR
            previous = animation.pos
        }
    }

    enableInteractions()
}

// ======================================= binary search ================================
async function doBinarySearch() {
    if (!searchNumber) {
        toast('fail', 'Enter search number!')
        document.getElementById('search-number').focus()
        return
    }

    if (!array.length) {
        toast('fail', 'Generate Array!')
        document.getElementById('generate-array').focus()
        return
    }

    disableInteractions()

    let lineContainerChildElements = Array.from(document.getElementById('lines-container').children).slice()
    
    // Sort array and dom elements before performing binary search
    array.sort((a, b) => a - b)
    lineContainerChildElements.sort((a, b) => parseInt(a.style.height) - parseInt(b.style.height))

    let lineContainerElement = document.getElementById('lines-container')

    // Remove Present Children
    let child = lineContainerElement.lastElementChild;
    while (child) { 
        lineContainerElement.removeChild(child); 
        child = lineContainerElement.lastElementChild; 
    }

    // Append the sorted childs
    for (let i = 0; i < array.length; ++i) {
        let lineElement = document.createElement('div')
        lineElement.className = "bar"
        lineElement.style.height = array[i] + 'px'
        lineElement.innerText = array[i]
        lineElement.style.paddingBottom = '10px'
        lineContainerElement.appendChild(lineElement)
    }

    await sleep(1000)

    let animationArr = getBinarySearchAnimations(searchNumber, array)
    let previous
    lineContainerChildElements = Array.from(document.getElementById('lines-container').children)

    for (let i = 0; i < animationArr.length; ++i) {
        const animation = animationArr[i]
        await sleep(1000)
        if (previous) {
            if (previous.status === 'compare') {
                lineContainerChildElements[previous.lowIndex].style.backgroundColor = BG_COLOR
                previous.highIndex >= 0 && (lineContainerChildElements[previous.highIndex].style.backgroundColor = BG_COLOR)
            } else {
                lineContainerChildElements[previous.midIndex].style.backgroundColor = BG_COLOR
            }
        }

        if (animation.status === 'found') {
            lineContainerChildElements[animation.midIndex].style.backgroundColor = FOUND_COLOR
            toast('success', 'Found at index: ' + animation.midIndex)
            break
        } else if (animation.status === 'not-found') {
            lineContainerChildElements[animation.lowIndex].style.backgroundColor = BG_COLOR
            lineContainerChildElements[animation.midIndex].style.backgroundColor = BG_COLOR
            animation.highIndex >= 0 && (lineContainerChildElements[animation.highIndex].style.backgroundColor = BG_COLOR)
            toast('fail', 'Not Found')
            break
        } else if (animation.status === 'compare') {
            lineContainerChildElements[animation.lowIndex].style.backgroundColor = COMPARE_COLOR
            animation.highIndex >= 0 && (lineContainerChildElements[animation.highIndex].style.backgroundColor = COMPARE_COLOR)
            await sleep(1000)
        } else {
            lineContainerChildElements[animation.midIndex].style.backgroundColor = SELECT_COLOR
        }

        previous = animation
    }

    enableInteractions()
}


async function doBubbleSort() {
    console.log('okay');

    if (!array.length) {
        toast('fail', 'Generate Array!');
        document.getElementById('generate-array').focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(document.getElementById('lines-container').children);
    console.log(lineContainerChildElements);

    let animationArr = getBubbleSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; ++i) {
        await sleep(500);
        if (previous) {
            lineContainerChildElements[previous.posI].style.backgroundColor = BG_COLOR;
            lineContainerChildElements[previous.posJ].style.backgroundColor = BG_COLOR;
        }
        const animation = animationArr[i];

        if (animation.status === 'compare') {
            lineContainerChildElements[animation.posI].style.backgroundColor = COMPARE_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor = COMPARE_COLOR;
        } else {
            lineContainerChildElements[animation.posI].style.backgroundColor = SELECT_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor = SELECT_COLOR;
            await sleep(300);
            
            // Swapping the heights
            const tempHeight = lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height = lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height = tempHeight;

            // Update the displayed numbers
            lineContainerChildElements[animation.posI].innerText = lineContainerChildElements[animation.posI].style.height.replace('px', '');
            lineContainerChildElements[animation.posJ].innerText = lineContainerChildElements[animation.posJ].style.height.replace('px', '');
        }

        previous = animation;
    }

    if (previous) {
        lineContainerChildElements[previous.posI].style.backgroundColor = BG_COLOR;
        lineContainerChildElements[previous.posJ].style.backgroundColor = BG_COLOR;
    }

    enableInteractions();
    toast('success', 'Finished sorting!');
}

async function doSelectionSort() {
    if (!array.length) {
        toast('fail', 'Generate Array!');
        document.getElementById('generate-array').focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(document.getElementById('lines-container').children);
    let animationArr = getSelectionSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; ++i) {
        await sleep(300);
        
        // Resetting the previous elements' colors
        if (previous) {
            Number.isInteger(previous.min) && (lineContainerChildElements[previous.min].style.backgroundColor = BG_COLOR);
            Number.isInteger(previous.j) && (lineContainerChildElements[previous.j].style.backgroundColor = BG_COLOR);
            Number.isInteger(previous.i) && (lineContainerChildElements[previous.i].style.backgroundColor = BG_COLOR);
        }
        
        const animation = animationArr[i];

        if (animation.status === 'compare') {
            // Highlighting the bars being compared
            lineContainerChildElements[animation.min].style.backgroundColor = COMPARE_COLOR;
            lineContainerChildElements[animation.j].style.backgroundColor = COMPARE_COLOR;
        } else if (animation.status === 'swap') {
            // Highlighting the bars being swapped
            lineContainerChildElements[animation.min].style.backgroundColor = SELECT_COLOR;
            lineContainerChildElements[animation.i].style.backgroundColor = SELECT_COLOR;
            await sleep(500);

            // Swap the heights
            const tempHeight = lineContainerChildElements[animation.min].style.height;
            lineContainerChildElements[animation.min].style.height = lineContainerChildElements[animation.i].style.height;
            lineContainerChildElements[animation.i].style.height = tempHeight;

            // Update the displayed numbers 
            lineContainerChildElements[animation.min].innerText = lineContainerChildElements[animation.min].style.height.replace('px', '');
            lineContainerChildElements[animation.i].innerText = lineContainerChildElements[animation.i].style.height.replace('px', '');
        } else {
            // Mark the found minimum as sorted (using FOUND_COLOR)
            lineContainerChildElements[animation.min].style.backgroundColor = FOUND_COLOR;
        }

        previous = animation;
    }

    // Reset the colors after sorting is done
    if (previous) {
        Number.isInteger(previous.min) && (lineContainerChildElements[previous.min].style.backgroundColor = BG_COLOR);
        Number.isInteger(previous.j) && (lineContainerChildElements[previous.j].style.backgroundColor = BG_COLOR);
        Number.isInteger(previous.i) && (lineContainerChildElements[previous.i].style.backgroundColor = BG_COLOR);
    }

    enableInteractions();
    toast('success', 'Finished sorting!');
}





window.handleDatasetSizeChange = handleDatasetSizeChange;
window.handleSearchNumberChange = handleSearchNumberChange;
window.generateArray = generateArray;
window.doLinearSearch = doLinearSearch;
window.doBinarySearch = doBinarySearch;
window.doBubbleSort = doBubbleSort;
window.doSelectionSort = doSelectionSort;

// document.getElementById('dataset-size').addEventListener('blur', handleDatasetSizeChange);
// document.getElementById('search-number').addEventListener('blur', handleSearchNumberChange);
// document.getElementById('generate-array').addEventListener('click', generateArray);
// document.getElementById('linear-search').addEventListener('click', doLinearSearch);
// document.getElementById('bubble-sort').addEventListener('click', doBubbleSort);
// document.getElementById('selection-sort').addEventListener('click', doSelectionSort);
