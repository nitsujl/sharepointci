import { sp } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface IGetListItemsQuery {
  title: string;
  web?: string;
}

export async function getListItems({ title, web }: IGetListItemsQuery) {
  const _web = web ? Web(web) : sp.web;
  return await _web.lists.getByTitle(title).items();
}
