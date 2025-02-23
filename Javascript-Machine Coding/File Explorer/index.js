class FileExplorer {
  constructor(container,data) {
      this.container = container
      this.data = data
      this.nodeCache = new Map()
      this.dataCache = new Map()
      this.createFolder(this.data, this.container)
      this.addListener(this.container)
  }

  createIcon(img,type,id) {
    const icon = document.createElement('img')
    icon.src = img
    icon.id = id
    icon.classList.add('icon',type)
    console.log({icon})
    return icon
  }

  getIcon(type) {
    let icons = {
      'Folder' : 'https://static.vecteezy.com/system/resources/previews/017/269/602/non_2x/add-folder-icon-free-vector.jpg',
      'File' : 'https://cdn-icons-png.flaticon.com/512/3979/3979285.png',
      'Delete' : 'https://static-00.iconduck.com/assets.00/delete-icon-1858x2048-xhcz7dt7.png'
    }
    return icons[type] || ''
  }

  createFolder(data,parent) {
    const fragement = document.createDocumentFragment()
  
    const node = document.createElement('div')
    node.classList.add('node-container',`node-${data.name}`)
  
    const nodeName = document.createElement('span')
    nodeName.textContent = data.name
  
   
    if(data.isFolder) {  // You can create both folder an icon
      let iconFolder = this.getIcon('Folder')
      let iconFile = this.getIcon('File')
      let iconDelete = this.getIcon('Delete')
      nodeName.appendChild(this.createIcon(iconFolder, `Folder`,data.id))
      nodeName.appendChild(this.createIcon(iconFile, `File`,data.id))
      nodeName.appendChild(this.createIcon(iconDelete,'Delete',data.id))
      this.nodeCache.set(`${data.id}`,node)
      this.dataCache.set(`${data.id}`,data)
    }
    // nodeName.textContent = data.name
    node.appendChild(nodeName)
    data.children && data.children.map((currnode) => this.createFolder(currnode,node))
    // fragement.appendChild(node)
  
    // return !parent ? fragement : parent.appendChild(fragement)
    return parent ? parent.appendChild(node) : node;
  }

  deleteHandler(targetParent, targetRef) {
    if (!targetRef || !targetParent) return;

    // Remove from DOM
    targetParent.remove();

    // Remove references from caches
    this.nodeCache.delete(`${targetRef.id}`);
    this.dataCache.delete(`${targetRef.id}`);

    // Remove reference from parent's `children` array
    function removeFromParentChildren(parent, id) {
        if (!parent || !parent.children) return;
        parent.children = parent.children.filter(child => child.id !== id);
    }

    // Recursively remove all child references from caches
    function removeChildReferences(dataCache, nodeCache, data) {
        if (!data || !data.children) return;

        data.children.forEach(child => {
            nodeCache.delete(`${child.id}`);
            dataCache.delete(`${child.id}`);
            removeChildReferences(dataCache, nodeCache, child); // Recursive call
        });
    }

    removeChildReferences(this.dataCache, this.nodeCache, targetRef);
    
    // Remove from the parent's children array
    this.dataCache.forEach(parentData => removeFromParentChildren(parentData, targetRef.id));

    console.log("After Deletion:", this.dataCache);

    /*
      Removes the node from the DOM properly.
     Clears references from nodeCache and dataCache to avoid memory leaks.
     Recursively deletes all child references, ensuring complete cleanup.
     Removes the reference from the parent’s children array, maintaining a valid tree structures
    */
}

  addListener(container) {
    container.addEventListener('click',(event) => {
      const {target} = event
      const tagName = target.tagName.toLowerCase()
      const targetId = target.id
      const targetType = target.className.split(' ')[1]
      console.log({tagName, targetId,targetType})
      console.log(this.nodeCache,this.dataCache)

      if(tagName === 'img' && targetId) {
        console.log('node Cahche',this.nodeCache.get(targetId))
        console.log('data ref cache',this.dataCache.get(targetId))
        let target_parent = this.nodeCache.get(targetId)
        let target_ref = this.dataCache.get(targetId)
        console.log({target_ref})
        if(targetType == 'Delete') {
          this.deleteHandler(target_parent,target_ref)
          // target_parent.replaceChildren()
        }

        else {
          const span = target_parent.getElementsByTagName('span')[0]

          const get_input = this.createInput(targetType)
          get_input.addEventListener('change',(e) => this.handleChange(e))
          get_input.addEventListener('blur',(e) => this.handleBlur(e,target_parent,target_ref,targetType))

          target_parent.insertBefore(get_input, span.nextElementSibling)

        }
        
        // target_parent.appendChild(get_input)
      }
      else{
        return
      }
    })
  }

  handleChange(e) {
    console.log('-----input',e.target.value)
    const value = e.target.value
  }

  handleBlur(e, parent_node, data_ref,type) {
    console.log('------e', e.target);
    console.log({ parent_node, data_ref });

    const value = e.target.value.trim();
    if (!value) return; // Ignore empty input

    // Check for duplicate names
    if (data_ref.children.some(child => child.name === value)) {
      alert("A file/folder with this name already exists!");
      e.target.remove();
      return;
  }

    // Create new file/folder data
    let newData = {
        id: Date.now(), // Ensures a unique ID
        name: value,
        isFolder: type == 'Folder' ? true : false, // Keep type consistent
        children: type == 'Folder' ? [] : null, // Only folders get children
    };
    console.log({newData})
    // Ensure parent has a children array
    if (!data_ref.children) {
        data_ref.children = [];
    }

    // Insert new node into the parent's data structure
    data_ref.children.unshift(newData);

    // Update dataCache with the modified parent
    this.dataCache.set(`${data_ref.id}`, data_ref);

    console.log('Updated Cache:', this.dataCache.get(data_ref.id));

    // Insert the new node into the DOM
    // let fragment = document.createDocumentFragement()
    const newNode = this.createFolder(newData, null);
    e.target.remove();
    let span = parent_node.getElementsByTagName('span')[0]

    parent_node.insertBefore(newNode,span.nextElementSibling)
    // Remove input box after adding new node
    
}

  createInput(type) {
    const input = document.createElement('input')
    input.id = type
    input.type = 'text'
    input.classList.add('input-box')
    return input
  }

}

let currentData = {
    id: 0,
    name: "Root",
    isFolder: true,
    isExpanded: true,
    children: [
      {
        id: 1,
        name: "File1.txt",
        isFolder: false,
      },
      {
        id: 1.1,
        name: "File2.txt",
        isFolder: false,
      },
      {
        id: 2,
        name: "Folder1",
        isFolder: true,
        isExpanded: false,
        children: [
          {
            id: 3,
            name: "File2.txt",
            isFolder: false,
          },
          {
            id: 4,
            name: "SubFolder1",
            isFolder: true,
            isExpanded: false,
            children: [
              {
                id: 5,
                name: "File3.txt",
                isFolder: false,
              },
            ],
          },
        ],
      },
    ],
}


const container = document.querySelector('.container')
// container.addEventListener('click',(event) => {
//     const {target} = event
     
//     console.log(event.target, event.target.className)
// })
//  createFolder(currentData,container)

 new FileExplorer(container,currentData)