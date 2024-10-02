import {
    sleep,
    enableInteractions,
    disableInteractions,
    toast,
    result,
    getCurrentTime,
    calculateTimeDifference,
    exectuinTimesArray,
} from "./utils.js";
import getLinearSearchAnimations from "./linearSearch.js";
import getBubbleSortAnimations from "./bubbleSort.js";
import getSelectionSortAnimations from "./selectionSort.js";
import getBinarySearchAnimations from "./binarySearch.js";
import getInsertionSortAnimations from "./insertionSort.js";
import getMergeSortAnimations from "./mergeSort.js";
import getQuickSortAnimations from "./quickSort.js";

// constants
const BG_COLOR = "#b978ec";
const COMPARE_COLOR = "#a9d8f6";
const FOUND_COLOR = "green";
const SELECT_COLOR = "red";

let datasetSize,
    dataArray,
    searchNumber,
    array = [];

// store exectuin times with their execution name in a variable array
const executionTimes = [];

function handleDatasetSizeChange() {
    console.log(document.getElementById("dataset-size").value);
    let inputDataString = document.getElementById("dataset-size").value;
    // dataArray = inputDataString.split(',');

    dataArray = inputDataString
        .split(",")
        .filter((value) => !isNaN(parseFloat(value)))
        .map(parseFloat);

    console.log(typeof dataArray[0]);

    datasetSize = Number(dataArray.length);
    console.log(datasetSize);

    // datasetSize = 15;
    if (!datasetSize || datasetSize < 5) {
        toast("fail", "Dataset size must be minimum 5");
        document.getElementById("dataset-size").focus();
        datasetSize = null;
        return;
    }
}

function handleSearchNumberChange() {
    searchNumber =
        Number(document.getElementById("search-number").value) >= 5
            ? Number(document.getElementById("search-number").value)
            : 5;
    document.getElementById("search-number").value = searchNumber;
}

function generateArray() {
    if (!datasetSize || datasetSize < 5) {
        toast("fail", "Dataset size must be minimum 5");
        document.getElementById("dataset-size").focus();
        return;
    }
    document.getElementById("dataset-size").value = "";
    let lineContainerElement = document.getElementById("lines-container");

    // Remove Present Children
    let child = lineContainerElement.lastElementChild;
    while (child) {
        lineContainerElement.removeChild(child);
        child = lineContainerElement.lastElementChild;
    }
    array = [];

    console.log("datasetsize form generate array", datasetSize);
    console.log("dataArray from generate array", dataArray);

    // Add new Children
    for (let i = 0; i < datasetSize; ++i) {
        let randomNumber = dataArray[i];
        array.push(randomNumber);

        let lineElement = document.createElement("div");
        lineElement.className = "bar";
        lineElement.style.height = randomNumber + "px";
        lineElement.innerText = randomNumber;
        lineElement.style.textAlign = "center";
        lineElement.style.width = "50px";
        lineElement.style.paddingBottom = "10px";

        lineContainerElement.appendChild(lineElement);
    }
}

