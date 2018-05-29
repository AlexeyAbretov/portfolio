/* eslint  no-redeclare:0 */
/* eslint  import/no-duplicates:0 */
/* eslint  spaced-comment:0 */

import watchSelectMenuItem from './topMenu';
import details from './details/';
import settings from './settings';
import watchRouting from './routing';
import messages from './messages/';
import contract from './contract';
import internet from './internet';
import tv from './tv';
import resetPreset from './resetPreset';

import popups from './popups';
import activity from './activity';
import changes from './changes';

/// #if PRODUCTION || DEV
import account from './account';
/// #endif
/// #if FAKE
import account from './account/fake';
/// #endif

export default function* rootSaga() {
  yield [
    watchSelectMenuItem(),
    watchRouting(),
    ...details,
    ...messages,
    ...settings,
    ...contract,
    ...internet,
    ...tv,
    account(),
    resetPreset(),

    popups(),
    activity(),
    changes()
  ];
}
