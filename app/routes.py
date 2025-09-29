from flask import render_template, abort, request, current_app
from jinja2 import TemplateNotFound
import json
import os

MANIFEST_PATH = os.path.join(os.path.dirname(__file__), "content", "posts.json")

def load_posts_manifest():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Accept either {"posts":[...]} or a raw list [...]
    if isinstance(data, dict):
        data = data.get("posts", [])

    if not isinstance(data, list):
        raise ValueError(f"posts.json must be a LIST of post objects; got {type(data).__name__}")

    by_slug = {p["slug"]: p for p in data if isinstance(p, dict) and "slug" in p}
    ordered = sorted(by_slug.values(), key=lambda p: p.get("date", ""), reverse=True)
    return by_slug, ordered

def init_app(app):
    def include_source(name: str) -> str:
        src, _, _ = current_app.jinja_loader.get_source(current_app.jinja_env, name)
        return src

    app.jinja_env.globals["include_source"] = include_source

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/blog")
    def blog():
        posts_by_slug, ordered = load_posts_manifest()
        return render_template("blog.html", posts=ordered)

    @app.route("/play/ambient")
    def play_ambient():
        ctx = {
            "color": request.args.get("color", "rgba(255,215,0,0.10)"),
            "size": request.args.get("size", "42rem"),
            "blur": request.args.get("blur", "180px"),
            "x": request.args.get("x", "-15%"),   # left offset
            "y": request.args.get("y", "8%"),     # bottom offset
            "dx": request.args.get("dx", "4px"),
            "dy": request.args.get("dy", "-3px"),
            "scale": request.args.get("scale", "1.015"),
            "dur": request.args.get("dur", "22s"),
            "delay": request.args.get("delay", "-3s"),
            "bgOpacity": request.args.get("bgOpacity", "0.03"),
        }
        return render_template("play/ambient.html", **ctx)

    @app.route("/blog/<slug>")
    def article(slug):
        posts_by_slug, _ = load_posts_manifest()
        meta = posts_by_slug.get(slug)
        if not meta:
            abort(404)
        try:
            return render_template("article.html", meta=meta, slug=slug)
        except TemplateNotFound:
            abort(404)