// =================================== linear search =========================
async function doLinearSearch() {
    const startTime = getCurrentTime();
    if (!searchNumber) {
        toast("fail", "Enter search number >= 5!");

        document.getElementById("search-number").focus();
        return;
    }

    if (!array.length) {
        toast("fail", "Generate Array");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let animationArr = getLinearSearchAnimations(searchNumber, [...array]);
    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    let previous;
    for (let i = 0; i < animationArr.length; ++i) {
        let animation = animationArr[i];
        await sleep(500);

        if (Number.isInteger(previous)) {
            lineContainerChildElements[previous].style.backgroundColor =
                BG_COLOR;
        }

        if (animation.found === true) {
            lineContainerChildElements[animation.pos].style.backgroundColor =
                FOUND_COLOR;
            // toast("success", "Found on position: " + animation.pos);
            const endTime = getCurrentTime();
            const duration = calculateTimeDifference(startTime, endTime);
            result("Found at index: " + animation.pos, duration);
            const linearSearchExecution = {
                type: "Linear Search",
                executionTime: duration,
            };
            executionTimes.push(linearSearchExecution);
            exectuinTimesArray(executionTimes);
            console.log(executionTimes);
            break;
        } else if (animation.found === false) {
            lineContainerChildElements[animation.pos].style.backgroundColor =
                BG_COLOR;
            // toast("fail", "Not found");
            const failedTime = getCurrentTime();
            const duration = calculateTimeDifference(startTime, failedTime);
            result("Not found", duration);
            const linearSearchExecution = {
                type: "Linear Search",
                executionTime: duration,
            };
            executionTimes.push(linearSearchExecution);
            exectuinTimesArray(executionTimes);
            console.log(executionTimes);
            enableInteractions();
            break;
        } else {
            lineContainerChildElements[animation.pos].style.backgroundColor =
                SELECT_COLOR;
            previous = animation.pos;
        }
    }

    enableInteractions();
}

// ======================================= binary search ================================
async function doBinarySearch() {
    const startTime = getCurrentTime();
    if (!searchNumber) {
        toast("fail", "Enter search number!");
        document.getElementById("search-number").focus();
        return;
    }

    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    ).slice();

    // Sort array and dom elements before performing binary search
    array.sort((a, b) => a - b);
    lineContainerChildElements.sort(
        (a, b) => parseInt(a.style.height) - parseInt(b.style.height)
    );

    let lineContainerElement = document.getElementById("lines-container");

    // Remove Present Children
    let child = lineContainerElement.lastElementChild;
    while (child) {
        lineContainerElement.removeChild(child);
        child = lineContainerElement.lastElementChild;
    }

    // Append the sorted childs
    for (let i = 0; i < array.length; ++i) {
        let lineElement = document.createElement("div");
        lineElement.className = "bar";
        lineElement.style.height = array[i] + "px";
        lineElement.innerText = array[i];
        lineElement.style.paddingBottom = "10px";
        lineContainerElement.appendChild(lineElement);
    }

    await sleep(1000);

    let animationArr = getBinarySearchAnimations(searchNumber, array);
    let previous;
    lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );

    for (let i = 0; i < animationArr.length; ++i) {
        const animation = animationArr[i];
        await sleep(1000);
        if (previous) {
            if (previous.status === "compare") {
                lineContainerChildElements[
                    previous.lowIndex
                ].style.backgroundColor = BG_COLOR;
                previous.highIndex >= 0 &&
                    (lineContainerChildElements[
                        previous.highIndex
                    ].style.backgroundColor = BG_COLOR);
            } else {
                lineContainerChildElements[
                    previous.midIndex
                ].style.backgroundColor = BG_COLOR;
            }
        }

        if (animation.status === "found") {
            lineContainerChildElements[
                animation.midIndex
            ].style.backgroundColor = FOUND_COLOR;
            // toast("success", "Found at index: " + animation.midIndex);
            const endTime = getCurrentTime();
            const duration = calculateTimeDifference(startTime, endTime);
            result("Found at index: " + animation.midIndex, duration);
            const binarySearchExecution = {
                type: "Binary Search",
                executionTime: duration,
            };
            executionTimes.push(binarySearchExecution);
            exectuinTimesArray(executionTimes);
            console.log(executionTimes);
            break;
        } else if (animation.status === "not-found") {
            lineContainerChildElements[
                animation.lowIndex
            ].style.backgroundColor = BG_COLOR;
            lineContainerChildElements[
                animation.midIndex
            ].style.backgroundColor = BG_COLOR;
            animation.highIndex >= 0 &&
                (lineContainerChildElements[
                    animation.highIndex
                ].style.backgroundColor = BG_COLOR);
            // toast("fail", "Not Found");
            const failedTime = getCurrentTime();
            const duration = calculateTimeDifference(startTime, failedTime);
            result("Not Found", duration);
            const binarySearchExecution = {
                type: "Binary Search",
                executionTime: duration,
            };
            executionTimes.push(binarySearchExecution);
            exectuinTimesArray(executionTimes);
            console.log(executionTimes);
            break;
        } else if (animation.status === "compare") {
            lineContainerChildElements[
                animation.lowIndex
            ].style.backgroundColor = COMPARE_COLOR;
            animation.highIndex >= 0 &&
                (lineContainerChildElements[
                    animation.highIndex
                ].style.backgroundColor = COMPARE_COLOR);
            await sleep(1000);
        } else {
            lineContainerChildElements[
                animation.midIndex
            ].style.backgroundColor = SELECT_COLOR;
        }

        previous = animation;
    }

    enableInteractions();
}

