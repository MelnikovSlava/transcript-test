import TranscriptStore from "./transcript-store";

export class RootStore {
  transcriptStore;

  constructor() {
    this.transcriptStore = new TranscriptStore(this);
  }
}

export default new RootStore();
