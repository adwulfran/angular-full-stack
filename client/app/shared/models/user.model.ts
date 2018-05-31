export class User {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  items?: [{nom?: string; urltorrent?: string; price?: number}];
  totalcart?: number;
}
