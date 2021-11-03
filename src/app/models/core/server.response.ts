import {PaginatorModel} from './paginator.model';

export interface ServerResponse {
  data: any;
  msg?: Msg;
  token?: string;
  meta: PaginatorModel;
  links: Links;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
