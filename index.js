addEventListener('load', () => {
    const respIdUser = () => {
        const idPokemon = document.getElementById('idPokemon');
        const btnSearch = document.getElementById('btnForIdSearch');

        btnSearch.addEventListener('click', () => {
            const stringOfId = String(idPokemon.value);
            const url = `https://pokeapi.co/api/v2/pokemon/${stringOfId}`;

            const getPhotoPokemon = async () => {
                const response = await fetch(url);
                const data = await response.json();
                const img = document.getElementById('imgPokemon');

                img.setAttribute('src', data.sprites.front_shiny);
                img.classList.add('imgPokemon');
                return img;
            }

            const getNamePokemon = async () => {
                const response = await fetch(url);
                const data = await response.json();
                const div = document.getElementById('respPokeName');
                const newP = document.createElement('p');
                newP.innerText = data.name;
                newP.classList.add('namePokemon');
                div.appendChild(newP);
            }

            const getNameAbilities = async () => {
                const response = await fetch(url);
                const data = await response.json();

                const ulForAbilities = document.getElementById('respAbilities');
                const newLi = document.createElement('li');
                const createLi = ((li) => {
                    const addText = document.createTextNode(li);
                    newLi.appendChild(addText);
                    newLi.append(' | ');
                    newLi.classList.add('ability');
                    return newLi;
                })
                Object.keys(data.abilities).map((obj, index) => {
                    const describeAbilities = document.getElementById('describAbilities');
                    describeAbilities.style.display = "block";
                    describeAbilities.classList.add('ability');
                    const nameAbilityString = data.abilities[index].ability.name;
                    return ulForAbilities.appendChild(createLi(nameAbilityString));
                })
            }
            getPhotoPokemon();
            getNamePokemon();
            getNameAbilities();
        })
    }

    respIdUser()
})
