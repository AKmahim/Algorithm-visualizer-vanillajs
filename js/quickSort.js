function partition(arr, low, high, animations) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        animations.push({ posI: i + 1, posJ: j, status: "compare" });
        if (arr[j] < pivot) {
            i++;
            animations.push({ posI: i, posJ: j, status: "swap" });
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    animations.push({ posI: i + 1, posJ: high, status: "swap" });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr, low, high, animations) {
    if (low < high) {
        let pi = partition(arr, low, high, animations);
        quickSort(arr, low, pi - 1, animations);
        quickSort(arr, pi + 1, high, animations);
    }
}

function getQuickSortAnimations(arr) {
    let animations = [];
    quickSort(arr, 0, arr.length - 1, animations);
    return animations;
}

async function doQuickSort() {
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

    for (let i = 0; i < animationArr.length; i++) {
        await sleep(500);
        let animation = animationArr[i];

        if (animation.status === "swap") {
            let tempHeight =
                lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height =
                lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height =
                tempHeight;

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
    }

    enableInteractions();
    toast("success", "Quick Sort Completed!");
}

export default getQuickSortAnimations;
