export const pageOptions = (page: number, pageSize: number, order: 'ASC' | 'DESC', orderBy: string, searchQuery: any = null) => ({
  'page': page,
  'pageSize': pageSize,
  'order': order,
  'sortBy': orderBy,
  'searchQuery': searchQuery,
})


export interface PaginationResponse<T> {
  data: T[]
  total?: number,
  page?: number,
  pageSize?: number,
}

