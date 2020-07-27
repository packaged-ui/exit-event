/**
 * Execute (callback) when the cursor exit the page, or the user changes window focus
 *
 * @param {function} callback
 */
export function startExitCallback(callback)
{
  function _eventHandler(e)
  {
    if(
      (e.x > 20) && (e.x < (window.innerWidth - 20))
      && (e.y > 20) && (e.y < (window.innerHeight - 20))
    )
    {
      return;
    }

    const to = e.relatedTarget || e.toElement;
    if(!to)
    {
      document.removeEventListener('mouseout', _eventHandler);
      callback(prepare);
    }
  }

  function prepare()
  {
    document.removeEventListener('mouseout', _eventHandler);
    document.addEventListener('mouseout', _eventHandler);
  }

  prepare();
}
