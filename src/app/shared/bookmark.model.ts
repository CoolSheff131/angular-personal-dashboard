import { v4 as uuidv4 } from 'uuid';

export class Bookmark {
  id: string;
  name: string;
  url: URL;
  constructor(name: string, url: string) {
    this.url = new URL(url);
    this.id = uuidv4();

    if (!name) {
      name = this.url.hostname;
    }

    this.name = name;
  }
}
