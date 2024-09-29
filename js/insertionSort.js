function getInsertionSortAnimations(arr) {
    let animations = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            animations.push({ posI: j, posJ: j + 1, status: "swap" });
            arr[j + 1] = arr[j];
            j--;
        }
        animations.push({ posI: j + 1, posJ: i, status: "insert" });
        arr[j + 1] = key;
    }
    return animations;
}

async function doInsertionSort() {
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
        await sleep(500);
        const animation = animationArr[i];

        if (animation.status === "swap") {
            // Swapping the heights
            let tempHeight =
                lineContainerChildElements[animation.posJ].style.height;
            lineContainerChildElements[animation.posJ].style.height =
                lineContainerChildElements[animation.posI].style.height;
            lineContainerChildElements[animation.posI].style.height =
                tempHeight;

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
    }

    enableInteractions();
    toast("success", "Insertion Sort Completed!");
}

export default getInsertionSortAnimations;
