import { MockDbHouseDescriptions } from "./MockDb";
import { MockDbHouseDescriptionModel, ParticipantModel } from "./Models";

export function getHouseBySearch(search: string): MockDbHouseDescriptionModel | undefined {
  let filterElementBySearch = MockDbHouseDescriptions.filter((ele) => {
    const partecipantFound = findPartecipantBySearch(ele, search);

    if (partecipantFound) {
      return ele;
    }
    return undefined;
  });

  return filterElementBySearch[0];
}

function findPartecipantBySearch(ele: MockDbHouseDescriptionModel, search: string): ParticipantModel {
  const findPartecipant = ele.participants.find((x) => {
    let completeName = x.name.toLocaleLowerCase() + x.surname.toLocaleLowerCase();
    return completeName === search.replace(/\s/g, "").toLocaleLowerCase();
  });
  return findPartecipant;
}

export function getHouseByPath(path: string): MockDbHouseDescriptionModel {
  return MockDbHouseDescriptions.find((x) => x.path === path);
}
