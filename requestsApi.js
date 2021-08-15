addEventListener('load', () => {
    const idPokemon = document.getElementById('idPokemon');
    const btnSearch = document.getElementById('btnForIdSearch');

    btnSearch.addEventListener('click', () => {
        const requestsApi = () => {
            //tratamento de erros no ID informado.
            const localMsgError = document.getElementById('msgError');
            try {
                const idValid = idPokemon.value >= 1 && idPokemon.value <= 898;
                const idEmpty = idPokemon.value == '' || idPokemon.value == ' ' ||
                    idPokemon.value == '  ';

                if (idEmpty) { throw "Nenhum valor foi informado" }
                else if (!idValid) { throw "Numero inválido! Informe um ID entre 1 e 898" }
                localMsgError.innerText = "";
            } catch (error) {
                localMsgError.classList.add('msgErrorId')
                localMsgError.innerText = error;
                return;
            }

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
                const pokeName = document.getElementById('respPokeName');

                pokeName.innerHTML = JSON.stringify(data.name).replace(/"/g, "");
                pokeName.classList.add('namePokemon');
            }

            const getType = async () => {
                const response = await fetch(url);
                const data = await response.json();
                const liForTypeString = document.getElementById('returnApiType');

                const acc = [];
                Object.keys(data.types).map((obj) => {
                    const types = data.types;
                    acc.push(types[obj]);
                })
                const convertTypeForString = ((accumulator) => {
                    const arrString = [];
                    accumulator.map((types) => { arrString.push(types.type.name) });
                    liForTypeString.innerText = arrString.join(" | ");
                    liForTypeString.classList.add('ability');
                })
                convertTypeForString(acc);
            }
            
            const getNameAbilities = async () => {
                const response = await fetch(url);
                const data = await response.json();
                const liForAbilityString = document.getElementById('returnApiAbilities');

                const acc = [];
                Object.keys(data.abilities).map((obj, index) => {
                    const nameAbilityString = data.abilities[index].ability.name;
                    acc.push(nameAbilityString);
                })
                const convertAbilityForString = ((accumulator) => {
                    liForAbilityString.innerText = accumulator.join(" | ");
                    liForAbilityString.classList.add('ability');
                    return liForAbilityString;
                })
                convertAbilityForString(acc);
            }
            getPhotoPokemon();
            getNamePokemon();
            getType();
            getNameAbilities();
        }
        requestsApi();
    })
    //Evento para acionar butão usando "Enter"
    const btn = document.querySelector("#btnForIdSearch");
    document.addEventListener("keypress", 
    function(e) {if(e.key === 'Enter') btn.click();});
})