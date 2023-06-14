{% extends "mail_templated/base.tpl" %}

{% block subject %}
Email Verify
{% endblock %}

{% block html %}
<h2>wellcome to parham-webdev-blog
</h2>
<h4>
    to complete your registration click the link below to verify your email address
    <a href="https://blog.parham-webdev.com/back/account/api/v1/verify/email/{{ token }}"
       style="background-color:rgba(255,100,100,0.49); text-decoration: None; color: blue;padding: 5px;border-radius: 5px; margin: 1px">Click Here ! ! !</a>

    <small>this link will expire in 5 minutes</small>
</h4>
<hr>
<img src="https://http.cat/201" width="400px" height="300px">
{% endblock %}
