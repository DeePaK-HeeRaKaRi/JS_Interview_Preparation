const FileSystem=function(){
    this.directory={'root':{}} //should not change this
    this.currentDirectory=this.directory["root"]
    this.currentDirPath = "root";
    
    this.createDirectory=function(folderName){
      this.currentDirectory[folderName]={}
      console.log('-----------',this.directory)
    }
    
    this.changeDirectory=function(path){
      this.currentDirectory=this._currentDirectoryHelper(path)
      console.log('---------this.currentDirectory',this.currentDirectory)
      this.currentDirPath=path
    }

    //needs to add condition whether the path is present or not
    this._currentDirectoryHelper=function(path){
      const paths=path.split("-")
      let current=this.directory
      console.log('current--------',current)
      for(let key of paths){
        console.log('keyss---',key,current[key])
        current=current[key]
      }
      // current[1]='deepak'
      console.log('current111--------',this.currentDirectory)
      return current
    }
    
    this.getCurrentDirectory=function(){
      return this.currentDirectory
    }
    
    this.getCurrentDirectoryPath=function(){
      return this.currentDirPath
    }
    
    // {root : Deepak:{files:[file1,file2,etc..]}}
    this.addFile=function(fileName){
      if(this.currentDirectory.hasOwnProperty('files')){
        this.currentDirectory.files.push(fileName)
      }else{
        this.currentDirectory["files"]=[fileName]
      }
      return true
    }
    
    this.deleteFile=function(fileName){
      this.currentDirectory.files=this.currentDirectory.files.filter((e)=>{
        return e!==fileName
      })
      return true
    }
    
    this.deleteDirectory=function(folderName){
      return delete this.directory.root[folderName]
    }

    this.getRootFolder=function(){
      return this.directory
    }
}

const dr=new FileSystem()
dr.createDirectory('Desktop')
dr.createDirectory('Documents')
dr.createDirectory('Pictures')
dr.createDirectory('C-Drive')
dr.createDirectory('D-Drive')
// console.log(dr.getRootFolder())
dr.changeDirectory('root-Desktop')
dr.addFile('index-html')
dr.addFile('style-css')
dr.changeDirectory('root-Documents')
dr.addFile('resume')
dr.addFile('Certifacates')
dr.addFile('timesheets')
dr.changeDirectory('root-Desktop')
dr.addFile('indes-javascript')
dr.changeDirectory('root-Pictures')
dr.addFile('a.png')
dr.addFile('b.png')
dr.addFile('c.png')
dr.deleteFile('b.png')
console.log(dr.getRootFolder())
dr.deleteDirectory('Pictures')

console.log(dr.getCurrentDirectoryPath())
// dr.deleteFile('Certifacates')
// console.log(dr.getRootFolder())
// dr.deleteDirectory('Documents')
// console.log(dr.getRootFolder())
  