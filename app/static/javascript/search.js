let selectedIndex = -1;

function searchFunction() {
  var input = document.querySelector(".search-input").value.trim();
  var dropdown = document.getElementById("search-dropdown");
  dropdown.innerHTML = "";

  if (input.length > 0) {
    fetch(`/search?q=${encodeURIComponent(input)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          data.forEach((item, index) => {
            var div = document.createElement("div");
            div.classList.add("dropdown-item");
            div.dataset.link = item.link;
            div.textContent = item.NM_URNA_CANDIDATO;
            dropdown.appendChild(div);
          });
          selectedIndex = 0;
          updateActiveItem();
        } else {
          dropdown.innerHTML =
            '<div class="dropdown-item">Nenhum resultado encontrado</div>';
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        dropdown.innerHTML =
          '<div class="dropdown-item">Erro ao buscar dados</div>';
      });
  }
}

document.querySelector(".search-input").addEventListener("input", function () {
  selectedIndex = -1;
  var dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => item.classList.remove("active"));
  searchFunction();
});

document
  .querySelector(".search-input")
  .addEventListener("keydown", function (event) {
    var dropdownItems = document.querySelectorAll(".dropdown-item");

    if (dropdownItems.length > 0) {
      if (event.key === "Enter" && selectedIndex >= 0) {
        var selectedItem = dropdownItems[selectedIndex];
        var link = selectedItem.dataset.link;
        if (link) {
          window.location.href = link;
        }
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        if (selectedIndex < dropdownItems.length - 1) {
          selectedIndex++;
          updateActiveItem();
        }
      } else if (event.key === "ArrowUp") {
        if (selectedIndex > 0) {
          selectedIndex--;
          updateActiveItem();
        }
      } else if (event.key === "Escape") {
        selectedIndex = -1;
        clearDropdown();
      }
    }
  });

function updateActiveItem() {
  var dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item, index) => {
    if (index === selectedIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

document
  .getElementById("search-dropdown")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("dropdown-item")) {
      var link = event.target.dataset.link;
      if (link) {
        window.location.href = link;
      }
    }
  });

document.querySelector(".search-input").addEventListener("focus", function () {
  var dropdown = document.getElementById("search-dropdown");
  if (dropdown.children.length > 0) {
    dropdown.style.display = "block";
  }
});

document.querySelector(".search-input").addEventListener("blur", function () {
  setTimeout(function () {
    var dropdown = document.getElementById("search-dropdown");
    dropdown.style.display = "none";
  }, 200);
});

function clearDropdown() {
  var dropdown = document.getElementById("search-dropdown");
  dropdown.innerHTML = "";
}
