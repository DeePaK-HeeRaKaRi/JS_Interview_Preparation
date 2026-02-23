 /*
        Word1   Word2   Word3
              ↑ gap1   ↑ gap2
        Number of gaps = curr_line.length - 1

        Because if there is only one word: ["Hello"]

        Then: curr_line.length - 1 = 0

        So we force it to:Math.max(1, 0) → 1

        Minimum spaces per gap

        Remainder  - How many extra spaces still remain
    */

function getCurrLineWords(curr_line,curr_line_size,maxWidth) {
    let extra_spaces = maxWidth - curr_line_size
    let gaps = Math.max(1,curr_line.length - 1)
    let even_spaces = Math.floor(extra_spaces / gaps) /*Extra spaces between words should be distributed as evenly as possible */
    let remaining_spaces = extra_spaces % gaps /*remaining empty slots on the left will be assigned more spaces than right */

    let line = curr_line[0]

    if(curr_line.length == 1) { /*Then assign the even_spaces + remainig spaces to the left  */
        line += ' '.repeat(even_spaces)
        line += ' '.repeat(remaining_spaces)
        return line
    }

    for(let j=1; j< curr_line.length; j++) {
        line += ' '.repeat(even_spaces)
        if(remaining_spaces > 0) {
            line += ' '
            remaining_spaces --
        }
        line += curr_line[j]
    }
    return line
}

var fullJustify = function(words, maxWidth) {
    let curr_line = []
    let curr_line_size = 0
    let res = []
    let i = 0
    while(i<words.length) {
        let gaps = curr_line.length
        if(words[i].length + gaps + curr_line_size <= maxWidth) {
            curr_line.push(words[i])
            curr_line_size += words[i].length
        }
        else {
            res.push(getCurrLineWords(curr_line,curr_line_size,maxWidth))
            curr_line = [words[i]]
            curr_line_size = words[i].length
        }
        i++
    }

    
    let last_line = curr_line.join(' ') 
    let extra_spaces = maxWidth - last_line.length
    last_line += ' '.repeat(extra_spaces)
    res.push(last_line)

    return res
};
let words = ["This", "is", "an", "example", "of", "text", "justification."]
let maxWidth = 16
words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
 