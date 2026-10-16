export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

export type Pagination = {
  page: number;
  limit: number;
};

export type ValidateFrom = 'query' | 'body';
