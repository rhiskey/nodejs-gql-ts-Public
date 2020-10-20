import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { Int, Field, ObjectType } from 'type-graphql';
import {Author} from './AuthorModel';

@ObjectType('Book', { description: "The book model" })
@Entity({ name: 'book' })
export class Book {
    @Field(type => Int, { description: "PK, AI" })
    @PrimaryGeneratedColumn({ name: 'bookId' })
    bookId!: number;

    @Field(type => String, { description: "The name of the book" })
    // @Description('Database assigned name')
    @Column({ name: 'name' })
    name!: string;

    @Field(type => Int, { nullable: true ,  description: "Count of pages in book" })
    @Column({ name: 'pageCount' })
    pageCount!: number;

    @Field(type => Int, { nullable: true, description: "The way to connect author, FK" })
    @Column({ name: 'authorId' })
    authorId?: number;

    @Field(type => Author, { description: "Nested list"})
    @ManyToOne(type=>Author, author => author.books, {cascade: true})
    @JoinColumn({ name: 'authorId' })
    author?: Author[];
}
