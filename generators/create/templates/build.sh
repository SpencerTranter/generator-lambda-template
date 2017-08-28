echo "<%= name %>.zip"
rm <%= name %>.zip
zip -r \
<%= name %>.zip \
index.js \
key.json \
config.json \
node_modules/*
echo "<%= name %>.zip"
