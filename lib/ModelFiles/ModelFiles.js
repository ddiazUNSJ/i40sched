import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const FModels = new FilesCollection({

  //storagePath: '/home/modelsStore',
   storagePath: () => `${Meteor.absolutePath}/modelsStore`,
  downloadRoute: '/uploads',
  collectionName: 'Models',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) { 
    console.log("file.size: ",file.size); 
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /mod/i.test(file.extension)) {
      return true;
    }
    return 'Please upload model file, with size equal or less than 10MB';
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.models.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.models.all', function () {
    return FModels.find().cursor;
  });
  FModels.allow({
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

