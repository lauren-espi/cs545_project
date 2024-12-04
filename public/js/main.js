function search() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        location.href = `/search/${encodeURIComponent(searchTerm)}`;
        return false; // Prevent form submission
    } else {
        alert('Please enter a search term.');
        return false; // Prevent form submission if search term is empty
    }
}
