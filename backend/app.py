from flask import Flask, request, jsonify

from flask_cors import CORS

from services.supabase_client import supabase

from utils.password_generator import generate_password

app = Flask(__name__)

CORS(app, origins=[
    "https://bharath-portfolio-delta.vercel.app/"
])


# =============================
# LOGIN
# =============================

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    password = data.get("password")

    response = (
        supabase
        .table("admin_auth")
        .select("*")
        .limit(1)
        .execute()
    )

    stored_password = response.data[0]["current_password"]

    if password == stored_password:

        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid password"
    })


# =============================
# GENERATE NEW PASSWORD
# =============================

@app.route("/logout", methods=["POST"])
def logout():

    new_password = generate_password()

    (
        supabase
        .table("admin_auth")
        .update({
            "current_password": new_password
        })
        .eq("id", 1)
        .execute()
    )

    return jsonify({
        "message": "Password regenerated"
    })


# =============================
# VIEW CURRENT PASSWORD
# =============================

@app.route("/current-password")
def current_password():

    response = (
        supabase
        .table("admin_auth")
        .select("current_password")
        .limit(1)
        .execute()
    )

    return jsonify({
        "password": response.data[0]["current_password"]
    })


# =============================
# HOME CONTENT
# =============================

@app.route("/home-content")
def get_home_content():

    response = (
        supabase
        .table("home_content")
        .select("*")
        .limit(1)
        .execute()
    )

    return jsonify(response.data[0])


@app.route("/home-content", methods=["PUT"])
def update_home_content():

    data = request.json

    response = (
        supabase
        .table("home_content")
        .update({
            "welcome_note": data.get("welcome_note"),
            "greeting_name": data.get("greeting_name"),
            "typing_titles": data.get("typing_titles"),
            "description": data.get("description"),
            "hero_image": data.get("hero_image"),
            "primary_button_text": data.get("primary_button_text"),
            "primary_button_link": data.get("primary_button_link"),
            "secondary_button_text": data.get("secondary_button_text"),
            "secondary_button_link": data.get("secondary_button_link"),
        })
        .eq("id", 1)
        .execute()
    )

    return jsonify({
        "message": "Home content updated",
        "data": response.data
    })


# =============================
# PROJECTS
# =============================

@app.route("/projects")
def get_projects():

    response = (
        supabase
        .table("projects")
        .select("*")
        .order("id", desc=True)
        .execute()
    )

    return jsonify(response.data)


@app.route("/projects", methods=["POST"])
def create_project():

    data = request.json

    response = (
        supabase
        .table("projects")
        .insert({

            "title": data.get("title"),

            "short_description":
                data.get("short_description"),

            "full_description":
                data.get("full_description"),

            "problem":
                data.get("problem"),

            "features":
                data.get("features"),

            "result_images":
                data.get("result_images"),

            "image_url":
                data.get("image_url"),

            "github_url":
                data.get("github_url"),

            "live_url":
                data.get("live_url"),

            "tech_stack":
                data.get("tech_stack"),

            "category":
                data.get("category"),

            "featured":
                data.get("featured"),

            "completion_date":
                data.get("completion_date"),

        })
        .execute()
    )

    return jsonify(response.data)


@app.route("/projects/<int:id>", methods=["PUT"])
def update_project(id):

    data = request.json

    response = (
        supabase
        .table("projects")
        .update({

            "title": data.get("title"),

            "short_description":
                data.get("short_description"),

            "full_description":
                data.get("full_description"),

            "problem":
                data.get("problem"),

            "features":
                data.get("features"),

            "result_images":
                data.get("result_images"),

            "image_url":
                data.get("image_url"),

            "github_url":
                data.get("github_url"),

            "live_url":
                data.get("live_url"),

            "tech_stack":
                data.get("tech_stack"),

            "category":
                data.get("category"),

            "featured":
                data.get("featured"),

            "completion_date":
                data.get("completion_date"),

        })
        .eq("id", id)
        .execute()
    )

    return jsonify(response.data)


@app.route("/projects/<int:id>", methods=["DELETE"])
def delete_project(id):

    (
        supabase
        .table("projects")
        .delete()
        .eq("id", id)
        .execute()
    )

    return jsonify({
        "message": "Project deleted"
    })


@app.route("/projects/<int:id>", methods=["GET"])
def get_project_by_id(id):

    response = (
        supabase
        .table("projects")
        .select("*")
        .eq("id", id)
        .single()
        .execute()
    )

    return jsonify(response.data)


# =============================
# ABOUT
# =============================

@app.route("/about")
def get_about():

    response = (
        supabase
        .table("about")
        .select("*")
        .limit(1)
        .execute()
    )

    if response.data:
        return jsonify(response.data[0])

    return jsonify({})


@app.route("/about/<int:id>", methods=["PUT"])
def update_about(id):

    data = request.json

    response = (
        supabase
        .table("about")
        .update({

            "profile_image":
                data.get("profile_image"),

            "full_name":
                data.get("full_name"),

            "role_title":
                data.get("role_title"),

            "short_bio":
                data.get("short_bio"),

            "long_bio":
                data.get("long_bio"),

            "years_experience":
                data.get("years_experience"),

            "projects_completed":
                data.get("projects_completed"),

            "skills":
                data.get("skills"),

            "technologies":
                data.get("technologies"),

        })
        .eq("id", id)
        .execute()
    )

    return jsonify(response.data)


# =============================
# RESUME
# =============================

@app.route("/resume")
def get_resume():

    response = (
        supabase
        .table("resume")
        .select("*")
        .limit(1)
        .execute()
    )

    if response.data:
        return jsonify(response.data[0])

    return jsonify({})


