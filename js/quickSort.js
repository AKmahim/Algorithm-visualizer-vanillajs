function getQuickSortAnimations(arr) {
    const animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSortHelper(arr, low, high, animations) {
    if (low < high) {
        let pi = partition(arr, low, high, animations);
        quickSortHelper(arr, low, pi - 1, animations);
        quickSortHelper(arr, pi + 1, high, animations);
    }
}

function partition(arr, low, high, animations) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        animations.push({ type: "compare", i: j, j: high });
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            animations.push({ type: "swap", i: i, j: j });
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push({ type: "swap", i: i + 1, j: high });

    return i + 1;
}

function doQuickSort() {
    console.log("Starting quicksort");
    const array = getArray();
    console.log("Generated array:", array);
    const animations = getQuickSortAnimations(array);
    console.log("Animations:", animations);
    updateVisualization(animations);
}
