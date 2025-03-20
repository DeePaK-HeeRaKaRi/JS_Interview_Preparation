function getCurrLine(maxWidth, curr_line,curr_line_length) {
    const extra_space = maxWidth - curr_line_length
    const spaces =Math.floor(extra_space / Math.max(1,curr_line.length -1)) // Divide the even space between words
    let reminder = extra_space % Math.max(1,curr_line.length -1) //Needs to add more space on left
    let line = curr_line[0]
     // return line
     if(curr_line.length == 1) {
        line += " ".repeat(spaces)
        while(reminder > 0) {
            line += " "
            reminder--
        }
        return line
    }

    for(let j = 1; j < curr_line.length; j++) {
        line += " ".repeat(spaces)
        if(reminder > 0) {
            line += " "
            reminder--
        }
        line += curr_line[j]
    }
    return line
}

let words = ["This", "is", "an", "example", "of", "text", "justification."]
let maxWidth = 16
words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
let res =[]
let curr_line = [] 
let curr_line_length = 0
let i = 0
let space = 0
while (i < words.length) {
    if(curr_line_length + curr_line.length + words[i].length <= maxWidth){
       curr_line.push(words[i])
       curr_line_length += words[i].length  
       i++
    }
    else {
        res.push(getCurrLine(maxWidth, curr_line,curr_line_length))
        curr_line = [words[i]]
        curr_line_length = words[i].length
        i++
        // space=0
    }
}
// res.push(getCurrLine(maxWidth, curr_line,curr_line_length))
 
let last_line = curr_line.join(" ")
let extra_spaces = maxWidth - last_line.length
console.log(extra_spaces)
last_line += " ".repeat(extra_spaces)
res.push(last_line)
console.log(res)