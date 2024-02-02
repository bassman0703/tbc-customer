export const columns: {
  columnKey: any,
  name: string,
  sort: boolean,
  search: boolean
}[] = [
  {
    columnKey: 'id',
    name: '#',
    sort: true,
    search: true,
  },
  {
    columnKey: 'accountNumber',
    name: 'ანგარიშის ნომერი',
    sort: true,
    search: true,
  },
  {
    columnKey: 'clientNumber',
    name: 'კლიენტის ნომერი',
    sort: true,
    search: true,
  },
  {
    columnKey: 'currency',
    name: 'ვალუტა',
    sort: true,
    search: true,
  },
  {
    columnKey: 'accountType',
    name: 'ანგარიშის ტიპი',
    sort: true,
    search: true,
  },

  {
    columnKey: 'accountStatus',
    name: 'ანგარიშის სტატუსი',
    sort: true,
    search: true,
  },
  {
    columnKey: 'actions',
    name: '',
    sort: false,
    search: false,
  }
]
