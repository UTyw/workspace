__author__ = 'Yicong'

import cgi
import webapp2
import os
import re
import jinja2
import json

WORD_LIST = ["Adnan", "Algorithm", "Austin", "Babel", "Car", "Dag", "Texas", "Van", "Zebra"]


class AutoCompleteHandler(webapp2.RequestHandler):
    # return auto complete suggestions based on keywords
    def get(self):
        keywords = str(self.request.get("keywords"))
        print ("AutoCompleteHandler: keywords is " + keywords)
        self.response.write(json.dumps(WORD_LIST, sort_keys=True))


class SearchHandler(webapp2.RequestHandler):
    # return auto complete suggestions based on keywords
    def get(self):
        self.response.write("""<html><body><p>Search Page</p></body></html>""")
