export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug?: string;
  createdAt?: Date;
  author?: { [key: string]: string };
}

export interface Articles {
  articlesCount: number;
  articles: Article[];
}
