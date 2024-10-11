import { openDatabase } from "react-native-sqlite-storage";
import { Place } from "../components/models/places";

const database = openDatabase({ name: "places.db" });

export function init() {
  const promise = new Promise<void>(async (resolve, reject) => {
    (await database).transaction((tx) => {
     

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          sourceUri TEXT NOT NULL,  -- Correct column name
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          console.log("New table created successfully.");
          resolve();
        },
        (_, error) => {
          console.error("Error creating new table:", error);
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}


export function insertPlace(place: Place) {
  const promise = new Promise(async (resolve, reject) => {
    console.log("Inserting place into db:", place); // Log the place object

    (await database).transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO places (title, sourceUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`, 
          [
            place.title,
            place.sourceUri, 
            place.address,
            place.location.lat,
            place.location.lng,
          ],
          (_, result) => {
            console.log("Insert successful:", result); // Log success
            resolve(result);
          },
          (_, error) => {
            console.error("Error inserting place into db:", error); // Improved error logging
            reject(error);
            return false;
          }
        );
      },
      (transactionError) => {
        console.error("Transaction error:", transactionError); // Log transaction error
        reject(transactionError);
      }
    );
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise<any[]>(async (resolve, reject) => {
    (await database).transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
         (_, result) => {
          let places = [];
          for (let i = 0; i < result.rows.length; i++) {
            const dp = result.rows.item(i);

            let p = new Place(
              dp.title,
              dp.sourceUri,
              {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng,
              },
              dp.id,
            );
            places.push(p);
          } // Log the fetched places
          resolve(places);
        },
        (_, error) => {
          console.error("Error fetching places:", error);
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}
export function fetchPlaceDetails(id) {
  const promise = new Promise(async (resolve, reject) => {
    (await database).transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            const dp = result.rows.item(0);
            const place = new Place(
              dp.title,
              dp.sourceUri,
              {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng,
              },
              dp.id
            );
            resolve(place);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error("Error fetching place details:", error);
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}
