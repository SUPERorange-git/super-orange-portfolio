const homeLink = document.createElement('a');
homeLink.href = '../';
homeLink.textContent = '返回总站';
homeLink.setAttribute('aria-label', '返回超级橘橘总站');
document.querySelector('.atlasbar .right').prepend(homeLink);
