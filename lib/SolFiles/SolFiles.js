import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';


export const FSol = new FilesCollection({
 // storagePath: () => `${Meteor.absolutePath}/uploads`,
  storagePath: () => `${Meteor.absolutePath}/modelsStore`,
 // storagePath: '/home/modelsStore',
  downloadRoute: '/uploads',
  collectionName: 'Sol',
  allowClientCode: false, // Disallow remove files from Client
  /*onBeforeUpload(file) {
    console.log("file.size: ",file.size); 
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /sol/i.test(file.extension)) {
      return true;
    }
    return 'Please upload model file, with size equal or less than 10MB';
  }*/
});

if (Meteor.isClient) {
  Meteor.subscribe('files.sol.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.sol.all', function () {
    return FSol.find().cursor;
  });

  FSol.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },
    'remove': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }
  });

}
