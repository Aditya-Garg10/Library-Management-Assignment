export const HOST = "https://library-management-assignment.vercel.app";

const USER_ROUTE = "api/members"
export const GET_USER_ROUTE = `${USER_ROUTE}/getAllUser`


const BOOK_ROUTE = "api/books"
export const GET_BOOK_BY_NAME_ROUTE = `${BOOK_ROUTE}/getBookByName`
export const GET_ALLBOOK_ROUTE = `${BOOK_ROUTE}/getAllBooks`
export const GET_BOOK_BY_PRICERANGE_ROUTE = `${BOOK_ROUTE}/getBookPriceRange`
export const GET_BOOK_BY_DETAILS_ROUTE = `${BOOK_ROUTE}/getbooksByNamePriceCategory`

const TRANSACTIONS_ROUTE = "api/transactions"
export const CREATE_TRANSACTION_ROUTE = `${TRANSACTIONS_ROUTE}/updateOrCreateTransaction`  
export const CREATE_RETURN_TRANSACTION_ROUTE = `${TRANSACTIONS_ROUTE}/updateReturnTransaction`  
export const GET_ALL_TRANSACTIONS = `${TRANSACTIONS_ROUTE}/allTransactions`
export const GET_PERSONS_BOOKS = `${TRANSACTIONS_ROUTE}/BookDetails`
export const BOOK_TOTAL_RENT = `${TRANSACTIONS_ROUTE}/bookTotalRentGenerated`
export const BOOKS_ISSUED_TO_PERSON = `${TRANSACTIONS_ROUTE}/listOfBooksIssuedtoPerson`
export const ENTRIES_BTW_DATE_RANGE = `${TRANSACTIONS_ROUTE}/listofEntriesbtwDateRange`