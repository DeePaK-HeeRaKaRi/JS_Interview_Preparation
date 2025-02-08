class ContactManager {
    constructor() {
        this.contacts = [];
        this.form = document.getElementById('userForm');
        this.searchInput = document.getElementById('search');
        this.tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        
        this.nameError = document.getElementById('nameError');
        this.mobileError = document.getElementById('mobileError');
        this.emailError = document.getElementById('emailError');
        
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.searchInput.addEventListener('change', this.handleSearch.bind(this));
    }
    
    handleFormSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let name = formData.get('name');
        let email = formData.get('email');
        let mobile = formData.get('mobile');

        let isValid = this.validateForm(name, email, mobile);

        if (isValid) {
            this.contacts.push({ name, email, mobile });
            this.addToTable(name, email, mobile);
            this.form.reset();
        }
    }
    
    validateForm(name, email, mobile) {
        let nameRegex = /^[A-Za-z ]+$/.test(name);
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let mobileRegex = /^\d{10}$/.test(mobile);

        let isValid = true;

        this.nameError.style.display = nameRegex ? 'none' : 'inline';
        this.emailError.style.display = emailRegex ? 'none' : 'inline';
        this.mobileError.style.display = mobileRegex ? 'none' : 'inline';

        if (!nameRegex || !emailRegex || !mobileRegex) {
            isValid = false;
        }
        return isValid;
    }
    
    addToTable(name, email, mobile) {
        let newRow = this.tableBody.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = mobile;
        newRow.insertCell(2).textContent = email;
    }
    
    handleSearch(event) {
        let query = event.target.value.trim();
        this.tableBody.innerHTML = '';
        let filteredContacts = this.contacts.filter(contact => contact.mobile.includes(query));
        
        filteredContacts.forEach(contact => {
            this.addToTable(contact.name, contact.email, contact.mobile);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});
