import deleteNotices from './deleteNotices';
import markNoticesAsRead from './markNoticesAsRead';
import messagesMenu from './messagesMenu';
import loadRequestDetails from './loadRequestDetails';

export default [deleteNotices(), markNoticesAsRead(), messagesMenu(), loadRequestDetails()];
