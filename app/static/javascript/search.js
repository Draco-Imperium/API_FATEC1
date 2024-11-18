function searchFunction() {
    var input = document.querySelector('.search-input').value.trim();
    var dropdown = document.getElementById('search-dropdown');
    dropdown.innerHTML = '';

    if (input.length > 0) {
        fetch(`/search?q=${encodeURIComponent(input)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(item => {
                        var div = document.createElement('div');
                        div.classList.add('dropdown-item');
                        div.id = "dropdown-item";

                        var link = document.createElement('a');
                        link.href = item.link;
                        div.textContent = item.NM_URNA_CANDIDATO;
                        

                        link.appendChild(div);
                        dropdown.appendChild(link);

                        console.log("Link criado: ", link.href);
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