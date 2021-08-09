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

                img.setAttribute('src', data.sprites.front_default);
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

            const getType = async () => {
                const response = await fetch(url);
                const data = await response.json();

                const ulForType = document.getElementById('respType');
                const newLi = document.createElement('li');
                const createLi = ((li) => {
                    const addText = document.createTextNode(li);
                    newLi.appendChild(addText);
                    newLi.classList.add('ability');
                    return newLi;
                })
                Object.keys(data.types).map((obj, index) => {
                    const nameTypeString = data.types[index].type.name;
                    return ulForType.appendChild(createLi(nameTypeString));
                })
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
                    const nameAbilityString = data.abilities[index].ability.name;
                    return ulForAbilities.appendChild(createLi(nameAbilityString));
                })
            }
            getPhotoPokemon();
            getNamePokemon();
            getType();
            getNameAbilities();
        })
    }
    respIdUser()
})
