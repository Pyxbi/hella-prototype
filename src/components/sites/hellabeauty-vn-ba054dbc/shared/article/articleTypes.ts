export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "bullets"; items: { lead?: string; text: string; href?: string }[] }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "image"; src: string; caption?: string }
  | { type: "cta"; label: string; href: string };

export interface RelatedArticle {
  tag: string;
  title: string;
  desc: string;
  image: string;
  href: string;
}

export interface ArticleData {
  title: string;
  author: string;
  date: string;
  comments: string;
  heroImage: string;
  heroCaption?: string;
  intro?: string;
  blocks: ArticleBlock[];
  related?: RelatedArticle[];
  newsletter?: boolean;
}
