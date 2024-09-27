function browsingHistory(){
    this.index=-1
    this.history=[]
    
    this.visit=function(url){
      this.index+=1
      this.history[this.index]=url
    }
    
    this.currentPage=function(){
      return this.history[this.index]
    }
  //   [a,b,c,d] if this.index=0 should be 0
    this.backward=function(){
      this.index-=1
      this.history[Math.max(0,this.index)]
    }
    //   [a,b,c,d] if this.index=4 should be 4
    this.forward=function(){
      this.index+=1 //if current index=4 and when we are incrementing to 5 so we have to return only 4
      this.history[Math.min(this.history.length-1,this.index)]
    }
  }
  
  const res=new browsingHistory()
  res.visit("A")
  console.log(res.currentPage())
  res.visit("B")
  console.log(res.currentPage())
  res.visit("C")
  console.log(res.currentPage())
  res.backward() 
  console.log(res.currentPage()) 
  res.visit("D") 
  console.log(res.currentPage()) 
  res.backward() 
  console.log(res.currentPage())
  res.forward()
  console.log(res.currentPage())