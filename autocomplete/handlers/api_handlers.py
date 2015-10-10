__author__ = 'Yicong'

import cgi
import webapp2
import os
import re
import jinja2
import json

AUTO_COMPLETE_LENGTH = 3
WORD_LIST = ["Babel", "Car", "Dag", "Texas", "Van", "Zebra", "Adnan", "Algorithm", "Austin", ]


class AutoCompleteHandler(webapp2.RequestHandler):
    # return auto complete suggestions based on keywords
    def get(self):
        keywords = filter(None, re.split(r'[,;\t\n\r\s]', str(self.request.get("keywords")).lower()))
        result = []
        for word in WORD_LIST:
            if any(key in word.lower() for key in keywords):
                result.append(word)
                if len(result) == AUTO_COMPLETE_LENGTH:
                    break
        if result:
            result.sort()
        print ("AutoCompleteHandler: keywords is " + " ".join(keywords))
        self.response.write(json.dumps(result, sort_keys=True))


class SearchHandler(webapp2.RequestHandler):
    # return auto complete suggestions based on keywords
    def get(self):
        self.response.write("""<html><body><p>Search Page</p></body></html>""")