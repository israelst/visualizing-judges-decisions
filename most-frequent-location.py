# coding: utf-8

#from collections import Counter

from pymongo import Connection


def where_is(value, sequence):
    percent = lambda index: (index + 1.0)/len(sequence)
    return [percent(i) for i, v in enumerate(sequence) if v == value]

def where_is_in_coll(value, field, coll):
    docs = coll.find()
    result = []
    for doc in docs:
        where_is_value_in_doc = where_is(value, doc[field])
        result.extend(where_is_value_in_doc)
    return result

coll = Connection()['h5']['decisions']
value = 'rio'
field = 'filtered_tokens'

#result = map(lambda x: round(x, 2), result)
#result = Counter(result)
result = where_is_in_coll(value, field, coll)
hist(result, 100)
