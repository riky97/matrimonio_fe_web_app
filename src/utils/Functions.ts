import { DataSnapshot, child, get } from "firebase/database";
import { MockDbHouseDescriptions } from "./MockDb";
import { HouseDescriptionModel, ParticipantModel } from "./Models";
import { dbRef } from "../firebase";

export function getHouseBySearch(search: string): HouseDescriptionModel | undefined {
  let filterElementBySearch = MockDbHouseDescriptions.filter((ele) => {
    const partecipantFound = findPartecipantBySearch(ele, search);

    if (partecipantFound) {
      return ele;
    }
    return undefined;
  });

  return filterElementBySearch[0];
}

export async function getHouseBySearchInFirebase(search: string): Promise<HouseDescriptionModel | undefined> {
  const snapshot: DataSnapshot = await get(child(dbRef, `/houseDescription`));
  const data: HouseDescriptionModel[] = snapshot.val();
  let filterElementBySearch = data.filter((ele) => {
    const partecipantFound = findPartecipantBySearch(ele, search);

    if (partecipantFound) {
      return ele;
    }
    return undefined;
  });

  return filterElementBySearch[0];
}

function findPartecipantBySearch(ele: HouseDescriptionModel, search: string): ParticipantModel {
  const findPartecipant = ele.participants.find((x) => {
    let completeName = x.name.toUpperCase() + x.surname.toUpperCase();
    return completeName === search.replace(/\s/g, "").toUpperCase();
  });
  return findPartecipant;
}

export function getHouseByPath(path: string): HouseDescriptionModel {
  return MockDbHouseDescriptions.find((x) => x.path === path);
}

export function getNewGuid(): string {
  let d = new Date().getTime();
  const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return guid;
}
