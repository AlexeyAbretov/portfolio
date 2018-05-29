/* eslint  no-redeclare:0 */
/* eslint  import/no-duplicates:0 */
/* eslint  spaced-comment:0 */

/// #if PRODUCTION || DEV
import api from 'api';
/// #endif
/// #if FAKE
import api from 'data/fakeApi';
/// #endif

export default api;
