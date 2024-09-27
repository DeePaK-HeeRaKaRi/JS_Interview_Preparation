

function addAndSort(track,index,data){
  if(!track[index]) track[index]=[]
  track[index] = [...track[index],data];
  track[index].sort((a,b)=>a.getRange() > b.getRange())
}

function Tag(start,end,tag){
  this.start=start,
  this.end=end,
  this.tag=tag,
  this.text="",
  this.getRange=()=>{
    return this.end-this.start
  }
}

function Stack(){
  let top=0
  let items=[]
  this.push=function(val){
    items[top++]=val
  }
  this.pop=function(){
    return items[--top]
  }
  this.peek=function(){
    return items[top-1]
  }
  this.final=function(){
    return items
  }
}

function parse(string,markups){
  let track=new Array(string.length).fill(null)

  for(let markup of markups){
    const [start,end,tag]=markup
    addAndSort(track,start,new Tag(start,end,tag))
  }

  console.log(track)
  const html=new Stack()
  html.push(new Tag(0, Number.MAX_VALUE, ""));

  for(let i=0;i<string.length;i++){
      while(track[i] && track[i].length>0){
        // at zero index we can have [{},{}]
        const curr=track[i].shift();
        curr.text=`<${curr.tag}>`;

        if(curr.end>html.peek().end){
          const split=new Tag(html.peek().end+1,curr.end,curr.tag)
          curr.end = html.peek().end;
          addAndSort(track,html.peek().end+1,split)
        }
        html.push(curr)
      }

      html.peek().text+=string[i]

      while(html.peek().end === i){
        html.peek().text+=`</${html.peek().tag}>`
        const temp=html.pop().text
        html.peek().text+=temp
      }
      console.log(html.final());
  }
  
  return html.peek().text;
}

const encoded=parse('Hello, world',[
  [0,2,"i"],
  [1,3,"b"]
])

console.log(encoded)
