/* eslint-disable import/no-duplicates */
/* eslint-disable no-duplicate-imports */
/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const dropboxF = new FilesCollection({
  debug: false,
  throttle: false,
  storagePath: () => `${Meteor.absolutePath}/uploads`,
  downloadRoute: '/uploads',
  collectionName: 'dropboxFiles',
  allowClientCode: false,
  onBeforeUpload: (file) => {
    if (Meteor.userId()) {
      /* if(!Roles.userIsInRole(this.userId, ['admin'])) {
        return "Vous n'avez pas les droits suffisants"; //The user needs more rights to do this
      } */

      if (file.size > 10485760) {
        return 'Please upload image with size less than 10MB.';
      }

      if (!RegExp(Meteor.settings.public.allowedUploadFormats, 'i').test(file.extension)) {
        return `${file.extension} files are not allowed for upload.`;
      }

      return true;
    }

    return 'Not enough rights to upload a file!';
  },
  onBeforeRemove() {
    if (Meteor.userId()) {
      const user = Meteor.user();

      /* if(Roles.userIsInRole(this.userId, ['admin'])) {
        return true;
      } */

      return true;
    }

    return false;
  },
  onAfterRemove: (cursor) => {
 //   import { onAfterRemove } from '/lib/images/udropboxV2.js';
    import { onAfterRemove } from '/server/lib/images/ostrio_dropboxv2';

    onAfterRemove(cursor);
  },
  onAfterUpload: (fileRef) => {
//    import { onAfterUpload } from '../../modules/server/upload-files';
    import { onAfterUpload } from '/server/lib/images/ostrio_dropboxv2';

    onAfterUpload(fileRef);
  },
  interceptDownload: (http, fileRef, version) => {
    //    import { interceptDownload } from '../../modules/server/upload-files';
    import { interceptDownload } from '/server/lib/images/ostrio_dropboxv2';

    return interceptDownload(http, fileRef, version);
  },
   responseHeaders: function(responseCode, fileRef, versionRef, version) {
    var headers = {};
    switch (responseCode) {
      case '206':
        headers['Pragma'] = 'private';
        headers['Trailer'] = 'expires';
        headers['Transfer-Encoding'] = 'chunked';
        break;
      case '400':
        headers['Cache-Control'] = 'no-cache';
        break;
      case '416':
        headers['Content-Range'] = "bytes */" + versionRef.size;
    }
    headers['Connection'] = 'keep-alive';
    headers['Content-Type'] = versionRef.type || 'application/octet-stream';
    headers['Accept-Ranges'] = 'bytes';
    headers['Access-Control-Allow-Origin'] = '*';// <-- Custom header
    return headers;
  },
});

//export default Images;


