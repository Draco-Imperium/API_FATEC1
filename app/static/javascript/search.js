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
                        div.classList.add('dropdown-item');
                        
                        var link = document.createElement('a');
                        link.href = item.link;
                        link.textContent = item.NM_URNA_CANDIDATO;

                        div.appendChild(link);
                        dropdown.appendChild(div);

                        console.log("Link criado: ", link);
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
}
