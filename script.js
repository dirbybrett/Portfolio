(function(){
  const ids = [
    1101392507,1101392493,1101392480,1101392467,1101392450,1101392444,
    1101392376,1101392429,1101392418,1101392403,1101392396,1101392387,
    1101392368,1101392357,1101376171,1101376163,1101376152,1101376143,
    1101392350,1101376127,1101376116,1101392340,1101392328,1101392322,
    1101392311,1101392301,1101392288,1101392282
  ];
  const grid = document.getElementById('video-grid');

  ids.forEach(id => {
    const tile = document.createElement('div');
    tile.className = 'tile';

    // blurred preview
    const cover = document.createElement('iframe');
    cover.className = 'cover';
    cover.src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
    cover.allow = 'autoplay; fullscreen';
    cover.allowFullscreen = true;
    tile.appendChild(cover);

    // click → swap in player
    tile.addEventListener('click', () => {
      if (tile.classList.contains('active')) return;
      tile.classList.add('active');
      cover.remove();
      const player = document.createElement('iframe');
      player.className = 'player';
      player.src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&controls=1&loop=1`;
      player.allow = 'autoplay; fullscreen';
      player.allowFullscreen = true;
      tile.appendChild(player);

      // when paused or ended → revert to cover
      const v = new Vimeo.Player(player);
      const revert = () => {
        player.remove();
        tile.classList.remove('active');
        tile.appendChild(cover);
        v.unload();
      };
      v.on('pause',  revert);
      v.on('ended',  revert);
    });

    grid.appendChild(tile);
  });
})();
