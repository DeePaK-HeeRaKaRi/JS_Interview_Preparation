function maskify(cardNumber) {
    // write your code below
    let cardNumber_type = typeof cardNumber;
    if (!(cardNumber_type == 'string' || cardNumber_type == 'number')) {
        return ''
    }
    cardNumber = cardNumber.toString()
    let cardNumber_length = cardNumber.length;
    if (cardNumber_length < 6) {
        return cardNumber
    }
    const first = cardNumber.slice(0, 1)
    const masked = cardNumber.slice(1, - 4).replace(/\d/g, '#')
    const last = cardNumber.slice(-4)

    return `${first}${masked}${last}`

}

console.log(maskify('5512103073210694'));
// 5###########0694