@app.route("/resume/<int:id>", methods=["PUT"])
def update_resume(id):

    data = request.json

    response = (
        supabase
        .table("resume")
        .update({

            "resume_title":
                data.get("resume_title"),

            "resume_description":
                data.get("resume_description"),

            "resume_url":
                data.get("resume_url"),

            "preview_image":
                data.get("preview_image"),

        })
        .eq("id", id)
        .execute()
    )

    return jsonify(response.data)


# =============================
# BLOG
# =============================

@app.route("/blog")
def get_blog():

    response = (
        supabase
        .table("blog")
        .select("*")
        .order("id", desc=True)
        .execute()
    )

    return jsonify(response.data)


@app.route("/blog", methods=["POST"])
def create_blog():

    data = request.json

    response = (
        supabase
        .table("blog")
        .insert({

            "title": data.get("title"),

            "excerpt": data.get("excerpt"),

            "content": data.get("content"),

            "image_url": data.get("image_url"),

            "tags": data.get("tags"),

        })
        .execute()
    )

    return jsonify(response.data)


@app.route("/blog/<int:id>", methods=["PUT"])
def update_blog(id):

    data = request.json

    response = (
        supabase
        .table("blog")
        .update({

            "title": data.get("title"),

            "excerpt": data.get("excerpt"),

            "content": data.get("content"),

            "image_url": data.get("image_url"),

            "tags": data.get("tags"),

        })
        .eq("id", id)
        .execute()
    )

    return jsonify(response.data)


@app.route("/blog/<int:id>", methods=["DELETE"])
def delete_blog(id):

    (
        supabase
        .table("blog")
        .delete()
        .eq("id", id)
        .execute()
    )

    return jsonify({
        "message": "Blog deleted"
    })


@app.route("/blog/<int:id>", methods=["GET"])
def get_blog_by_id(id):

    response = (
        supabase
        .table("blog")
        .select("*")
        .eq("id", id)
        .limit(1)
        .single()
        .execute()
    )

    return jsonify(response.data)


# =============================
# CONTACT
# =============================

@app.route("/contact")
def get_contact():

    response = (
        supabase
        .table("contact")
        .select("*")
        .limit(1)
        .execute()
    )

    return jsonify(
        response.data[0]
        if response.data else {}
    )


@app.route("/contact", methods=["PUT"])
def update_contact():

    data = request.json

    response = (
        supabase
        .table("contact")
        .update({

            "email":
                data.get("email"),

            "phone":
                data.get("phone"),

            "location":
                data.get("location"),

            "github":
                data.get("github"),

            "linkedin":
                data.get("linkedin"),

            "form_title":
                data.get("form_title"),

            "form_description":
                data.get("form_description"),

        })
        .eq("id", 1)
        .execute()
    )

    return jsonify({
        "message": "updated",
        "data": response.data
    })


# =============================
# CONTACT FORM SUBMISSION
# =============================

@app.route('/contact-submit', methods=['POST'])
def handle_contact_submission():

    try:

        data = request.json

        if not data:
            return jsonify({
                "error": "No data received"
            }), 400

        name = data.get('name')

        email = data.get('email')

        message = data.get('message')

        if not name or not email or not message:

            return jsonify({
                "error": "All fields are required"
            }), 400

        response = (
            supabase
            .table("contact_messages")
            .insert({
                "name": name,
                "email": email,
                "message": message
            })
            .execute()
        )

        return jsonify({
            "success": True,
            "message": "Message sent successfully!",
            "data": response.data
        }), 200

    except Exception as e:

        print("CONTACT FORM ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": "Internal server error"
        }), 500


# =============================
# PORTFOLIO AI CHATBOT
# =============================

@app.route("/portfolio-ai", methods=["POST"])
def portfolio_ai():

    data = request.json

    message = data.get("message", "").lower()

    projects = (
        supabase
        .table("projects")
        .select("*")
        .execute()
    ).data

    about = (
        supabase
        .table("about")
        .select("*")
        .limit(1)
        .execute()
    ).data

    resume = (
        supabase
        .table("resume")
        .select("*")
        .limit(1)
        .execute()
    ).data

    contact = (
        supabase
        .table("contact")
        .select("*")
        .limit(1)
        .execute()
    ).data

    if "who are you" in message or "about" in message:

        if about:

            about_data = about[0]

            return jsonify({
                "reply":
                    f"I am {about_data.get('full_name')} — "
                    f"{about_data.get('role_title')}. "
                    f"{about_data.get('short_bio')}"
            })

    elif "skills" in message or "technologies" in message:

        if about:

            about_data = about[0]

            skills = about_data.get("skills", [])

            return jsonify({
                "reply":
                    "My skills include: " +
                    ", ".join(skills)
            })

    elif "projects" in message:

        if projects:

            project_names = [
                p["title"] for p in projects
            ]

            return jsonify({
                "reply":
                    "Here are some of my projects: " +
                    ", ".join(project_names)
            })

    elif "contact" in message or "email" in message:

        if contact:

            contact_data = contact[0]

            return jsonify({
                "reply":
                    f"You can contact me at "
                    f"{contact_data.get('email')}"
            })

    elif "resume" in message or "cv" in message:

        if resume:

            resume_data = resume[0]

            return jsonify({
                "reply":
                    f"You can view my resume here: "
                    f"{resume_data.get('resume_url')}"
            })

    return jsonify({
        "reply":
            "I can answer questions about projects, skills, resume, and contact information."
    })


if __name__ == "__main__":
    app.run(debug=True)
