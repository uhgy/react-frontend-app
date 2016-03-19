/**
 * Created by hgyu on 16/3/16.
 */
import {SCROLL_BOTTOM} from '../constants/Home'

export function updateArticleList(page = 1){
	return { type : UPDATE_ARTICLE_LIST, page }
}

//export function