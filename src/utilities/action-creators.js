import { fetchWithAuth, createWithAuth } from '../utilities/api/requests';

const syncEntities = (collectionName, collection) => ({
  type: 'SYNC_ENTITIES',
  payload: {
    [collectionName]: collection,
  },
})

const makeHandleCollectionFetch = ({ dispatch, getState, collectionName }) => {
  return (collection) => {
    dispatch(syncEntities(collectionName, collection));
  }
};

const fetchCollection = (collectionName) => {
  return (dispatch, getState) => {
    const handleCollectionFetch = makeHandleCollectionFetch({
      dispatch, getState, collectionName,
    });
    fetchWithAuth(collectionName)
    .then(handleCollectionFetch);
  };
};


const makeHandleRecordCreate = ({ dispatch, getState, collectionName }) => {
  return (record) => {
    const collection = { [record.id]: record };
    dispatch(syncEntities(collectionName, collection));
    dispatch({
      type: 'NEW_SUBSCRIPTION_SUCCESS',
    })
  }
}

const createRecord = (collectionName, data) => {
  return (dispatch, getState) => {
    const handleRecordFetch = makeHandleRecordCreate({
      dispatch, getState, collectionName,
    });
    createWithAuth(collectionName, data)
    .then(handleRecordFetch);
  };
}

export {
  fetchCollection,
  createRecord,
 };
