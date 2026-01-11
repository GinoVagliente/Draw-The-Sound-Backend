export class SongModel {
  constructor(SongData) {
    this.trackid = SongData.id;
    this.artistname = SongData.name;
    this.lenght = SongData.lenght;
    this.title = SongData.title;
  }
}
