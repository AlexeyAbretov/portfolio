/// #if PRODUCTION || DEV
import api from 'api';
/// #endif
/// #if FAKE
import api from 'api/fake';
/// #endif

export default api;
