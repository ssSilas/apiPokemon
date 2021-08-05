addEventListener('load', () => {
    const respIdUser = () => {
        const idPokemon = document.getElementById('idPokemon');
        const btnSearch = document.getElementById('btn');

        btnSearch.addEventListener('click', () => {
            const stringOfId = String(idPokemon.value);
            const url = `https://pokeapi.co/api/v2/pokemon/${stringOfId}`;/*${id}*/
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(pokemon => {
                    const div = document.getElementById('respPokeName');
                    const img = document.getElementById('imgPokemon');
                    const ulForAbilities = document.getElementById('respAbilities');
                    const newP = document.createElement('p');
                    const newLi = document.createElement('li');

                    img.setAttribute('src', pokemon.sprites.front_shiny);
                    img.classList.add('imgPokemon');

                    newP.innerText = pokemon.name;
                    newP.classList.add('namePokemon');
                    div.appendChild(newP);

                    const createLi = ((li,index) => {
                        newLi.appendChild(document.createTextNode(li));
                        newLi.classList.add('ability');
                        return newLi;
                    })
                    Object.keys(pokemon.abilities).map((obj, index) => {
                        const nameAbilityString = pokemon.abilities[index].ability.name;
                        return ulForAbilities.appendChild(createLi(nameAbilityString, index));
                    })
                })
        })
    }

    respIdUser()
})
