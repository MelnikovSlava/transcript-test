import { action, observable, runInAction } from "mobx";

import { axiosInstance } from "../api/api";

export default class TranscriptStore {
  rootStore;

  @observable currentTime;

  @observable record;
  @observable isLoading;
  @observable error;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.currentTime = 0;

    this.record = null;
    this.isLoading = false;
    this.error = null;
  }

  @action("changeCurrentTime")
  changeCurrentTime = time => {
    this.currentTime = time;
  };

  @action("fetchData")
  fetchData = () => {
    const result = axiosInstance.get("/record");
    this.isLoading = true;

    result
      .then(response => {
        runInAction(() => {
          if (response.status === 200) {
            this.record = {
              transcript: response.data.transcript,
              audio: response.data.audio,
              name: response.data.name,
              date: response.data.date,
            };
          }

          this.isLoading = false;
          this.error = null;
        });
      })
      .catch(error => {
        runInAction(() => {
          this.error = error.toString();
          this.isLoading = false;
        });
      });

    return result;
  };
}
