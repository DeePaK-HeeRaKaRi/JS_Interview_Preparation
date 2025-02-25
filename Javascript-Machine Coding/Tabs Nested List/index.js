class NestedTabs {
    constructor(tabsContainer, tabsData) {
        this.tabsContainer = tabsContainer;
        this.tabsData = tabsData;
        this.createTabs(this.tabsData, this.tabsContainer, 0);
    }

    createTabs(tabData, parentElement, level = 0) {
        tabData.forEach(tab => {
            const tabContainer = document.createElement("div");
            tabContainer.classList.add("tab-container");

            const tabElement = document.createElement("div");
            tabElement.classList.add(level === 0 ? "main-tab" : "tab");
            tabElement.textContent = tab.name;
            tabElement.addEventListener("click", (e) => {
                e.stopPropagation();
                tabContainer.classList.toggle("shift-right");
            });
            tabContainer.appendChild(tabElement);
            parentElement.appendChild(tabContainer);

            if (tab.children.length > 0) {
                const subTabContainer = document.createElement("div");
                subTabContainer.classList.add("sub-tabs");
                this.createTabs(tab.children, subTabContainer, level + 1);
                tabContainer.appendChild(subTabContainer);
            }
        });
    }
}

const tabsData = [
    {
        name: "Tab 1",
        children: [
            {
                name: "Child 1A",
                children: [
                    { name: "Sub-Child 1A-1", children: [] },
                    { name: "Sub-Child 1A-2", children: [] },
                    { name: "Sub-Child 1A-3", children: [] },
                    { name: "Sub-Child 1A-4", children: [] }
                ]
            },
            { name: "Child 1B", children: [] }
        ]
    },
    {
        name: "Tab 2",
        children: [
            {
                name: "Child 2A",
                children: [
                    { name: "Sub-Child 2A-1", children: [] }
                ]
            }
        ]
    },
    { name: "Tab 3", children: [] }
];

const tabsContainer = document.querySelector('.main-tabs');
new NestedTabs(tabsContainer, tabsData);