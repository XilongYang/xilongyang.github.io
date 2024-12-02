#! /usr/bin/python3

import os

from common import SRC_PATH
from common import INDEX_PATH
from common import INDEX_TEMPLATE
from common import src_path
from common import read_file
from common import write_file
from common import post2link
from common import parse_meta

def post_html():
    post_map = {}
    for src in [file.split('.')[0] for file in os.listdir(SRC_PATH)]:
        meta = parse_meta(src_path(src))
        title = meta['title'].replace('"','')
        year = meta['date'].split('-', 1)[0]
        date = meta['date'].split('-', 1)[1]
        post_item_template = '<p>{} <a href="{}">{}</a></p>'
        post_item = post_item_template.format(date, post2link(src), title)

        if None == post_map.get(year):
            post_map[year] = [post_item]
        else:
            post_map[year].append(post_item)

    post_html = ''
    for post_year in sorted(list(post_map.items()), key=lambda x: x[0], reverse=True):
        post_html += '<div class="post-year-wrapper">'
        post_html += '<h3>' + post_year[0] + '</h3>' + '\n'
        for post_items in sorted(post_year[1], reverse=True):
            post_html += '<div class="post-wrapper">' + post_items + '\n</div>'
        post_html += '</div>'

    return post_html

def update_index():
    write_file(INDEX_PATH, ''.join(read_file(INDEX_TEMPLATE)).replace("$posts$", post_html()))

if __name__ == "__main__":
    update_index()
