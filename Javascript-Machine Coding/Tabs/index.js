class Tabs {
    constructor(tabsContainer,tabsData) {
        this.tabsContainer = tabsContainer
        this.tabsData = tabsData
        this.tabsList = null
        this.buildTabs(1)
        this.buildContent(1)
        this.addListeners()
       
    }

    buildTabs(id = 0) {
        const tabsList = document.createElement('div')
        tabsList.classList.add('tabs-list')
        this.tabsData.forEach((tab) => {
            const tabElement = document.createElement('div');
            tabElement.classList.add('tab',`tab-${tab.id}`)
            if (tab.id == id) tabElement.classList.add('active-tab');
            tabElement.id = tab.id
            tabElement.textContent = tab.label
            tabsList.appendChild(tabElement)
        })
        this.tabsList = tabsList
        this.tabsContainer.appendChild(tabsList)
    }

    handleClick(event) {
        // const tabsList = this.tabsContainer.querySelector('.tabs-list')
        console.log({event})
        const {target} = event
        let tagName = target.tagName.toLowerCase()
        let className = target.className
        let id = target.id
        if(tagName == 'div' && className.includes('tab')) {

            if(target.classList.contains('active-tab')) return //Reclicking
 
            // Remove the existing active class if it exists
            const activeTab = this.tabsList.querySelector('.active-tab');

            if (activeTab) activeTab.classList.remove('active-tab');


            // Add the active class to the clicked tab
            target.classList.add('active-tab')

            this.changeContent(id)
        }
    }
    addListeners() {
        
        this.tabsList.addEventListener('click',(event) => this.handleClick(event))
    }

    changeContent(id) {
        const getTabContent = document.querySelector('.tab-content')
        const tabContent = this.tabsData.find(tab => tab.id == id)
        if (!tabContent) return; 
        getTabContent.textContent = tabContent.content
    }
    buildContent(id = 1) {
        const content = document.createElement('div')
        content.classList.add('tab-content')
        const getContent = this.tabsData.find(tab => tab.id == id)
        content.textContent = getContent.content
        this.tabsContainer.appendChild(content)
    }
}

let tabsData = [
    {id:1, label: 'Tab-1', content:'Tab-Content-1'},
    {id:2, label: 'Tab-2', content:'Tab-Content-2'},
    {id:3, label: 'Tab-3', content:'Tab-Content-3'}
]

const tabsContainer = document.querySelector('.tabs-container')

new Tabs(tabsContainer, tabsData)