export function* onPopupOpened(action = {}) {
    try {
        if (action?.payload?.name === PassportChangesPopups.CheckPassportChanges) {
            const notices = yield select(getPassportNotices);

            if (notices?.items?.length) {
                const [first] = notices?.items || [];
                yield call(
                    PassportApi.expired.read,
                    {
                        id: first?.id,
                        campaignId: first?.campaignId,
                        memberId: first?.memberId,
                        memberParamId: first?.memberParamId,
                    }
                );

                yield put(offerActions.offers.suggests.hide.success({
                    id: first?.id,
                }));

                yield put(decrementUnreadCount());

                const messages = yield select(getPassportExpiredMessages);
                const [firstMessage] = messages || [];

                if (firstMessage) {
                    yield put(readMessages(
                        [firstMessage?.id]
                    ));
                }
            }
        }
    } catch (e) {
        yield console.log('error: ', e);
    }
}
