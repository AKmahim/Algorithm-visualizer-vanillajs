function merge(arr, start, mid, end, animations) {
    let n1 = mid - start + 1;
    let n2 = end - mid;
    let L = arr.slice(start, mid + 1);
    let R = arr.slice(mid + 1, end + 1);

    let i = 0,
        j = 0,
        k = start;

    while (i < n1 && j < n2) {
        animations.push({
            posI: k,
            posJ: L[i] <= R[j] ? i : j,
            status: "compare",
        });

        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) {
        arr[k++] = L[i++];
    }

    while (j < n2) {
        arr[k++] = R[j++];
    }
}

function mergeSort(arr, start, end, animations) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(arr, start, mid, animations);
        mergeSort(arr, mid + 1, end, animations);
        merge(arr, start, mid, end, animations);
    }
}

function getMergeSortAnimations(arr) {
    let animations = [];
    mergeSort(arr, 0, arr.length - 1, animations);
    return animations;
}

async function doMergeSort() {
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

    for (let i = 0; i < animationArr.length; i++) {
        await sleep(500);
        let animation = animationArr[i];
        lineContainerChildElements[animation.posI].style.height =
            animation.posJ + "px";
    }

    enableInteractions();
    toast("success", "Merge Sort Completed!");
}

export default getMergeSortAnimations;
