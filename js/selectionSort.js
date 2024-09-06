function getSelectionSortAnimations(inputArr) {
    let animationArr = []
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        let min = i
        animationArr.push({
            min: i,
            status: 'select-min',
        })
        for (let j = i + 1; j < len; j++) {
            animationArr.push({
                min,
                j,
                status: 'compare'
            })
            if (inputArr[min] > inputArr[j]) {
                animationArr.push({
                    min: j,
                    status: 'select-min',
                })
                min = j
            }
        }

        if (min !== i) {
            animationArr.push({
                min,
                i,
                status: 'swap'
            })
            let tmp = inputArr[i]
            inputArr[i] = inputArr[min]
            inputArr[min] = tmp
        }
    }
    return animationArr
}


export default getSelectionSortAnimations