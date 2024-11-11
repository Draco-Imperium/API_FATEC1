function searchFunction() {
    var input = document.querySelector('.search-input').value;
    var dropdown = document.getElementById('search-dropdown');

    dropdown.innerHTML = '';

    if (input.length > 0) {
        fetch(`/search?q=${input}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(item => {
                        var div = document.createElement('div'); 
                        div.innerHTML = item.NM_URNA_CANDIDATO;
                        dropdown.appendChild(div);
                    });
                } else {
                    dropdown.innerHTML = '<div class="dropdown-item">Nenhum resultado encontrado</div>';
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                dropdown.innerHTML = '<div class="dropdown-item">Erro ao buscar dados</div>';
            });
    }
    dropdown.innerHTML = '';
}
