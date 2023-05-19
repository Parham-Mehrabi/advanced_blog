{% extends "mail_templated/base.tpl" %}

{% block subject %}
password reset
{% endblock %}

{% block html %}
<h2>password rest for <span
        style="background-color: rgba(145,255,204,0.56);padding: 5px;border-radius: 5px">{{ user }}</span>
</h2>
<h3>parham-webdev.com</h3>
<p>to reset your password click the link below and declare a new password</p>
<h4>
    <a href="http://127.0.0.1:8000/account/api/v1/password/reset/confirm/{{ token }}"
       style="background-color:rgba(255,100,100,0.49); text-decoration: None; color: blue;padding: 5px;border-radius: 5px; margin: 1px">go
        to RESET PASSWORD</a>
    <br>
    <small>this link will expire in 5 minutes</small>
</h4>
<hr>
<img src="https://http.cat/418" width="400px" height="300px">
{% endblock %}
