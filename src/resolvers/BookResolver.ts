import "reflect-metadata";
import {Resolver, Query, Args, Mutation, ArgsType, Field, Int, ID, InputType} from "type-graphql";
import {Author} from '../entity/AuthorModel';
import {Book} from '../entity/BookModel';
import { EntityManager } from 'typeorm';

@Resolver(of => Book)
export class BookResolver {
  constructor(
    private readonly em: EntityManager
  ) {}

  @Query(returns => [Book])
  public async books(@Args() bookAgrs: BookAgrs): Promise<Book[]> {
    return  this.em.find(Book, { where: bookAgrs });
  }

  @Mutation(() => Book)
  public async createBook(
    @Args('data') BookInput: BookInput,
  ): Promise<Book> {
    const book = this.em.create(Book, BookInput);
    return this.em.save(book);
  }

  @ResolveProperty('author', () => Author)
  private async author(
    @Parent() book: Book,
    @Context() { authorsLoader }: IGraphQLContext,
  ): Promise<Author[]> {
    return authorsLoader.load(book.authorId.toString());
  }
}

@ArgsType()
export class BookAgrs {
  @Field(type => ID,{ nullable: true })
  public bookId?: number;

  @Field(type => ID,{ nullable: true })
  public authorId?: number;

  @Field({ nullable: true })
  public name?: string;
}

@InputType()
export class BookInput {
  @Field(type => String)
  public name!: string;

  @Field(type => Int)
  public pageCount!: number;

  @Field(type => ID)
  public authorId!: number;
}