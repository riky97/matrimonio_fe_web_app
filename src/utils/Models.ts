export class IGetWindowDimension {
  width: number;
  height: number;
}

export class HouseDescriptionModel {
  id: number;
  title: string;
  description: string;
  image: string;
  path: string;
  participants?: ParticipantModel[];
}

export class ParticipantModel {
  name: string;
  surname: string;
}
