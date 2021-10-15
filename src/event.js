import {ExitSignal} from './index.js';
import CustomEvent from 'custom-event';

export * from './index.js';

ExitSignal(document)
  .add((response) =>
       {
         const event = new CustomEvent(
           'document-exit',
           {
             detail: response,
             bubbles: true,
             composed: true,
           },
         );
         document.dispatchEvent(event);
       });
