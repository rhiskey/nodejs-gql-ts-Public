import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Field, Int, ObjectType, ID } from 'type-graphql';
import {Book} from './BookModel';

@ObjectType('Author', { description: "The author model" })
@Entity({ name: 'author' })
export class Author {
    @Field(type => ID, {description: "PK, AI"})
    @PrimaryGeneratedColumn({ name: 'authorId' })
    authorId!: number;

    @Field(type => String, { description: "The name of the author" })
    @Column({ name: 'name' })
    name!: string;

    @Field(type => [Book], { description: "Link with books" })
    @OneToMany(() => Book, book => book.author, {
        // cascade: true,
    })
    books?: Book[];
}
