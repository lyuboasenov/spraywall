// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  app_icon: "https://balkanclimbing.com/themes/custom/css/images/logo.svg",
  AppWrite: {
    Endpoint: 'https://appwrite.asenov.duckdns.org/v1',
    ProjectId: '67eeb11f0029d6c9c734',
    DatabaseId: '66106025b5416f00fcd8',
    Collections: {
      Gyms: '67cb49770016b46409a8',
      Walls: '661264719e62da3812a6',
      Routes: '6616dd90781920c2be2e',
      Logs: '6618a89ae13d2ab63b99',
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
