#pylint: disable=C0103, C0301
"""
Routes for the Shift webapp
"""
__author__ = "Noupin"

#Third Party Imports
import os
from flask import Blueprint
from flask.wrappers import Response


mainBP = Blueprint('main', __name__, static_folder=os.path.join('Client', "build"),
                   static_url_path="/")


@mainBP.route('/')
def index() -> Response:

    return mainBP.send_static_file('index.html')


@mainBP.errorhandler(404)
def error404(error) -> Response:

    return mainBP.send_static_file('index.html')
