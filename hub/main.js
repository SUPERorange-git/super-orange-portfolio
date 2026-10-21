const container = document.querySelector('#websites');
try {
  const response = await fetch('./sites.json');
  if (!response.ok) throw new Error('Site directory unavailable');
  const sites = await response.json();
  for (const site of sites) {
    const link = document.createElement('a');
    link.className = 'site';
    link.href = `./${site.slug}/`;
    const image = document.createElement('img');
    image.src = `./${site.image}`;
    image.alt = site.name + '预览';
    const copy = document.createElement('div');
    const subtitle = document.createElement('p'); subtitle.className = 'subtitle'; subtitle.textContent = site.subtitle;
    const heading = document.createElement('h2'); heading.textContent = site.name;
    const description = document.createElement('p'); description.textContent = site.description;
    const action = document.createElement('span'); action.className = 'action'; action.textContent = '进入网站';
    copy.append(subtitle, heading, description, action);
    link.append(image, copy); container.append(link);
  }
} catch {
  container.innerHTML = '<p>网站目录暂时无法加载，请刷新重试。您也可以直接访问<a href="./shoot/">拍摄作品</a>或<a href="./portfolio/">个人作品集</a>。</p>';
}
