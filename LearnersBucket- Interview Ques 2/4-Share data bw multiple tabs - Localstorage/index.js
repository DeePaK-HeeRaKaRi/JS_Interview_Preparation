const input = document.getElementById('input')
const output = document.getElementById('output')

// Initial read (synchronous)
output.textContent = localStorage.getItem('text') || '—'

// Write to localStorage on input
input.addEventListener('input', (e) => {
  localStorage.setItem('text', e.target.value)
})

// Listen for cross-tab updates
window.addEventListener('storage', (e) => {
  if (e.key === 'text') {
    output.textContent = e.newValue || '—'
    console.log('Storage event fired in another tab')
  }
})


/*
localStorage is synchronous and blocks the main thread, 
so it should only be used for small, infrequent writes. 
For larger or frequent operations, IndexedDB or BroadcastChannel is preferred.”

*/