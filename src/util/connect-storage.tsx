import { CrossStorageClient } from 'cross-storage';
import * as _ from 'underscore';

export default _.once(
  async function () {
    const storage = new CrossStorageClient(
      process.env.NODE_ENV === 'production' ?
        'https://ethercast.io/storage.html' :
        '/storage.html'
    );
    await storage.onConnect();
    return storage;
  }
);
