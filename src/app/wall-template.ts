import { HttpClient } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { firstValueFrom } from "rxjs";

export class WallTemplate {
  public data?: string | Blob;
  public url: string | null = null;             // Url on the Internet
  public base64: string | null = null;         // Base64 string representation (can be used in <img src>)
  public localFileName: string | null = null;  // Image local filename
  public localUrl: string | null = null;       // Image local URL (use in <img src>)

  constructor(private http: HttpClient, private remoteUrl: string, private localLocation: string) {}

  public async load() {

    // If the image URL is different from the current image or if base64 == null
    if(this.remoteUrl != this.url || this.base64 == null
      //Only on Ios/Android, if the local file does not exist (after re-install for example)
      || (Capacitor.getPlatform() != 'web' && (this.localFileName == null
          || Capacitor.convertFileSrc(await this.getLocalFileUri()) === undefined))) {

      var config = { responseType: 'blob' as 'blob' };
      //Load the file from the Internet
      const request = this.http.get(this.remoteUrl, config);
      const response = await firstValueFrom(request);

      //Convert image to base64
      const res = await this.convertBlobToBase64(response) as string;

      this.base64 = res;
      this.url = this.remoteUrl;

      if (Capacitor.getPlatform() === 'web') {
          //On web we use the URL because we can't save locally the image and use then use it
          this.localUrl = this.url;
      } else {
          //On Ios:Android we save the file

          //Create a new filename
          // while(Capacitor.convertFileSrc(await this.getLocalFileUri()) !== undefined) {
          //     fileName = 'image_' + this.id + '_' + Math.random() * 1000 + '.svg';
          // }

          const savedFile = await Filesystem.writeFile({
              path: this.localLocation,
              data: this.base64,
              directory: Directory.Data
          });

          this.localFileName = this.localLocation;
          this.localUrl = Capacitor.convertFileSrc(savedFile['uri']);
      }
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
  });

  private async getLocalFileUri(): Promise<string> {
    if (this.localFileName != null) {
      let fsItem = await Filesystem.getUri({ path: this.localFileName, directory: Directory.Data});
      return fsItem['uri'];
    } else {
      // We should not reach here
      return "";
    }
  }
}
