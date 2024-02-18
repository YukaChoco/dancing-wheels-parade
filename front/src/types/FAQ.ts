export interface FAQ {
  question: string;
  pageTitle: string;
}

export interface FetchedFAQs {
  questions: string[];
  page_title: string;
}

export interface FetchedSimilarWords {
  similar_words: string[];
}