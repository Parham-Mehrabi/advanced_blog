# advanced_blog
blog app using django

<h2>TODO (backend): </h2>
<ol>
<li><s>add a new container for celery worker</s></li>
<li><s>add a new container for celery beat (crontab)</s></li>
<li><s>create tests for each endpoint</s></li>
<li><s>add a new container for PSQL</s></li>

</ol>

<h2>TODO (deploy): </h2>
<ol>
<li>remove smtp4dev container</li>
<li>add a new docker compose file for stage phase</li>
<li><s>add CI</s></li>
<li>create a reverse proxy on main server and define a new subdomain for this</li>
<li>add CD</li>
</ol>

<h2>TODO (frontend): </h2>
<ol>
<li>create the front end</li>
<li>build the app</li>
<li>put it in django template</li>
</ol>
<hr>
<small>
im too lazy to use GitHub's project, so I used this as a TODO sheet if you are checking this
commit and you found this just ignore it
</small>


<hr>
python3 manage.py create_random_users && python3 manage.py create_random_category && python3 manage.py create_random_blogs && python3 manage.py create_random_comments && python3 manage.py vote_comments 
