
import express from 'express';

const characterRouter = express.Router();

import { tvCharacters } from '../data/tvCharacters.js';

function getAllCharacters() {
    return tvCharacters;
}

function getCharacterById(characterId) {
    const id = parseInt(characterId);
    const character = tvCharacters.find((character) => character.id === id);

    return character;
}

characterRouter.get('/', (req, res) => {
    const characters = getAllCharacters();
    res.status(200).json({
        data: characters,
    });
});

characterRouter.get('/:id', (req, res) => {
    const character = getCharacterById(req.params.id);

    if (!character) {
        return res.status(404).json({
            data: "Character does not exist with that id"
        });
    }

    res.status(200).json({
        data: character,
    });
});

function createCharacter(requestBody) {
    const newCharacter = {
        id: tvCharacters.length + 1,
        name: requestBody.name,
        show: requestBody.show,
    };

    if (!newCharacter.name || !newCharacter.show) {
        return undefined;
    }

    tvCharacters.push(newCharacter)
    return newCharacter;
}

characterRouter.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            data: 'Bad Request. Missing required information',
        });
    }

    const newCharacter = createCharacter(req.body);

    if (!newCharacter) {
        return res.status(400).json({
            data: 'Bad Request. Missing required information',
        });
    }

    res.status(201).json({
        data: newCharacter,
    });
});

export default characterRouter;