// =========================================== bubble sort ===========================
async function doBubbleSort() {
    const startTime = getCurrentTime();
    console.log("okay");

    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    // console.log(lineContainerChildElements);

    let animationArr = getBubbleSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; ++i) {
        await sleep(500);
        if (previous) {
            lineContainerChildElements[previous.posI].style.backgroundColor =
                BG_COLOR;
            lineContainerChildElements[previous.posJ].style.backgroundColor =
                BG_COLOR;
        }
        const animation = animationArr[i];

        if (animation.status === "compare") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                COMPARE_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                COMPARE_COLOR;
        } else {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                SELECT_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                SELECT_COLOR;
            await sleep(500);

            // Swapping the heights
            const tempHeight =
                lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height =
                lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height =
                tempHeight;

            // Update the displayed numbers
            lineContainerChildElements[animation.posI].innerText =
                lineContainerChildElements[animation.posI].style.height.replace(
                    "px",
                    ""
                );
            lineContainerChildElements[animation.posJ].innerText =
                lineContainerChildElements[animation.posJ].style.height.replace(
                    "px",
                    ""
                );
        }

        previous = animation;
    }

    if (previous) {
        lineContainerChildElements[previous.posI].style.backgroundColor =
            BG_COLOR;
        lineContainerChildElements[previous.posJ].style.backgroundColor =
            BG_COLOR;
    }

    enableInteractions();
    // toast("success", "Finished sorting!");
    const endTime = getCurrentTime();
    const duration = calculateTimeDifference(startTime, endTime);
    result("Finished bubble sorting!", duration);
    const bubbleSortExecution = {
        type: "Bubble Sort",
        executionTime: duration,
    };
    executionTimes.push(bubbleSortExecution);
    exectuinTimesArray(executionTimes);
    console.log(executionTimes);
}

// =========================================== selection sort ======================
async function doSelectionSort() {
    const startTime = getCurrentTime();
    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    let animationArr = getSelectionSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; ++i) {
        await sleep(500);

        // Resetting the previous elements' colors
        if (previous) {
            Number.isInteger(previous.min) &&
                (lineContainerChildElements[
                    previous.min
                ].style.backgroundColor = BG_COLOR);
            Number.isInteger(previous.j) &&
                (lineContainerChildElements[previous.j].style.backgroundColor =
                    BG_COLOR);
            Number.isInteger(previous.i) &&
                (lineContainerChildElements[previous.i].style.backgroundColor =
                    BG_COLOR);
        }

        const animation = animationArr[i];

        if (animation.status === "compare") {
            // Highlighting the bars being compared
            lineContainerChildElements[animation.min].style.backgroundColor =
                COMPARE_COLOR;
            lineContainerChildElements[animation.j].style.backgroundColor =
                COMPARE_COLOR;
        } else if (animation.status === "swap") {
            // Highlighting the bars being swapped
            lineContainerChildElements[animation.min].style.backgroundColor =
                SELECT_COLOR;
            lineContainerChildElements[animation.i].style.backgroundColor =
                SELECT_COLOR;
            await sleep(500);

            // Swap the heights
            const tempHeight =
                lineContainerChildElements[animation.min].style.height;
            lineContainerChildElements[animation.min].style.height =
                lineContainerChildElements[animation.i].style.height;
            lineContainerChildElements[animation.i].style.height = tempHeight;

            // Update the displayed numbers
            lineContainerChildElements[animation.min].innerText =
                lineContainerChildElements[animation.min].style.height.replace(
                    "px",
                    ""
                );
            lineContainerChildElements[animation.i].innerText =
                lineContainerChildElements[animation.i].style.height.replace(
                    "px",
                    ""
                );
        } else {
            // Mark the found minimum as sorted (using FOUND_COLOR)
            lineContainerChildElements[animation.min].style.backgroundColor =
                FOUND_COLOR;
        }

        previous = animation;
    }

    // Reset the colors after sorting is done
    if (previous) {
        Number.isInteger(previous.min) &&
            (lineContainerChildElements[previous.min].style.backgroundColor =
                BG_COLOR);
        Number.isInteger(previous.j) &&
            (lineContainerChildElements[previous.j].style.backgroundColor =
                BG_COLOR);
        Number.isInteger(previous.i) &&
            (lineContainerChildElements[previous.i].style.backgroundColor =
                BG_COLOR);
    }

    enableInteractions();
    // toast("success", "Finished sorting!");
    const endTime = getCurrentTime();
    const duration = calculateTimeDifference(startTime, endTime);
    result("Finished selection sorting!", duration);
    const selectionSortExecution = {
        type: "Selection Sort",
        executionTime: duration,
    };
    executionTimes.push(selectionSortExecution);
    exectuinTimesArray(executionTimes);
    console.log(executionTimes);
}

