import { FileHandle } from "../directives/drag.and.drop";

export interface Creative {
  id: string;
  name: string;
  groupCreatives: string;
  clickThroughURL: string;
  topLevelDomain: string;
  impressionTrackingURL: string;
  fileToUpload: FileHandle;
  userPathDirectory: string;
  creativesURL: string[]
}
