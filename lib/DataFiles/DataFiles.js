import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const FData = new FilesCollection({
  //storagePath:'/home/modelsStore',
  storagePath: () => `${Meteor.absolutePath}/modelsStore`,
  downloadRoute: '/uploads',
  collectionName: 'Data',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    console.log("file.size: ",file.size); 
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /dat/i.test(file.extension)) {
      return true;
    }
    return 'Please upload data file, with size equal or less than 10MB';
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.data.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.data.all', function () {
    return FData.find().cursor;
  });
  FData.allow({
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
