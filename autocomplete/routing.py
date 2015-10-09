__author__ = 'Yicong'
from handlers import *
import webapp2

routes = [
    webapp2.Route(r"/", handler=MainHandler, name="main"),
    webapp2.Route(r"/api/autocomplete", handler=AutoCompleteHandler, name="autocomplete"),
    webapp2.Route(r"/api/search", hander=SearchHandler, name="search"),
]
app = webapp2.WSGIApplication(routes=routes, debug=True)
