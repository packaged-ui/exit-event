/**
 * Execute (callback) when the cursor exit the page, or the user changes window focus
 *
 * @param {function} callback
 */
export function startExitCallback(callback)
{
  function _eventHandler(e)
  {
    const from = e.relatedTarget || e.toElement;
    if(!from || from.nodeName === 'HTML')
    {
      document.removeEventListener('mouseleave', _eventHandler);
      callback(prepare);
    }
  }

  function prepare()
  {
    document.removeEventListener('mouseleave', _eventHandler);
    document.addEventListener('mouseleave', _eventHandler);
  }

  prepare();
}
