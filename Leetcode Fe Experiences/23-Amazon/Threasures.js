
class Thesaurus {
    constructor(){
        this.wordMap = new Map()
    }

    addWord(word,relatedWords) {
        // Add the word and its related words to the thesaurus
        if(!this.wordMap.has(word)) {
            this.wordMap.set(word,new Set())
        }

        for(const related of relatedWords) {
            if(!this.wordMap.has(related)) {
                this.wordMap.set(related,new Set())
            }
            this.wordMap.get(word).add(related)
            this.wordMap.get(related).add(word)
        }
    }

    removeWord(word) {
        // Remove the word and its related words from the thesaurus
        if(!this.wordMap.has(word)) return `$${word} not exists`
        const releatedWords = this.wordMap.get(word)
        for(let releatedWord of releatedWords) {
            this.wordMap.get(releatedWord).delete(word)
        }
        this.wordMap.delete(word)
    }

    getRelatedWords(word) {
        // Get the related words of a word
         if(!this.wordMap.has(word)) return []
        return [...this.wordMap.get(word)]
    }

    areRelated(word,releatedWord) {
        // Check if two words are related
        return  this.wordMap.has(word) && this.wordMap.get(word).has(releatedWord)
    }
}


const thesaurus = new Thesaurus();
thesaurus.addWord("fast", ["quick", "speedy"]);
thesaurus.addWord("quick", ["rapid"]);

console.log(thesaurus.getRelatedWords("fast")); // ["quick", "speedy"]
console.log(thesaurus.areRelated("fast", "quick")); // true
thesaurus.removeWord("quick");
console.log(thesaurus.wordMap)

// console.log(thesaurus.getRelatedWords("fast")); // ["speedy"]

// const thesaurus = new Thesaurus();

// thesaurus.addWord("fast", ["quick", "speedy", "swift"]);
// thesaurus.addWord("quick", ["rapid", "nimble"]);
// thesaurus.addWord("speedy", ["swift", "rapid"]);
// thesaurus.addWord("slow", ["sluggish", "unhurried"]);
// thesaurus.addWord("happy", ["joyful", "content", "cheerful"]);
// thesaurus.addWord("sad", ["unhappy", "miserable", "downcast"]);

// console.log(thesaurus.wordMap)
// // Get related words
// console.log(thesaurus.getRelatedWords("fast")); 
// // ["quick", "speedy", "swift"]

// // Check relationship
// console.log(thesaurus.areRelated("fast", "swift")); 
// // true
// console.log(thesaurus.areRelated("fast", "sad")); 
// // false

// // Remove a word
// thesaurus.removeWord("quick");
// console.log(thesaurus.getRelatedWords("fast")); 
// // ["speedy", "swift"]
// console.log(thesaurus.getRelatedWords("speedy")); 
// // ["swift"]
