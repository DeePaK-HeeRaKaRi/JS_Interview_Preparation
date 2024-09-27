// if they are case insensitive  convert str and keywords to lowercase
const highlight=(str, keywords) =>{
    const uniqueWords = new Set([...keywords]);
    console.log(uniqueWords)
    let words = str.split(" ")
    console.log(words)
    let result = words.map((word) => {
        let output=''
        if(uniqueWords.has(word)){
            output+=`<strong>${word}</strong>`
        }else{
            for(let i=0;i<word.length;i++){
                let suffix=word.substring(0,i+1)
                let prefix=word.substring(i+1)
                // console.log(suffix,prefix);
                if (uniqueWords.has(suffix) && uniqueWords.has(prefix)) {
                  output += `<strong>${word}</strong>`;
                } else if (uniqueWords.has(suffix) && !uniqueWords.has(prefix)) {
                  output += `<strong>${suffix}</strong>${prefix}`;
                } else if (!uniqueWords.has(suffix) && uniqueWords.has(prefix)) {
                  output += `${suffix}<strong>${prefix}</strong>`;
                }
            }
        }
        return output !== '' ? output : word
    })
    console.log(result.join(" "))

}

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "End", "JavaScript"];
highlight(str, words);

