// mergeSort.js

function mergeSort(arr, start, end, animations) {
    if (start >= end) return; // Base case for recursion

    const mid = Math.floor((start + end) / 2);

    mergeSort(arr, start, mid, animations); // Sort left half
    mergeSort(arr, mid + 1, end, animations); // Sort right half
    merge(arr, start, mid, end, animations); // Merge sorted halves
}

function merge(arr, start, mid, end, animations) {
    let left = start;
    let right = mid + 1;
    let temp = [];

    // Copy data to temporary arrays L[] and R[]
    let leftTemp = arr.slice(start, mid + 1);
    let rightTemp = arr.slice(mid + 1, end + 1);

    // Merge the temp arrays back into arr[left..right]
    while (left <= mid && right <= end) {
        // Push comparison animation
        animations.push({
            status: "compare",
            posI: left,
            posJ: right,
        });

        if (leftTemp[left - start] <= rightTemp[right - (mid + 1)]) {
            temp.push(leftTemp[left - start]);
            left++;
        } else {
            temp.push(rightTemp[right - (mid + 1)]);
            right++;
        }
    }

    // Copy remaining elements of left[], if there are any
    while (left <= mid) {
        temp.push(leftTemp[left - start]);
        left++;
    }

    // Copy remaining elements of right[], if there are any
    while (right <= end) {
        temp.push(rightTemp[right - (mid + 1)]);
        right++;
    }

    // Copy the sorted elements back into the original array
    for (let i = 0; i < temp.length; i++) {
        arr[start + i] = temp[i];
        // Push merge animation
        animations.push({
            status: "merge",
            posI: start + i,
            height: temp[i],
        });
    }
}

export default function getMergeSortAnimations(arr) {
    const animations = [];
    mergeSort(arr, 0, arr.length - 1, animations);
    return animations;
}
