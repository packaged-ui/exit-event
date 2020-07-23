/**
 * Execute (callback) when the cursor exit the page, or the user changes window focus
 *
 * @param {function} callback
 * @param {Number} [debounceDelay=10000] don't run for this many milliseconds after the last execution. < 0 will only execute once
 */
export function startExitCallback(callback, debounceDelay = 10000)
{
  prepare(0);

  function prepare(delay)
  {
    document.removeEventListener('mouseout', pop);
    setTimeout(() => document.addEventListener('mouseout', pop), delay);
  }

  function pop(e)
  {
    const from = e.relatedTarget || e.toElement;

    if(!from || from.nodeName === 'HTML')
    {
      document.removeEventListener('mouseout', pop);
      callback();
      if(debounceDelay >= 0)
      {
        prepare(debounceDelay);
      }
    }
  }
}

