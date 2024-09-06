function getLinearSearchAnimations(searchNumber, array) {
    let animationArr = []
    for (let i = 0; i < array.length; ++i) {
        if (searchNumber === array[i]) {
            animationArr.push({
                pos: i,
                found: true,
            })

            return animationArr
        } else {
            animationArr.push({
                pos: i,
            })
        }
    }
    animationArr.push({
        pos: array.length - 1,
        found: false
    })

    return animationArr
}

export default getLinearSearchAnimations;