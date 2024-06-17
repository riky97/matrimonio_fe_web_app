import { MockDb } from "./MockDb";
import { MockDbModel, ParticipantModel } from "./Models";

export function getFindedElementBySearch(search: string): MockDbModel | undefined {
    let filterElementBySearch = MockDb.filter((ele) => {
        const partecipantFound = findPartecipantBySearch(ele, search);

        if (partecipantFound) {
            return ele;
        }
        return undefined;
    });

    return filterElementBySearch[0];
}


function findPartecipantBySearch(ele: MockDbModel, search: string): ParticipantModel {
    const findPartecipant = ele.participants.find((x) => {
        let completeName = x.name.toLocaleLowerCase() + x.surname.toLocaleLowerCase();
        return completeName === search.replace(/\s/g, "").toLocaleLowerCase();
    });
    return findPartecipant
}
