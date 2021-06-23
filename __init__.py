#pylint: disable=C0103, C0301, R0903, E1101
"""
Creates the flask server.
"""
__author__ = "Noupin"

#Third Party Imports
import os
import flask
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix


def initApp(appName=__name__) -> flask.app.Flask:
    """
    Creates the Shift Flask App and if given a config class the default config \
class is overridden.

    Args:
        appName (str): The name of the Flask applcation

    Returns:
        flask.app.Flask: The created Flask app.
    """

    app = Flask(appName, static_folder=os.path.join('Client', "build"), static_url_path="/")

    return app


def createApp(app=None, appName=__name__) -> flask.app.Flask:
    """
    Creates the Shift Flask App and if given a config class the default config class is overridden.

    Args:
        app (flask.app.Flask): The application to update the blueprints of
        appName (str): The name of the Flask applcation

    Returns:
        flask.app.Flask: The created Flask app.
    """

    if not app:
        app = initApp(appName)


    from .routes import mainBP
    app.register_blueprint(mainBP)

    return app


def addMiddleware(app: flask.app.Flask, middleware=ProxyFix) -> flask.app.Flask:
    """
    Adds middleware to an already created flask app.

    Args:
        app (flask.app.Flask): The application to add middleware to.
        middleware (class): The middleware to be applied to the app. Defaults to ProxyFix.

    Returns:
        flask.app.Flask: The Flask app with middleware.
    """

    app.wsgi_app = middleware(app.wsgi_app)

    return app
