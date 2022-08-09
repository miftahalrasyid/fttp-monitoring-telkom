import { CHANGE_PAGE_TO } from "./actionTypes";
import { IchangePageTo } from './types';

export const changePageTo = (pathname: string): IchangePageTo => ({
    type: CHANGE_PAGE_TO,
    payload: {pathname}
})