// ======================================= insertion sort ================================
async function doInsertionSort() {
    const startTime = getCurrentTime();
    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    let animationArr = getInsertionSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; ++i) {
        const animation = animationArr[i];

        // Reset previous colors
        if (previous) {
            lineContainerChildElements[previous.posI].style.backgroundColor =
                BG_COLOR;
            lineContainerChildElements[previous.posJ].style.backgroundColor =
                BG_COLOR;
        }

        // Comparison step
        if (animation.status === "compare") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                COMPARE_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                COMPARE_COLOR;
        }
        // Swap step
        else if (animation.status === "swap") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                SELECT_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                SELECT_COLOR;

            await sleep(500); // Pause before performing the swap

            // Perform the swap
            let tempHeight =
                lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height =
                lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height =
                tempHeight;

            // Update the displayed heights
            lineContainerChildElements[animation.posJ].innerText =
                lineContainerChildElements[animation.posJ].style.height.replace(
                    "px",
                    ""
                );
            lineContainerChildElements[animation.posI].innerText =
                lineContainerChildElements[animation.posI].style.height.replace(
                    "px",
                    ""
                );
        }

        previous = animation;
        await sleep(500); // Pause between steps
    }

    enableInteractions();
    // toast("success", "Insertion Sort Completed!");
    const endTime = getCurrentTime();
    const duration = calculateTimeDifference(startTime, endTime);
    result("Insertion Sort Completed!", duration);
    const insertionSortExecution = {
        type: "Insertion Sort",
        executionTime: duration,
    };
    executionTimes.push(insertionSortExecution);
    exectuinTimesArray(executionTimes);
    console.log(executionTimes);
}

