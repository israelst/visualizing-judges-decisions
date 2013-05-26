# coding: utf-8

#from collections import Counter


def where_is(value, sequence):
    percent = lambda index: (index + 1.0)/len(sequence)
    return [percent(i) for i, v in enumerate(sequence) if v == value]

if __name__ == "__main__":
    from pymongo import Connection
    coll = Connection()['h5']['decisions']
    docs = coll.find()
    value = 'rio'
    field = 'filtered_tokens'

#result = map(lambda x: round(x, 2), result)
#result = Counter(result)
    result = [where_is(value, doc[field]) for doc in docs]
    hist(result, bins=100)
