class footheadlayout
{
constructor()
{
    this.createHeader();
    this.createFooter();
}
createHeader()
{
    const header = document.createElement('header');
    header.innerHTML = 
    `
    <header>
        <div class="header">
            <img src="Logo API.png" class="logo">
            <form>
                <div class="search">
                    <span class="search-icon material-symbols-outlined">search</span>
                    <input class="search-input" type="search" placeholder="Pesquisar">
                </div>
            </form>
        </div>
        <nav class="nav">
            <div class="nav-bar">
                <ul class="nav-itens">
                    <li><a href="">Home</a></li>
                    <li><a href="">Vereadores</a></li>
                    <li><a href="">Relatórios</a></li>
                    <li><a href="">Gráficos</a></li>
                    <li><a href="">Comunidade</a></li>
                </ul>
            </div>
        </nav> 
    </header>
    `;
        document.body.prepend(header);
}
createFooter() 
{
    const footer = document.createElement('footer');
    footer.innerHTML =
    `
<footer class="footer">
<img src="Logo API.png" class="logo">
<ul class="fot-itens">
    <li><a href="">Team Draco</a></li>
    <li><a href="">Sobre nós</a></li>
    <li><a href="">Proposta</a></li>
</ul>
</footer>
    `;
    document.body.appendChild(footer);
}
}
new footheadlayout();