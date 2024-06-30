import { DataSnapshot, child, get } from "firebase/database";
import { MockDbHouseDescriptions } from "./MockDb";
import { AutoCompletePartecipantsModel, HouseDescriptionModel, ParticipantModel } from "./Models";
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

export async function getHouseDescription(): Promise<HouseDescriptionModel[]> {
    const snapshot: DataSnapshot = await get(child(dbRef, `/houseDescription`));
    const data: HouseDescriptionModel[] = snapshot.val();
    return data;
}

export function getHouseBySearchInFirebase(search: string, houseDescription: HouseDescriptionModel[]): HouseDescriptionModel | undefined {
    let filterElementBySearch = houseDescription.filter((ele) => {
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

export function getAllPartecipants(houseDescription: HouseDescriptionModel[]): AutoCompletePartecipantsModel[] {
    const allPartecipants: AutoCompletePartecipantsModel[] = houseDescription.flatMap((item) =>
        item.participants.map((innerItem) => ({
            value: `${innerItem.name} ${innerItem.surname}`,
        }))
    );
    return [...new Map(allPartecipants.map((item) => [item.value, item])).values()];
}
