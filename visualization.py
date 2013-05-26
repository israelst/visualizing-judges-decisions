#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from bottle import route, run, request, static_file, view, redirect
from pymongo import Connection

from most_frequent_location import where_is


STATIC_PATH = os.path.join(os.path.dirname(__file__), 'static')

connection = Connection()
db = connection['h5']
coll = db['decisions']

@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=STATIC_PATH)

@route('/')
#@view('download_statistics')
def index():
    return static_file('index.html', root='.')

@route('/where-is')
def most_frequent_location():
    docs = coll.find()
    value = request.query.q
    field = 'filtered_tokens'
    result = [where_is(value, doc[field]) for doc in docs]
    return dict(result=result)


if __name__ == "__main__":
    from bottle import debug
    debug(True)
    run(host='0.0.0.0', reloader=True)
