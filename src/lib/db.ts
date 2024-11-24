let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Stores {
  Langs = 'langs',
  Snippets = 'snippets'
}

export interface IndexedData {
  id: string;
}

export const DB_NAME = 'snippets_db'

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(DB_NAME);

    request.onupgradeneeded = (event) => {
      db = (event.target as IDBOpenDBRequest).result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Langs)) {
        db.createObjectStore(Stores.Langs, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(Stores.Snippets)) {
        db.createObjectStore(Stores.Snippets, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      if (!db)
        db = (event.target as IDBOpenDBRequest).result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const bulkAddData = <T extends IndexedData>(storeName: Stores, data: T[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    request = indexedDB.open(DB_NAME, version);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      let currentData: any[]
      const res = store.getAll();

      const addNext = (i: number) => {
        if (i < data.length) {
          if (!currentData.some(d => d.id === data[i].id)) {
            store.add(data[i]).onsuccess = () => addNext(i + 1);
          } else {
            addNext(i + 1)
          }
        } else {
          resolve(data)
        }
      }
      res.onsuccess = () => {
        currentData = res.result
        addNext(0)
      };
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        reject(error);
      } else {
        reject('Unknown error');
      }
    };
  });
}

export const addData = <T>(storeName: Stores, data: T): Promise<T|string|null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME, version);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const getStoreDataByKey = <T>(storeName: Stores, key: any): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.get(key);
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
}

export const bulkUpdateData = <T>(storeName: Stores, data: T[]): Promise<IDBValidKey|string|null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.put(data)
      res.onsuccess = () => {
        resolve(res.result);
      };
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
}

export const updateData = <T>(storeName: Stores, data: T): Promise<IDBValidKey|string|null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(DB_NAME);

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const res = store.put(data)
      res.onsuccess = () => {
        resolve(res.result);
      };
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
}