
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const characterRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const charactersFilePath = path.join(
    __dirname,
    '..',
    'data',
    'characters.json'
);

async function getAllCharacters() {
    try {
        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);

        return characters;
    } catch (error) {
        console.error('error', error.message);
    }

}

async function getCharacterById(characterId) {
    try {
        const id = parseInt(characterId);

        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);
        const character = characters.find((character) => character.id === id);
    
        return character;
    } catch (error) {
        console.error ('error', error.message);
    }
}

async function createCharacter(requestBody) {
    try {
        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);

        const newCharacter = {
            id: characters.length + 1,
            name: requestBody.name,
            show: requestBody.show,
        };
        
        if (!newCharacter.name || !newCharacter.show) {
            return undefined;
        }
        
        characters.push(newCharacter);
        
        await fs.writeFile(charactersFilePath, JSON.stringify(characters));
        
        return newCharacter;
    } catch (error) {
        console.error(error.message);
    }
}

characterRouter.get('/', async (req, res) => {
    const characters = await getAllCharacters();
    res.status(200).json({
        data: characters,
    });
});

characterRouter.get('/:id', async (req, res) => {
    const character = await getCharacterById(req.params.id);

    if (!character) {
        return res.status(404).json({
            data: "Character does not exist with that id"
        });
    }

    res.status(200).json({
        data: character,
    });
});



characterRouter.post('/', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                data: 'Bad Request. Missing required information',
            });
        }
        
        const newCharacter = await createCharacter(req.body);
        
        if (!newCharacter) {
            return res.status(400).json({
                data: 'Bad Request. Missing required information',
            });
        }
        
        res.status(201).json({
            data: newCharacter,
        });
    } catch (error) {
        console.error('error', error.message);
    }
});

export default characterRouter;

