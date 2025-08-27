from flask import render_template

def init_app(app):
    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/blog")
    def blog():
        posts = [
            {"slug": "proxmox-zero-touch", "title": "Proxmox Zero-Touch Provisioning",
             "summary": "Cloud-init + Terraform + API to stand up VMs with no hands.",
             "date": "2025-08-01", "tags": ["proxmox", "terraform", "cloud-init"]},
            {"slug": "pfsense-ha-turnup", "title": "pfSense HA Turn-up, Automated",
             "summary": "Templates, CARP, VLANs, and drift checks so you don’t babysit configs.",
             "date": "2025-07-21", "tags": ["pfsense", "automation", "ha"]},
            {"slug": "home-assistant-vlans", "title": "Home Assistant on Isolated VLANs",
             "summary": "Local-only automation with mmWave presence and zero cloud noise.",
             "date": "2025-07-05", "tags": ["networking", "home-automation"]},
        ]
        return render_template("blog.html", posts=posts)
