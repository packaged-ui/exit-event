/**
 * @type {WeakMap<object, object>}
 * @private
 */
const _objMap = new WeakMap();

export function ExitSignal(rootElement = document, _threshold = 60)
{
  if(rootElement instanceof Document)
  {
    rootElement = rootElement.documentElement;
  }

  if(_objMap.has(rootElement))
  {
    return _objMap.get(rootElement);
  }

  const _handlers = new Set();
  const _obj = {
    add: function (func)
    {
      _handlers.add(func);
      return this;
    },
    remove: function (func)
    {
      _handlers.delete(func);
      return this;
    },
    clear: function ()
    {
      _handlers.clear();
      return this;
    },
  };
  _objMap.set(rootElement, _obj);

  let lastUpdate = 0;
  let lastX, lastY = 0;
  rootElement.addEventListener('mousemove', (e) =>
  {
    if(e.movementX || e.movementY)
    {
      lastUpdate = Date.now();
      lastX = e.x;
      lastY = e.y;
    }
  });

  rootElement.addEventListener(
    'mouseout',
    (movedEvent) =>
    {
      const _compareTarget = (movedEvent.relatedTarget === null) ? rootElement : movedEvent.target;
      if(rootElement !== _compareTarget)
      {
        return;
      }
      const delay = Date.now() - lastUpdate;
      if(delay === 0 || delay > 50)
      {
        return;
      }

      const _width = rootElement.clientWidth || window.innerWidth;
      const _height = rootElement.clientHeight || window.innerHeight;

      const location = new Set();
      if(movedEvent.offsetX <= 0)
      {
        location.add('left');
      }
      if(movedEvent.offsetX >= _width)
      {
        location.add('right');
      }
      if(movedEvent.offsetY <= 0)
      {
        location.add('top');
      }
      if(movedEvent.offsetY >= _height)
      {
        location.add('bottom');
      }

      if((location.size > 0))
      {
        // we definitely exited, now check for thresholds
        if(movedEvent.offsetX < _threshold)
        {
          location.add('left');
        }
        if(movedEvent.offsetX > (_width - _threshold))
        {
          location.add('right');
        }
        if(movedEvent.offsetY < _threshold)
        {
          location.add('top');
        }
        if(movedEvent.offsetY > (_height - _threshold))
        {
          location.add('bottom');
        }
        const response = {positions: Array.from(location.values())};
        for(let handler of _handlers)
        {
          handler(response);
        }
      }
    },
  );

  return _obj;
}
