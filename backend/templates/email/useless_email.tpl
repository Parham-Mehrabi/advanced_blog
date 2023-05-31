{% extends "mail_templated/base.tpl" %}

{% block subject %}
Email Verify
{% endblock %}

{% block html %}
<h2>wellcome to parham-webdev-blog
</h2>
<h4>
    to complete your registration click the link below to verify your email address
    <small>i didnt create a delete account functionality to my app yet, <strong> so email me for delete account(or active it)</strong></small>
    <small>parham.merhabi.webdev@gmail.com</small>
</h4>
<hr>
<img src="https://http.cat/200" width="400px" height="300px">
{% endblock %}