// ======================================= merge sort ================================
async function doMergeSort() {
    const startTime = getCurrentTime();
    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    let animationArr = getMergeSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; i++) {
        const animation = animationArr[i];

        // Reset color from previous step if needed
        if (previous && previous.status === "compare") {
            lineContainerChildElements[previous.posI].style.backgroundColor =
                BG_COLOR;
            lineContainerChildElements[previous.posJ].style.backgroundColor =
                BG_COLOR;
        }

        // Comparison step
        if (animation.status === "compare") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                COMPARE_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                COMPARE_COLOR;
        }

        // Merging step
        else if (animation.status === "merge") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                SELECT_COLOR;

            // Apply the height change (merge step)
            await sleep(500); // Delay before applying the height change for better visualization
            lineContainerChildElements[animation.posI].style.height =
                animation.height + "px";
            lineContainerChildElements[animation.posI].innerText =
                animation.height;
        }

        previous = animation;
        await sleep(500); // Pause between steps for visibility
    }

    // Reset colors at the end
    if (previous && previous.status === "compare") {
        lineContainerChildElements[previous.posI].style.backgroundColor =
            BG_COLOR;
        lineContainerChildElements[previous.posJ].style.backgroundColor =
            BG_COLOR;
    }

    enableInteractions();
    // toast("success", "Merge Sort Completed!");
    const endTime = getCurrentTime();
    const duration = calculateTimeDifference(startTime, endTime);
    result("Merge Sort Completed!", duration);
    const mergeSortExecution = {
        type: "Merge Sort",
        executionTime: duration,
    };
    executionTimes.push(mergeSortExecution);
    exectuinTimesArray(executionTimes);
    console.log(executionTimes);
}

// ======================================= quick sort ================================
async function doQuickSort() {
    const startTime = getCurrentTime();
    if (!array.length) {
        toast("fail", "Generate Array!");
        document.getElementById("generate-array").focus();
        return;
    }

    disableInteractions();

    let lineContainerChildElements = Array.from(
        document.getElementById("lines-container").children
    );
    let animationArr = getQuickSortAnimations(array);
    let previous;

    for (let i = 0; i < animationArr.length; i++) {
        const animation = animationArr[i];

        // Reset color from previous iteration
        if (previous) {
            lineContainerChildElements[previous.posI].style.backgroundColor =
                BG_COLOR;
            lineContainerChildElements[previous.posJ].style.backgroundColor =
                BG_COLOR;
        }

        // Comparison step
        if (animation.status === "compare") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                COMPARE_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                COMPARE_COLOR;
        }
        // Swap step
        else if (animation.status === "swap") {
            lineContainerChildElements[animation.posI].style.backgroundColor =
                SELECT_COLOR;
            lineContainerChildElements[animation.posJ].style.backgroundColor =
                SELECT_COLOR;

            await sleep(500); // Pause to show color change before swapping

            // Perform the swap
            const tempHeight =
                lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height =
                lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height =
                tempHeight;

            // Update the displayed numbers
            lineContainerChildElements[animation.posI].innerText =
                lineContainerChildElements[animation.posI].style.height.replace(
                    "px",
                    ""
                );
            lineContainerChildElements[animation.posJ].innerText =
                lineContainerChildElements[animation.posJ].style.height.replace(
                    "px",
                    ""
                );
        }

        previous = animation;
        await sleep(500); // Pause between each step for visibility
    }

    enableInteractions();
    // toast("success", "Quick Sort Completed!");
    const endTime = getCurrentTime();
    const duration = calculateTimeDifference(startTime, endTime);
    result("Quick Sort Completed!", duration);
    const quickSortExecution = {
        type: "Quick Sort",
        executionTime: duration,
    };
    executionTimes.push(quickSortExecution);
    exectuinTimesArray(executionTimes);
    console.log(executionTimes);
}

window.handleDatasetSizeChange = handleDatasetSizeChange;
window.handleSearchNumberChange = handleSearchNumberChange;
window.generateArray = generateArray;
window.doLinearSearch = doLinearSearch;
window.doBinarySearch = doBinarySearch;
window.doBubbleSort = doBubbleSort;
window.doSelectionSort = doSelectionSort;
window.doInsertionSort = doInsertionSort;
window.doMergeSort = doMergeSort;
window.doQuickSort = doQuickSort;

// document.getElementById('dataset-size').addEventListener('blur', handleDatasetSizeChange);
// document.getElementById('search-number').addEventListener('blur', handleSearchNumberChange);
// document.getElementById('generate-array').addEventListener('click', generateArray);
// document.getElementById('linear-search').addEventListener('click', doLinearSearch);
// document.getElementById('bubble-sort').addEventListener('click', doBubbleSort);
// document.getElementById('selection-sort').addEventListener('click', doSelectionSort);
