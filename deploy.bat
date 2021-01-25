cd .\fontendbaixe\baixe\
git add .
git commit -m "update"
git push heroku master
cd ..\..\server\
git add .
git commit -m "update"
git push heroku master