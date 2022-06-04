addEventListener("load", () => {
  const btnSearch = document.getElementById("btnForIdSearch");
  const inputForId = document.getElementById("inputForId");
  const inputForNome = document.getElementById("inputForNome");
  const img = document.getElementById("imgPokemon");
  let data;
  //events
  btnSearch.addEventListener("click", () => {
    requestsApi();
  });

  img.addEventListener("click", (e) => {
    console.log(e);
    // console.log(data);
    const img1 = data.sprites?.front_default;
    const img2 = data.sprites.other.dream_world.front_default;

    if (img.value == 1) {
        img.setAttribute("src", img2);
        img.value = 0
    } else {
        img.setAttribute("src",img1)
        img.value = 1
    }

  });
  
  inputForId.addEventListener("change", (e) => {
    inputForNome.disabled = true;
    inputForNome.value = "";
    if (inputForId.value == "") {
      inputForNome.disabled = false;
    }
  });

  inputForNome.addEventListener("change", (e) => {
    inputForId.disabled = true;
    inputForId.value = "";
    if (inputForNome.value == "") {
      inputForId.disabled = false;
    }
  });

  const resetInputs = () => {
    inputForId.value = "";
    inputForId.disabled = false;
    inputForNome.value = "";
    inputForNome.disabled = false;
  }

  //Evento para acionar butão usando "Enter"
  const btn = document.querySelector("#btnForIdSearch");
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") btn.click();
  });


  //requests
  const requestsApi = async () => {
    //tratamento de erros no ID informado.
    const localMsgError = document.getElementById("msgError");
    let getBy;
    try {
        getBy = inputForId.disabled == true ? inputForNome.value : inputForId.value;

      if (getBy == null || getBy == '' ) {
        throw "Valor inválido! Verifique se os dados informado estão corretos";
      }
      localMsgError.innerText = "";
    } catch (error) {
      localMsgError.classList.add("msgErrorId");
      localMsgError.innerText = error;
      return;
    }

    const stringOfId = getBy.toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${stringOfId}`;

    const response = await fetch(url);
    data = await response.json();

    getPhotoPokemon(data);
    getNamePokemon(data);
    getType(data);
    getNameAbilities(data);
    resetInputs(data);
  };


//services
  const getPhotoPokemon = (data, img = 0) => {
    const imgTag = document.getElementById("imgPokemon");
    let spritefront = data.sprites.front_default

    imgTag.setAttribute("src", spritefront);
    imgTag.classList.add("imgPokemon");
    return imgTag;
  };

  const getNamePokemon = (data) => {
    const pokeName = document.getElementById("respPokeName");
    pokeName.innerHTML = JSON.stringify(data.name).replace(/"/g, "");
    pokeName.classList.add("namePokemon");
  };

  const getType = (data) => {
    const liForTypeString = document.getElementById("returnApiType");

    const acc = [];
    Object.keys(data.types).map((obj) => {
      const types = data.types;
      acc.push(types[obj]);
    });
    const convertTypeForString = (accumulator) => {
      const arrString = [];
      accumulator.map((types) => {
        arrString.push(types.type.name);
      });
      liForTypeString.innerText = arrString.join(" | ");
      liForTypeString.classList.add("ability");
    };
    convertTypeForString(acc);
  };

  const getNameAbilities = (data) => {
    const liForAbilityString = document.getElementById("returnApiAbilities");

    const acc = [];
    Object.keys(data.abilities).map((obj, index) => {
      const nameAbilityString = data.abilities[index].ability.name;
      acc.push(nameAbilityString);
    });
    const convertAbilityForString = (accumulator) => {
      liForAbilityString.innerText = accumulator.join(" | ");
      liForAbilityString.classList.add("ability");
      return liForAbilityString;
    };
    convertAbilityForString(acc);
  };

});
