function getBubbleSortAnimations(inputArr) {
    let animationArr = []
    let len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            animationArr.push({
                posI: i,
                posJ: i + 1,
                status: 'compare',
            })
            if (inputArr[i] > inputArr[i + 1]) {
                animationArr.push({
                    posI: i,
                    posJ: i + 1,
                    status: 'swap',
                })  
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return animationArr;
}


export default getBubbleSortAnimations;