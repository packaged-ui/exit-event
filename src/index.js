const CustomEvent = require('custom-event');

let lastUpdate = 0;
let lastX, lastY = 0;
document.addEventListener('mousemove', (e) =>
{
  if(e.movementX || e.movementY)
  {
    lastUpdate = Date.now();
    lastX = e.x;
    lastY = e.y;
  }
});

let threshold = 60;

document.addEventListener(
  'mouseout',
  (movedEvent) =>
  {
    const delay = Date.now() - lastUpdate;
    if(delay === 0 || delay > 50)
    {
      return;
    }

    const location = [];
    if(movedEvent.x < threshold)
    {
      location.push('left');
    }
    if(movedEvent.x > (window.innerWidth - threshold))
    {
      location.push('right');
    }
    if(movedEvent.y < threshold)
    {
      location.push('top');
    }
    if(movedEvent.y > (window.innerHeight - threshold))
    {
      location.push('bottom');
    }

    const to = movedEvent.relatedTarget || movedEvent.toElement;
    if((location.length > 0) && (!to))
    {
      const event = new CustomEvent('document-exit', {detail: {positions: location}});
      document.dispatchEvent(event)
    }
  }
);