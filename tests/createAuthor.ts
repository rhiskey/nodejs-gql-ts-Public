
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { Author } from "../src/entity/AuthorModel";
import { optionsMySQL } from '../server';
import { createConnection } from 'typeorm';

const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
};

const bookConfig: Config = {
    dictionaries: [colors],
    separator: ' ',
    length: 1,
};


function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export async function createAuthor() {
    createConnection(optionsMySQL).then(async connection => {
        // Table name = "author"
        // Create a few authors
        var authorsCount = new Array(getRandomInt(5));
        var authorsArr = new Array();

        for (var item of authorsCount) {
            let author = new Author();
            author.name = uniqueNamesGenerator(customConfig);
            authorsArr = authorsArr.concat(author);
            await connection.manager.save(author);
        }
    });
}
