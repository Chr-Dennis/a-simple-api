
function getAllCharacters() {
    return tvCharacters;
}


function getCharacterById(characterId) {
    const id = parseInt(characterId);
    const character = tvCharacters.find((character) => character.id === id);

    return character;
}


characterRouter.get("/api/characters", (request, response) => {
    const characters = getAllCharacters();
    response.status(200).json({
        data: characters,
    });
});


characterRouter.get("/api/characters/:id", (request, response) => {
    const character = getCharacterById(request.params.id);

    if (!character) {
        return response.status(404).json({
            data: "Character does not exist with that id",
        });
    }

    response.status(200).json({
        data: character,
    });
});


function createCharacter(requestbody) {
    const newCharacter = {
        id: tvCharacters.length + 1,
        name: requestbody.name,
        show: requestbody.show,
    };
    
    if (!newCharacter.name || !newCharacter.show) {
        return undefined;
    }

    tvCharacters.push(newCharacter);
    return newCharacter;
}

characterRouter.post("/api/characters", (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            data: "Bad Request. Missing required information",
        });
    }

    const newCharacter = createCharacter(request.body);

    if (!newCharacter) {
        return response.status(400).json({
            data: "Bad Request. Missing required information",
        });
    }

    response.status(201).json({
        data: newCharacter,
    });

});

