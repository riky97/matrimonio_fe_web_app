export class IGetWindowDimension {
  width: number;
  height: number;
}

export class MockDbModel {
  title: string;
  description: string;
  image: string;
  participants?: ParticipantModel[];
}

export class ParticipantModel {
  name: string;
  surname: string;
}
