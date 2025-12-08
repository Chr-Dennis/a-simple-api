import express from 'express';

const app = express();
const port = 2025;

const tvCharacters = [
    {
        id: 1,
        name: "Malcom Reynolds",
        show: "Firefly",
    },

    {
        id: 2,
        name: "Abed Nadir",
        show: "Community",
    },

    {
        id: 3,
        name: "Bob Belcher",
        show: "Bob's Burgers",
    },

    {
        id: 4,
        name: "Benjamin Sisko",
        show: "Star Trek: Deep Space Nine",
    },

    {
        id: 5,
        name: "Goku",
        show: "Dragonball",
    },

    {
        id: 6,
        name: "David Rossi",
        show: "Criminal Minds",
    },

    {
        id: 7,
        name: "Homer Simpson",
        show: "The Simpsons",
    },

    {
        id: 8,
        name: "Londo Mollari",
        show: "Babylon 5",
    },

    {
        id: 9,
        name: "Eddie Munson",
        show: "Stranger Things",
    },

    {
        id: 10,
        name: "Dwight Schrute",
        show: "The Office",
    },
];

function getAllCharacters() {
    return tvCharacters;
}

app.get('/api/characters', (req, res) => {
    const characters = getAllCharacters();
    res.status(200).json({
        data: characters,
    });
});

function getCharactersById(characterId) {
    const id = parseInt(characterId);
    const character = tvCharacters.find((character) => character.id === id);

    return character;
}

app.get('/api/characters/:id', (req, res) => {
    const character = getCharactersById(req.params.id);

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/characters', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.');
});

