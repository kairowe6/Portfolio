from flask import Flask

def create_app():
    app = Flask(__name__)

    # import routes at the end so they can attach to app
    from . import routes
    routes.init_app(app)

    return app
