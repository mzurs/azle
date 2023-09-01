import { candid, record, Record, text, Vec } from 'azle';
import { Post } from './post';
import { User } from './user';

@record
export class Thread extends Record {
    @candid(text)
    id: text;

    @candid(User)
    author: User;

    @candid(Vec(Post))
    posts: Vec<Post>;

    @candid(text)
    title: text;
}
