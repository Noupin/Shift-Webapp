#pylint: disable=C0103, C0301, R0903, E1101
#flask run --host=0.0.0.0 --port="PORT"
"""
Runs the Web Server for the Shift Client
"""
__author__ = "Noupin"

#First Party Imports
from . import initApp, createApp, addMiddleware


app = initApp()
app = createApp(app)
app = addMiddleware(app)

if __name__ == '__main__':
    app.run()
