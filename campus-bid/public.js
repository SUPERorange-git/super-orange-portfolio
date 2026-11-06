lucide.createIcons();
// Keep existing workspace bookmarks working after the homepage migration.
if(new URLSearchParams(location.search).has('view')) location.replace('app.html'+location.search);
else if(/^#[MSAPC]\d+$/.test(location.hash)) location.replace('atlas.html'+location.hash);
