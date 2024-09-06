function getBinarySearchAnimations(searchNumber, sortedArray) {
    let animationArr =  []

    let lowIndex = 0
    let highIndex = sortedArray.length - 1
    let midIndex
    animationArr.push({
        lowIndex,
        highIndex,
        status: 'compare',
    })
    while (lowIndex <= highIndex) {
        midIndex = Math.floor((lowIndex + highIndex) / 2)
        animationArr.push({
            midIndex,
            status: 'select'
        })
        if (sortedArray[midIndex] == searchNumber) {
            animationArr.push({
                midIndex,
                status: 'found'
            })
            return animationArr
        } else if (sortedArray[midIndex] < searchNumber) {
            lowIndex = midIndex + 1
            animationArr.push({
                lowIndex,
                highIndex,
                status: 'compare',
            })
        } else {
            highIndex = midIndex - 1
            animationArr.push({
                lowIndex,
                highIndex,
                status: 'compare',
            })
        }
    }
    animationArr.push({
        lowIndex,
        midIndex,
        highIndex,
        status: 'not-found',
    })
    return animationArr;
}

export default getBinarySearchAnimations;